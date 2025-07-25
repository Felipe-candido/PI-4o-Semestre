from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Conta_MP(models.Model):
    proprietario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='conta_mp')
    access_token = models.CharField(max_length=255, unique=True)
    public_key = models.CharField(max_length=255, blank= True, unique=True)
    conta_MP_id = models.CharField(max_length=255, blank= True, unique=True)
    conectado_mp = models.BooleanField(default=False)
    data_conexao = models.DateTimeField(auto_now_add=True)
