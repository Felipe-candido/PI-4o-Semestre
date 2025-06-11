from rest_framework import serializers
from .models import Comentario
from django.contrib.auth import get_user_model

class ComentarioSerializer(serializers.ModelSerializer):
    usuario_nome = serializers.SerializerMethodField()
    
    class Meta:
        model = Comentario
        fields = ['id', 'imovel', 'usuario', 'usuario_nome', 'texto', 'data_criacao', 'avaliacao']
        read_only_fields = ['usuario', 'data_criacao']

    def get_usuario_nome(self, obj):
        return obj.usuario.nome

    def create(self, validated_data):
        validated_data['usuario'] = self.context['request'].user
        return super().create(validated_data) 