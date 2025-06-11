from rest_framework import serializers
from .models import Reserva
from django.contrib.auth import get_user_model
from imoveis.models import Imovel
from imoveis.serializers import imovel_serializer

Usuario = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nome', 'email', 'telefone']


class ImovelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imovel
        fields = ['id', 'titulo', 'preco']


class ReservaSerializer(serializers.ModelSerializer):
    Imovel = serializers.PrimaryKeyRelatedField(queryset=Imovel.objects.all())
    imovel_id = serializers.IntegerField(write_only=True, required=False)
    numero_hospedes = serializers.IntegerField(required=True)
    valor_total = serializers.DecimalField(max_digits=10, decimal_places=2, required=True)
    usuario = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all(), required=False)

    class Meta:
        model = Reserva
        fields = [
            'id', 'Imovel', 'imovel_id', 'usuario', 'data_inicio', 
            'data_fim', 'numero_hospedes', 'observacoes', 'valor_total', 
            'status', 'evento_google_id', 'criado_em'
        ]
        read_only_fields = ['id', 'status', 'evento_google_id', 'criado_em']

    def validate(self, data):
        # Validar número de hóspedes
        if data.get('numero_hospedes', 0) <= 0:
            raise serializers.ValidationError("O número de hóspedes deve ser maior que zero")
        return data

    def create(self, validated_data):
        # Se tiver imovel_id, usar ele para definir Imovel
        if 'imovel_id' in validated_data:
            imovel_id = validated_data.pop('imovel_id')
            validated_data['Imovel'] = Imovel.objects.get(pk=imovel_id)

        # Garantir que temos o usuário
        if 'usuario' not in validated_data and self.context.get('request'):
            validated_data['usuario'] = self.context['request'].user

        return super().create(validated_data)
    

class ReservaReadSerializer(serializers.ModelSerializer):
    usuario = UserSerializer()
    Imovel = ImovelSerializer()

    class Meta:
        model = Reserva
        fields = [
            'id', 'Imovel', 'usuario', 'data_inicio', 
            'data_fim', 'numero_hospedes', 'observacoes', 'valor_total', 
            'status', 'evento_google_id', 'criado_em'
        ]