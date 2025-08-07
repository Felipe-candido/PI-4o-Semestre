from django.db import models
from django.contrib.auth import get_user_model
from reservas.models import Reserva

User = get_user_model()

# Create your models here.
class Conta_MP(models.Model):
    proprietario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='conta_mp')
    access_token = models.CharField(max_length=255, unique=True)
    public_key = models.CharField(max_length=255, blank= True, unique=True)
    conta_MP_id = models.CharField(max_length=255, blank= True, unique=True)
    conectado_mp = models.BooleanField(default=False)
    data_conexao = models.DateTimeField(auto_now_add=True)





# Model para controle de pagamentos
class PagamentoReserva(models.Model):
    STATUS_CHOICES = [
        ('PENDENTE', 'Pendente'),
        ('PAGO', 'Pago'),
        ('RETIDO', 'Retido (Aguardando Check-in)'),
        ('LIBERADO', 'Liberado para Proprietário'),
        ('ESTORNADO', 'Estornado'),
        ('CANCELADO', 'Cancelado'),
    ]
    
    reserva = models.OneToOneField(Reserva, on_delete=models.CASCADE, related_name='pagamento')
    payment_id = models.CharField(max_length=255, blank=True, null=True)  # ID do Mercado Pago
    preference_id = models.CharField(max_length=255, blank=True, null=True)  # ID da preferência MP
    # Valores
    valor_total = models.DecimalField(max_digits=10, decimal_places=2)
    taxa_plataforma = models.DecimalField(max_digits=10, decimal_places=2)
    valor_proprietario = models.DecimalField(max_digits=10, decimal_places=2)
    # Status e controle
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDENTE')
    # Split payment - será preenchido quando split for executado
    split_payment_id = models.CharField(max_length=255, blank=True, null=True)
    # Datas de controle
    data_pagamento = models.DateTimeField(blank=True, null=True)
    data_checkin_confirmado = models.DateTimeField(blank=True, null=True)
    data_split_executado = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.valor_proprietario:
            # Calcula automaticamente valor do proprietário (valor total - taxa plataforma)
            self.valor_proprietario = self.valor_total - self.taxa_plataforma
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"Pagamento Reserva #{self.reserva.id} - {self.status}"


class CheckIn(models.Model):
    STATUS_CHOICES = [
        ('PENDENTE', 'Pendente'),
        ('CONFIRMADO', 'Confirmado'),
        ('NAO_COMPARECEU', 'Não Compareceu'),
    ]
    
    reserva = models.OneToOneField(Reserva, on_delete=models.CASCADE, related_name='checkin')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDENTE')
    
    # Quem pode confirmar o check-in
    confirmado_por = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Controle de tempo
    data_prevista = models.DateTimeField()  # Data/hora prevista para check-in
    data_confirmacao = models.DateTimeField(blank=True, null=True)
    
    # Observações
    observacoes = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Check-in Reserva #{self.reserva.id} - {self.status}" 

