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


class edit_user_serializer(serializers.ModelSerializer):
    endereco = EnderecoSerializer(required=False)

    class Meta:
        model = usuario
        fields =  ['email', 'nome', 'cpf', 'telefone', 'endereco', 'dataNascimento']
        read_only_fields = ['id', 'email']  

    def update(self, instance, validated_data):
        endereco_data = validated_data.pop('endereco', None)

        # ATUALIZA OS CAMPOS DO USUARIO
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # ATUALZIA OU CRIA O ENDERECO
        if endereco_data:
            endereco, _ = Endereco_usuario.objects.get_or_create(usuario=instance)
            for attr, value in endereco_data.items():
                setattr(endereco, attr, value)
            endereco.save()

        return instance
        
