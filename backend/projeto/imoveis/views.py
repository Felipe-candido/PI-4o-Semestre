from datetime import datetime, timezone
from django.shortcuts import render
from dateutil.parser import parse
from reservas.services import GoogleCalendarService
from .models import Imovel, Comodidade, imagem_imovel
from rest_framework.response import Response
from .serializers import imovel_serializer, ComodidadeSerializer, imovel_destaque_serializer
from rest_framework import status, viewsets
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated, AllowAny
from projeto.services import CookieJWTAuthentication
import logging
from rest_framework.views import APIView
from rest_framework.exceptions import APIException
from django.db.models import Avg, Count
from comentarios.models import Comentario

logger = logging.getLogger(__name__)

class cadastro_imovel(viewsets.ModelViewSet):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = imovel_serializer
    http_method_names = ['get', 'post', 'patch', 'put', 'options']

    queryset = Imovel.objects.all()

    def get_queryset(self):
        return Imovel.objects.filter(proprietario=self.request.user)

    def create(self, request, *args, **kwargs): 
        try:
            logger.info("Iniciando criação de imóvel")
            logger.info(f"Dados recebidos: {request.data}")
            logger.info(f"Arquivos recebidos: {request.FILES}")

            dados_imovel = request.data.get("imovel", {})
            dados_endereco = request.data.get("endereco", {})
            imagens = request.FILES.getlist("imagens", [])

            if not dados_imovel or not dados_endereco:
                logger.error("Dados do imóvel ou endereço não fornecidos")
                return Response(
                    {'erro': 'Dados do imóvel ou endereço não fornecidos'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Converte string JSON para dicionário se necessário
            if isinstance(dados_imovel, str):
                import json
                dados_imovel = json.loads(dados_imovel)
            if isinstance(dados_endereco, str):
                import json
                dados_endereco = json.loads(dados_endereco)

            # Adiciona o endereço aos dados do imóvel
            dados_imovel["endereco"] = dados_endereco

            logger.info(f"Dados processados: {dados_imovel}")
        
            serializer = self.get_serializer(data=dados_imovel, context={'request': request})
            if not serializer.is_valid():
                logger.error(f"Erros de validação: {serializer.errors}")
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            calendar_service = GoogleCalendarService()
            calendar_id = calendar_service.criar_calendario_chacara(dados_imovel.get('titulo', 'Novo Imóvel'))
            

            imovel = serializer.save(id_reserva=calendar_id)
            logger.info(f"Imóvel criado com sucesso: {imovel.id}")

            
            # Processa o logo se existir
            logo = request.FILES.get('logo')
            if logo:
                logger.info(f"Processando logo: {logo.name}")
                imovel.logo = logo
                imovel.save()
                logger.info("Logo adicionado com sucesso")

            # Processa as imagens
            for imagem in imagens:
                logger.info(f"Processando imagem: {imagem.name}")
                imagem_imovel.objects.create(
                    imovel=imovel,
                    imagem=imagem,
                    legenda=imagem.name
                )

            return Response({'mensagem': 'Imovel registrado com sucesso!'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Erro ao registrar imóvel: {str(e)}", exc_info=True)
            return Response(
                {'erro': f'Erro ao registrar imóvel: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )



class imovel_list_cidade(viewsets.ReadOnlyModelViewSet):
    queryset = Imovel.objects.all().select_related('endereco').prefetch_related('imagens', 'comodidades')
    serializer_class = imovel_serializer

    def get_queryset(self):
        queryset = super().get_queryset()
        cidade = self.request.query_params.get('cidade')
        valor_maximo = self.request.query_params.get('valor_maximo')
        avaliacao_minima = self.request.query_params.get('avaliacao_maxima')

        # Anota a média das avaliações para cada imóvel
        queryset = queryset.annotate(
            media_avaliacoes=Avg('comentarios__avaliacao')
        )

        if cidade:
            queryset = queryset.filter(endereco__cidade__iexact=cidade)
        
        if valor_maximo:
            try:
                valor_maximo = float(valor_maximo)
                queryset = queryset.filter(preco__lte=valor_maximo)
            except ValueError:
                pass

        if avaliacao_minima:
            try:
                avaliacao_minima = float(avaliacao_minima)
                queryset = queryset.filter(media_avaliacoes__gte=avaliacao_minima)
            except ValueError:
                pass

        return queryset
    

class imovel_por_id(APIView):
    def get(self, request):
        imovel_id = request.query_params.get("id")
        if not imovel_id:
            return Response({'error': 'ID não fornecido'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            imovel = Imovel.objects.select_related('endereco').prefetch_related('imagens', 'comodidades').get(id=imovel_id)
            serializer = imovel_serializer(imovel)
            return Response(serializer.data)
        except Imovel.DoesNotExist:
            return Response({'error': 'Imóvel não encontrado'}, status=status.HTTP_404_NOT_FOUND)




class ChacaraViewSet(viewsets.ModelViewSet):
    queryset = Imovel.objects.all()
    serializer_class = imovel_serializer
    
    @action(detail=True, methods=['get'])
    def verificar_disponibilidade(self, request, pk=None):
        imovel = self.get_object()
        data_inicio_str = request.query_params.get('data_inicio')
        data_fim_str = request.query_params.get('data_fim')
        
        if not data_inicio_str or not data_fim_str:
            return Response(
                {'error': 'Data início e fim são obrigatórios'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            # Converter strings para datetime (aceita vários formatos, incluindo ISO)
            data_inicio = parse(data_inicio_str)
            data_fim = parse(data_fim_str)
            
            # Garantir que as datas têm timezone (UTC)
            if not data_inicio.tzinfo:
                data_inicio = data_inicio.replace(tzinfo=timezone.utc)
            if not data_fim.tzinfo:
                data_fim = data_fim.replace(tzinfo=timezone.utc)
            
            # Verificar se a data final é após a inicial
            if data_fim <= data_inicio:
                return Response(
                    {'error': 'A data final deve ser após a data inicial'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            calendar_service = GoogleCalendarService()
            
            # Verificar disponibilidade (passando os objetos datetime diretamente)
            disponivel = calendar_service.verificar_disponibilidade(
                imovel.id_reserva,
                data_inicio,
                data_fim
            )
            
            return Response({
                'disponivel': disponivel,
                'data_inicio': data_inicio.isoformat(),
                'data_fim': data_fim.isoformat()
            })
            
        except ValueError as e:
            return Response(
                {'error': f'Formato de data inválido. Detalhes: {str(e)}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.error(f"Erro ao verificar disponibilidade: {str(e)}")
            return Response(
                {'error': f'Erro ao verificar disponibilidade: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )




class ComodidadeViewSet(viewsets.ModelViewSet):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Comodidade.objects.all()
    serializer_class = ComodidadeSerializer
    http_method_names = ['get', 'post', 'options']




class EditarImovelView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, id):
        try:
            logger.info(f"Iniciando edição do imóvel {id}")
            logger.info(f"Dados recebidos: {request.data}")
            logger.info(f"Arquivos recebidos: {request.FILES}")

            # Verifica se o imóvel existe e pertence ao usuário
            try:
                imovel = Imovel.objects.get(id=id, proprietario=request.user)
            except Imovel.DoesNotExist:
                return Response(
                    {'erro': 'Imóvel não encontrado ou você não tem permissão para editá-lo'}, 
                    status=status.HTTP_404_NOT_FOUND
                )

            # Processa os dados do imóvel
            dados_imovel = request.data.get("imovel", {})
            if isinstance(dados_imovel, str):
                import json
                dados_imovel = json.loads(dados_imovel)

            # Atualiza os campos básicos do imóvel
            for field in ['titulo', 'descricao', 'preco', 'numero_hospedes', 'regras']:
                if field in dados_imovel:
                    setattr(imovel, field, dados_imovel[field])

            # Processa o logo se existir
            logo = request.FILES.get('logo')
            if logo:
                imovel.logo = logo

            # Processa as comodidades
            comodidades = dados_imovel.get('comodidades', [])
            if comodidades:
                imovel.comodidades.clear()
                for nome in comodidades:
                    comodidade, _ = Comodidade.objects.get_or_create(nome=nome)
                    imovel.comodidades.add(comodidade)

            # Salva as alterações
            imovel.save()

            # Processa as novas imagens
            imagens = request.FILES.getlist("imagens", [])
            for imagem in imagens:
                imagem_imovel.objects.create(
                    imovel=imovel,
                    imagem=imagem,
                    legenda=imagem.name
                )

            return Response({'mensagem': 'Imóvel atualizado com sucesso!'}, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Erro ao atualizar imóvel: {str(e)}", exc_info=True)
            return Response(
                {'erro': f'Erro ao atualizar imóvel: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, id):
        try:
            logger.info(f"Iniciando exclusão do imóvel {id}")
            
            # Verifica se o imóvel existe e pertence ao usuário
            try:
                imovel = Imovel.objects.get(id=id, proprietario=request.user)
            except Imovel.DoesNotExist:
                return Response(
                    {'erro': 'Imóvel não encontrado ou você não tem permissão para excluí-lo'}, 
                    status=status.HTTP_404_NOT_FOUND
                )

            # Exclui o imóvel (isso também excluirá automaticamente o endereço e as imagens devido ao CASCADE)
            imovel.delete()
            
            logger.info(f"Imóvel {id} excluído com sucesso")
            return Response({'mensagem': 'Imóvel excluído com sucesso!'}, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Erro ao excluir imóvel: {str(e)}", exc_info=True)
            return Response(
                {'erro': f'Erro ao excluir imóvel: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )




class ImoveisUsuarioView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Busca todos os imóveis do usuário autenticado
            imoveis = Imovel.objects.filter(proprietario=request.user).select_related('endereco').prefetch_related('imagens')
            
            # Serializa os imóveis
            serializer = imovel_serializer(imoveis, many=True)
            
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Erro ao buscar imóveis do usuário: {str(e)}", exc_info=True)
            return Response(
                {'erro': f'Erro ao buscar imóveis: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )




class imoveis_destaque(viewsets.ReadOnlyModelViewSet):
    queryset = Imovel.objects.all().select_related('endereco').prefetch_related('imagens', 'comodidades')
    serializer_class = imovel_serializer

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Anota a média das avaliações e a contagem de avaliações para cada imóvel
        queryset = queryset.annotate(
            media_avaliacoes=Avg('comentarios__avaliacao'),
            total_avaliacoes=Count('comentarios')
        ).filter(
            total_avaliacoes__gt=0  # Filtra apenas imóveis que têm avaliações
        ).order_by(
            '-total_avaliacoes',  # Ordena primeiro pelo número de avaliações
            '-media_avaliacoes'   # Depois pela média das avaliações
        )[:4]  # Limita aos 4 primeiros resultados

        return queryset




class ImoveisDestaqueView(viewsets.ReadOnlyModelViewSet):
    serializer_class = imovel_destaque_serializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Imovel.objects.filter(
            comentarios__isnull=False
        ).annotate(
            total_avaliacoes=Count('comentarios'),
            media_avaliacoes=Avg('comentarios__avaliacao')
        ).filter(
            total_avaliacoes__gt=0
        ).order_by(
            '-total_avaliacoes',
            '-media_avaliacoes'
        )[:4]

        return queryset.select_related(
            'proprietario',
            'endereco'
        ).prefetch_related(
            'imagens',
            'comentarios'
        )





