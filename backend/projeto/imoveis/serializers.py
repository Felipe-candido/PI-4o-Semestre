from .models import Imovel, Endereco_imovel, Comodidade
from rest_framework import serializers


class EnderecoImovelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco_imovel
        exclude = ['imovel']



class imovel_serializer(serializers.ModelSerializer):
    endereco = EnderecoImovelSerializer()
    comodidades = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Comodidade.objects.all(),
        required=False
    )

    class Meta:
        model = Imovel
        fields = [
            'id', 'titulo', 'descricao', 'preco',
            'numero_hospedes', 'regras', 'comodidades', 'endereco'
        ]

    def create(self, validated_data):
        endereco_data = validated_data.pop('endereco')
        comodidades_data = validated_data.pop('comodidades', [])

        # Adiciona o proprietário manualmente
        request = self.context.get('request')
        proprietario = request.user if request else None

        imovel = Imovel.objects.create(proprietario=proprietario, **validated_data)

        Endereco_imovel.objects.create(imovel=imovel, **endereco_data)

        if comodidades_data:
            imovel.comodidades.set(comodidades_data)

        return imovel