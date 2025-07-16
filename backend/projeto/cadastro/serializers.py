from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import Endereco_usuario

usuario = get_user_model()


class RegistroSerializer(serializers.Serializer):
    nome = serializers.CharField()
    sobrenome = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class LoginSerializer(serializers.Serializer):   
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = usuario
        fields = '__all__'


class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco_usuario
        fields = ['rua', 'cidade', 'estado', 'cep', 'pais', 'numero']


        
