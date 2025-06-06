from django.db import models
from django.contrib.auth import get_user_model
from imoveis.models import Imovel
from django.conf import settings

Usuario = get_user_model()

class Reserva(models.Model):
    STATUS_CHOICES = [
        ('PENDENTE', 'Pendente'),
        ('CONFIRMADA', 'Confirmada'),
        ('CANCELADA', 'Cancelada'),
    ]
    
    Imovel = models.ForeignKey(Imovel, on_delete=models.CASCADE)
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    data_inicio = models.DateTimeField()
    data_fim = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDENTE')
    valor_total = models.DecimalField(max_digits=10, decimal_places=2)
    evento_google_id = models.CharField(max_length=255, blank=True, null=True)  
    criado_em = models.DateTimeField(auto_now_add=True)
    observacoes = models.CharField(max_length=255, null=True, blank=True)
    numero_hospedes = models.IntegerField()
    
    def __str__(self):
        return f"Reserva de {self.Imovel.nome} por {self.usuario.email}" 