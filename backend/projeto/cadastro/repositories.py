from .models import usuario
from django.contrib.auth import get_user_model

Usuario = get_user_model()

class UserRepository:
    @staticmethod
    def get_by_email(email):
        return Usuario.objects.filter(email=email).first()
    

    @staticmethod
    def save_user(usuario_data):
        return Usuario.objects.create_user(**usuario_data)