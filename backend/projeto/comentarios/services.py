from .serializers import ComentarioSerializer
from rest_framework.request import Request
from django.contrib.auth import get_user_model

User = get_user_model()


class ComentariosService:
    @staticmethod
    def save_comentario(comentario_data: dict, usuario: User) -> ComentarioSerializer:
        comentario = comentario_data.copy()
        comentario['usuario'] = usuario.id
        serializer = ComentarioSerializer(data=comentario)
        serializer.is_valid(raise_exception=True)
        return serializer