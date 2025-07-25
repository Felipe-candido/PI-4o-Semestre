from . models import Conta_MP
from django.contrib.auth import get_user_model
from rest_framework import serializers

class User_serializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'nome', 'email', 'telefone']


class contaMP_serializer(serializers.ModelSerializer):
    proprietario = User_serializer()

    class Meta:
        model = Conta_MP
        fields = ['prorietario', 'access_token', 'public_key', 'conta_MP_id', 'conectado_mp', 'data_conexao']