from .repositories import ImovelRepository
from reservas.services import GoogleCalendarService


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


