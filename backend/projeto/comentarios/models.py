from django.db import models
from django.contrib.auth import get_user_model
from imoveis.models import Imovel

class Comentario(models.Model):
    imovel = models.ForeignKey(Imovel, on_delete=models.CASCADE, related_name='comentarios')
    usuario = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    texto = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)
    avaliacao = models.IntegerField(default=5)  # 1-5 stars

    class Meta:
        ordering = ['-data_criacao']

    def __str__(self):
        return f'Comentário de {self.usuario.username} em {self.imovel.titulo}'
    
    