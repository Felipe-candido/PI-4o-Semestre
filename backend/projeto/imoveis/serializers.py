from .models import Imovel, Endereco_imovel, Comodidade, imagem_imovel
from rest_framework import serializers
import logging

logger = logging.getLogger(__name__)


class EnderecoImovelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco_imovel
        exclude = ['imovel']


class ImagemImovelSerializer(serializers.ModelSerializer):
    class Meta:
        model = imagem_imovel
        fields = ['id', 'imagem', 'legenda']


class ComodidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comodidade
        fields = ['id', 'nome']


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
        try:
            logger.info("Iniciando criação de imóvel no serializer")
            logger.info(f"Dados validados: {validated_data}")

            endereco_data = validated_data.pop('endereco')
            comodidades_data = validated_data.pop('comodidades', [])
            imagens_data = validated_data.pop('imagens', [])

            # Adiciona o proprietário manualmente
            user = self.context['request'].user
            validated_data['proprietario'] = user

            logger.info(f"Dados do imóvel: {validated_data}")
            logger.info(f"Dados do endereço: {endereco_data}")
            logger.info(f"Comodidades: {comodidades_data}")

            # Cria o imóvel
            imovel = Imovel.objects.create(**validated_data)
            logger.info(f"Imóvel criado com ID: {imovel.id}")

            # Cria o endereço
            Endereco_imovel.objects.create(imovel=imovel, **endereco_data)
            logger.info("Endereço criado com sucesso")

            # Adiciona as comodidades
            if comodidades_data:
                imovel.comodidades.set(comodidades_data)
                logger.info("Comodidades adicionadas com sucesso")

            # Adiciona as imagens
            for imagem_data in imagens_data:
                imagem_imovel.objects.create(imovel=imovel, **imagem_data)
                logger.info(f"Imagem adicionada: {imagem_data.get('legenda', '')}")

            return imovel
        except Exception as e:
            logger.error(f"Erro ao criar imóvel no serializer: {str(e)}", exc_info=True)
            raise serializers.ValidationError(f"Erro ao criar imóvel: {str(e)}")