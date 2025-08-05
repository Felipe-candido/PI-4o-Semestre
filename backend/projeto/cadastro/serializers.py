from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Endereco_usuario
from .service2 import UserService
from rest_framework.validators import UniqueValidator
from rest_framework.exceptions import ValidationError

usuario = get_user_model()


class RegistroSerializer(serializers.Serializer):
    nome = serializers.CharField()
    sobrenome = serializers.CharField()
    email = serializers.EmailField(
        validators=[UniqueValidator(
            queryset = usuario.objects.all(),
            message = "Esse email ja esta cadastrado"
        )]
    )
    password = serializers.CharField(write_only=True)
    confirmaSenha = serializers.CharField(write_only=True)
    

    def validate(self, data):
        # Validação de senhas coincidentes 
        if data['password'] != data['confirmaSenha']:
            raise serializers.ValidationError({"confirmaSenha": "As senhas não coincidem"})
        return data

    def create(self, validated_data):
        try:
        # Remova 'confirmaSenha' antes de passar para o serviço ou modelo
            validated_data.pop('confirmaSenha') 
            return UserService.registrar_usuario(validated_data)
        
        except Exception as e:
            raise ValidationError({"password": str(e)})






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


        
