from rest_framework.validators import ValidationError
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.authentication import JWTAuthentication
from .repositories import UserRepository
from .serializers import UserSerializer, EnderecoSerializer

class UserService:
    
    @staticmethod
    def get_endereco(usuario):
        return UserRepository.get_endereco(usuario)
    

    # SALVA O USUARIO NO BANCO DE DADOS
    @staticmethod
    def registrar_usuario(usuario_data):

        validate_password(usuario_data['password'])
        return UserRepository.save_user(usuario_data)


    # VERIFICA SE EMAIL E SENHA SAO CREDENCIAIS CORRETAS DE UM USUARIO
    @staticmethod
    def autenticar_usuario(usuario_data):
        email = usuario_data['email']
        senha = usuario_data['password']

        user = authenticate(username = email, password = senha)
        if not user:
            raise ValidationError("Credenciais invalidas")
        
        return user
    

    
    # EDITA USUARIO E SALVA NOVAMENTE NO BANCO DE DADOS
    @staticmethod
    def update(user, validated_data, endereco_data=None):

        serializer = UserSerializer(user, data=validated_data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        endereco_serializer = None

        if endereco_data:
            endereco, _ = UserRepository.get_or_create_endereco(user, endereco_data)
            endereco_serializer = EnderecoSerializer(endereco, data=endereco_data, partial=True)
            endereco_serializer.is_valid(raise_exception=True)
            endereco_serializer.save()

        return {
            'user': serializer.data,
            'endereco': endereco_serializer.data if endereco_serializer else None
        }



class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Tenta pegar o token do cookie
        token = request.COOKIES.get('access_token')
        
        if token is None:
            return None
            
        validated_token = self.get_validated_token(token)
        return self.get_user(validated_token), validated_token



