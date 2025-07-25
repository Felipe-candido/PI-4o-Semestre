from .models import Comentario
from django.db.models import Avg


class ComentariosRepository:

    @staticmethod
    def get_by_id(imovel_id):
        if imovel_id:
            return Comentario.objects.filter(imovel_id=imovel_id).order_by('-data_criacao')   
        return Comentario.objects.none()
    
    def avg_avaliacoes(imovel_id):
        return Comentario.objects.filter(imovel_id=imovel_id).aggregate(media=Avg('avaliacao'))
    
    def total_avaliacoes(imovel_id):
        return Comentario.objects.filter(imovel_id=imovel_id).count()
    
    
