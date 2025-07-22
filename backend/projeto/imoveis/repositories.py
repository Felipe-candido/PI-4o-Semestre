from .models import Imovel, Endereco_imovel, imagem_imovel, Comodidade
from django.core.exceptions import ObjectDoesNotExist

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
                                            legenda=imagem.name)
    
    @staticmethod
    def get_all_imoveis():
        return Imovel.objects.all().select_related('endereco').prefetch_related('imagens', 'comodidades')
    
    @staticmethod
    def get_by_id(imovel_id):
        return Imovel.objects.select_related('endereco').prefetch_related('imagens', 'comodidades').get(id=imovel_id)
    
    @staticmethod
    def get_imovel_by_id_and_owner(imovel_id, owner_user):
        try:
            return Imovel.objects.get(id=imovel_id, proprietario=owner_user)
        except Imovel.DoesNotExist:
            raise ObjectDoesNotExist("Imóvel não encontrado ou não pertence ao usuário.")
        
    @staticmethod
    def get_or_create_comodidades(nome):
        return Comodidade.objects.get_or_create(nome)