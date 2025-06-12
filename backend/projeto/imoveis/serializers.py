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


class ComodidadeField(serializers.Field):
    def to_representation(self, value):
        return [comodidade.nome for comodidade in value.all()]

    def to_internal_value(self, data):
        comodidades = []
        for nome in data:
            comodidade, created = Comodidade.objects.get_or_create(nome=nome)
            comodidades.append(comodidade)
        return comodidades


class imovel_serializer(serializers.ModelSerializer):
    endereco = EnderecoImovelSerializer()
    comodidades = ComodidadeField(required=False)
    imagens = ImagemImovelSerializer(many=True, required=False)
    proprietario_nome = serializers.SerializerMethodField()
    proprietario_telefone = serializers.SerializerMethodField()

    class Meta:
        model = Imovel
        fields = [
            'id', 'titulo', 'descricao', 'preco',
            'numero_hospedes', 'regras', 'comodidades', 'endereco', 'imagens', 'logo', 'id_reserva',
            'proprietario_nome', 'proprietario_telefone'
        ]

    def get_proprietario_nome(self, obj):
        return obj.proprietario.nome if obj.proprietario else None

    def get_proprietario_telefone(self, obj):
        return obj.proprietario.telefone if obj.proprietario else None

    def create(self, validated_data):
        try:

            endereco_data = validated_data.pop('endereco')
            comodidades_data = validated_data.pop('comodidades', [])
            imagens_data = validated_data.pop('imagens', [])

            # Adiciona o proprietário manualmente
            user = self.context['request'].user
            validated_data['proprietario'] = user

         
            imovel = Imovel.objects.create(**validated_data)
         

            # CRIA O ENDEREÇO DO IMÓVEL
            Endereco_imovel.objects.create(imovel=imovel, **endereco_data)
            logger.info("Endereço criado com sucesso")

            # ADICIONA AS COMODIDADES AO IMÓVEL
            if comodidades_data:
                imovel.comodidades.set(comodidades_data)
                logger.info(f"Comodidades adicionadas: {[c.nome for c in comodidades_data]}")

            # ADICIONA AS IMAGENS AO IMÓVEL
            for imagem_data in imagens_data:
                imagem_imovel.objects.create(imovel=imovel, **imagem_data)
                logger.info(f"Imagem adicionada: {imagem_data.get('legenda', '')}")

            return imovel

        except Exception as e:
            logger.error(f"Erro na criação do imóvel: {str(e)}", exc_info=True)
            raise serializers.ValidationError(f"Erro ao criar imóvel: {str(e)}")


class imovel_destaque_serializer(serializers.ModelSerializer):
    proprietario_nome = serializers.CharField(source='proprietario.nome', read_only=True)
    endereco_cidade = serializers.CharField(source='endereco.cidade', read_only=True)
    endereco_estado = serializers.CharField(source='endereco.estado', read_only=True)
    imagem_principal = serializers.SerializerMethodField()
    media_avaliacoes = serializers.FloatField(read_only=True)
    total_avaliacoes = serializers.IntegerField(read_only=True)

    class Meta:
        model = Imovel
        fields = [
            'id',
            'titulo',
            'descricao',
            'valor_diaria',
            'proprietario_nome',
            'endereco_cidade',
            'endereco_estado',
            'imagem_principal',
            'media_avaliacoes',
            'total_avaliacoes'
        ]

    def get_imagem_principal(self, obj):
        imagem = obj.imagens.first()
        if imagem:
            return {
                'id': imagem.id,
                'imagem': imagem.imagem.url,
                'legenda': imagem.legenda
            }
        return None