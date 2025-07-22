from venv import logger
from .repositories import ImovelRepository
from reservas.services import GoogleCalendarService
from django.db.models import Avg, Count
import json
from .models import Comodidade


class ImovelService:
    
    @staticmethod
    def cadastrar_imovel(imovel_data, comodidades_data, endereco_data):
        try:
            # SALVA OS DADOS PRINCIPAIS DO IMOVEL    
            imovel = ImovelRepository.save_imovel(imovel_data)
            print("dados do imovel:", imovel) 

            # CRIA E ASSOCIA O ENDERECO A UM IMOVEL
            ImovelRepository.save_endereco(endereco_data, imovel)

            # ADICIONA AS COMODIDADES
            if comodidades_data:
                imovel.comodidades.set(comodidades_data)

            return imovel
        
        except Exception as e:
            raise Exception(f"Erro ao criar imóvel: {str(e)}")
        
    
    # SALVA AS IMAGENS RELACIONADAS AO IMOVEL
    @staticmethod
    def cadastrar_imagens(imagens_data, imovel):
        for imagem in imagens_data:
            ImovelRepository.save_imagens(imagem, imovel)


    @staticmethod
    def cadastrar_endereco(endereco_data):
        ImovelRepository.save_endereco(endereco_data)


    @staticmethod       
    def filtrar_imovel(queryset, cidade, valor_maximo, avaliacao_minima):
         # CRIA UMA NOVA COLUNA PARA SALVAR A MEDIA DE AVALIACOES DE CADA IMOVEL
        queryset = queryset.annotate(
            media_avaliacoes=Avg('comentarios__avaliacao')
        )

        # FILTRA POR CIDADE SE O USUARIO DIGITAR NO CAMPO
        if cidade:
            queryset = queryset.filter(endereco__cidade__iexact=cidade)

        # FILTRA POR VALOR MAXIMO 
        if valor_maximo:
            try:
                valor_maximo = float(valor_maximo)
                queryset = queryset.filter(preco__lte=valor_maximo)
            except ValueError:
                pass
        
        # FILTRA POR AVALIACAO MINIMA
        if avaliacao_minima:
            try:
                avaliacao_minima = float(avaliacao_minima)
                queryset = queryset.filter(media_avaliacoes__gte=avaliacao_minima)
            except ValueError:
                pass
           
        return queryset
    
    
    @staticmethod
    def editar_imovel(imovel, dados_editados, logo, comodidades, imagens):
        
        # ATUALIZA OS CAMPOS BASE DO IMOVEL
        for field in ['titulo', 'descricao', 'preco', 'numero_hospedes', 'regras']:
                if field in dados_editados:
                    setattr(imovel, field, dados_editados[field])

        # ATUALIZA A LOGO SE EXISTIR
        if logo:
            imovel.logo = logo

        # ATUALIZA AS COMODIDADES
        if comodidades:
                imovel.comodidades.clear()
                for nome in comodidades:
                    comodidade, _ = Comodidade.objects.get_or_create(nome=nome)
                    imovel.comodidades.add(comodidade)


        images_to_delete_ids = dados_editados.get('images_to_delete', [])
    
        if images_to_delete_ids:
            # Filtra as imagens do imóvel que correspondem aos IDs para deletar
            # e as deleta. 
            try:
                # Garante que as imagens a serem deletadas realmente pertencem ao imóvel
                # para evitar que um usuário mal-intencionado delete imagens de outros imóveis.
                imovel.imagens.filter(id__in=images_to_delete_ids).delete()
            
            except Exception as e:
                raise Exception(f"Erro ao deletar imagens: {str(e)}")


        # SALVA AS ALTERACOES
        imovel.save()

        # SALVA AS NOVAS IMAGENS ENVIADAS NA EDICAO
        for imagem in imagens:
            ImovelRepository.save_imagens(imagem, imovel)

   



        


