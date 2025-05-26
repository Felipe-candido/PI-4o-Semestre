from datetime import datetime
from django.shortcuts import render

from reservas.services import GoogleCalendarService
from .models import Imovel, Comodidade, imagem_imovel
from rest_framework.response import Response
from .serializers import imovel_serializer, ComodidadeSerializer
from rest_framework import status, viewsets
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from projeto.services import CookieJWTAuthentication
import logging
from rest_framework.views import APIView

logger = logging.getLogger(__name__)

class cadastro_imovel(viewsets.ModelViewSet):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Imovel.objects.all()
    serializer_class = imovel_serializer
    http_method_names = ['post', 'options']

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

            imovel = serializer.save()
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

        if cidade:
            queryset = queryset.filter(endereco__cidade__iexact=cidade)

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
        data_inicio = request.query_params.get('data_inicio')
        data_fim = request.query_params.get('data_fim')
        
        if not data_inicio or not data_fim:
            return Response(
                {'error': 'Data início e fim são obrigatórios'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        calendar_service = GoogleCalendarService()
        disponivel = calendar_service.verificar_disponibilidade(
            imovel.id_reserva,
            datetime.fromisoformat(data_inicio),
            datetime.fromisoformat(data_fim)
        )
        
        return Response({'disponivel': disponivel})




class ComodidadeViewSet(viewsets.ModelViewSet):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Comodidade.objects.all()
    serializer_class = ComodidadeSerializer
    http_method_names = ['get', 'post', 'options']





