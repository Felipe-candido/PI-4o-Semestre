from .models import Imovel, Endereco_imovel, imagem_imovel

class ImovelRepository:
    @staticmethod
    def save_imovel(imovel_data):
        return Imovel.objects.create(**imovel_data)
    
    @staticmethod
    def save_endereco(endereco_data, imovel):
        return Endereco_imovel.objects.create(**endereco_data, imovel=imovel)
    
    @staticmethod
    def save_imagens(imagem, imovel):
        return imagem_imovel.objects.create(imovel=imovel,
                                            imagem=imagem,
                                            legenda=imagem.name )
