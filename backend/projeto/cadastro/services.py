from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.authentication import JWTAuthentication
from .repositories import UserRepository

class UserService:

    @staticmethod
    def registrar_usuario(usuario_data):
        if UserRepository.get_by_email(usuario_data['email']):
            raise ValidationError("Email ja cadastrado")
        
        validate_password(usuario_data['password'])
        return UserRepository.save_user(usuario_data)
    
    @staticmethod
    def autenticar_usuario(usuario_data):
        email = usuario_data['email']
        senha = usuario_data['password']

        user = authenticate(username = email, password = senha)
        if not user:
            raise ValidationError("Credenciais invalidas")
        
        return user
    
    @staticmethod
    def get_endereco(usuario):
        return UserRepository.get_endereco(usuario)
        


class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Tenta pegar o token do cookie
        token = request.COOKIES.get('access_token')
        
        if token is None:
            return None
            
        validated_token = self.get_validated_token(token)
        return self.get_user(validated_token), validated_token



