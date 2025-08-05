from .repositories import UserRepository
from django.contrib.auth.password_validation import validate_password

class UserService:
    
    @staticmethod
    def get_endereco(usuario):
        return UserRepository.get_endereco(usuario)
    

    # SALVA O USUARIO NO BANCO DE DADOS
    @staticmethod
    def registrar_usuario(usuario_data):

        validate_password(usuario_data['password'])
        return UserRepository.save_user(usuario_data)