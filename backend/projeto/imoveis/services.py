from .repositories import ImovelRepository
from reservas.services import GoogleCalendarService
from django.db.models import Avg, Count


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
    
    


        


