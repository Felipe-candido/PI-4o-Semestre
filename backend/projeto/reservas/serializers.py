from rest_framework import serializers
from .models import Reserva
from django.contrib.auth import get_user_model
from imoveis.models import Imovel
from imoveis.serializers import imovel_serializer

Usuario = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nome', 'email', 'first_name', 'last_name']

class ReservaSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)
    imovel = Imovel()
    imovel_id = serializers.PrimaryKeyRelatedField(
        queryset=Imovel.objects.all(),
        write_only=True,
        source='chacara'
    )

    class Meta:
        model = Reserva
        fields = [
            'id', 'imovel', 'imovel_id', 'usuario', 'data_inicio', 
            'data_fim', 'status', 'valor_total', 'criado_em'
        ]
        read_only_fields = ['status', 'valor_total']

    def create(self, validated_data):
        # Calcula o valor total baseado nos dias de reserva
        data_inicio = validated_data['data_inicio']
        data_fim = validated_data['data_fim']
        dias = (data_fim - data_inicio).days
        imovel = validated_data['imovel']
        
        validated_data['valor_total'] = imovel.preco_diaria * dias
        return super().create(validated_data) 