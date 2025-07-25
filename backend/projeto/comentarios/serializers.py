from rest_framework import serializers
from .models import Comentario

class ComentarioSerializer(serializers.ModelSerializer):
    usuario_nome = serializers.SerializerMethodField()
    
    class Meta:
        model = Comentario
        fields = ['id', 'imovel', 'usuario', 'usuario_nome', 'texto', 'data_criacao', 'avaliacao']
        read_only_fields = ['data_criacao']

    def get_usuario_nome(self, obj):
        return obj.usuario.nome

    def create(self, validated_data):
        return super().create(validated_data) 