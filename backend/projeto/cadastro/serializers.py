from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import Endereco

usuario = get_user_model()


class registroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = usuario
        fields = '__all__'

    def validate_tipo(self, value):
        if value not in usuario.TipoUsuario.values:
            raise serializers.ValidationError("Tipo de usuário inválido.")
        return value

    def create(self, validated_data):
        groups = validated_data.pop('groups', None)
        user = usuario.objects.create_user(**validated_data)
        user_permissions = validated_data.pop('user_permissions', None)
        
        if groups:
            user.groups.set(groups)
        
        if user_permissions:
            user.user_permissions.set(user_permissions)  
        
        return user
        
    

class loginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        user = authenticate(username = email, password = password)

        if user is None:
            raise serializers.ValidationError("credenciais inválidas")
        
        if not user.is_active:
            raise serializers.ValidationError("Usuário inativo")
        
        data["user"] = user

        return data
    


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = usuario
        fields = '__all__'


class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = ['rua', 'cidade', 'estado', 'cep', 'pais']


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
            endereco, _ = Endereco.objects.get_or_create(usuario=instance)
            for attr, value in endereco_data.items():
                setattr(endereco, attr, value)
            endereco.save()

        return instance
        
