from .models import Imovel, Endereco_imovel, Comodidade, imagem_imovel
from rest_framework import serializers


class EnderecoImovelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco_imovel
        exclude = ['imovel']


class ImagemImovelSerializer(serializers.ModelSerializer):
    class Meta:
        model = imagem_imovel
        fields = ['id', 'imagem']



class imovel_serializer(serializers.ModelSerializer):
    endereco = EnderecoImovelSerializer()
    comodidades = serializers.SlugRelatedField(
        many=True,
        slug_field='nome',
        queryset=Comodidade.objects.all(),
        required=False
    )

    imagens = ImagemImovelSerializer(many=True, required=False)

    class Meta:
        model = Imovel
        fields = [
            'id', 'titulo', 'descricao', 'preco',
            'numero_hospedes', 'regras', 'comodidades', 'endereco', 'imagens'
        ]

    def create(self, validated_data):
        endereco_data = validated_data.pop('endereco')
        comodidades_data = validated_data.pop('comodidades', [])
        imagens_data = validated_data.pop('imagens', [])


        # Adiciona o proprietário manualmente
        user = self.context['request'].user

        imovel = Imovel.objects.create(proprietario=user, **validated_data)

        Endereco_imovel.objects.create(imovel=imovel, **endereco_data)

        if comodidades_data:
            imovel.comodidades.set(comodidades_data)

        for imagem_data in imagens_data:
            imagem_imovel.objects.create(imovel=imovel, **imagem_data)

        return imovel