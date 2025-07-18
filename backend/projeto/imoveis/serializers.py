from .models import Imovel, Endereco_imovel, Comodidade, imagem_imovel
from rest_framework import serializers
import logging
from .repositories import ImovelRepository
from .services import ImovelService

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
    logo = serializers.ImageField(required=False)
    imagens = ImagemImovelSerializer(many=True, read_only=True)
    
    proprietario_nome = serializers.SerializerMethodField()
    proprietario_telefone = serializers.SerializerMethodField()

    class Meta:
        model = Imovel
        fields = [
            'id', 'titulo', 'descricao', 'preco',
            'numero_hospedes', 'regras', 'comodidades', 'imagens', 'endereco', 'logo', 'id_reserva',
            'proprietario_nome', 'proprietario_telefone'
        ]

        extra_kwargs = {
            'proprietario': {'write_only': True, 'required': False}, 
            'id_reserva': {'required': False} 
        }

    def get_proprietario_nome(self, obj):
        return obj.proprietario.nome if obj.proprietario else None

    def get_proprietario_telefone(self, obj):
        return obj.proprietario.telefone if obj.proprietario else None
        
    def create(self, validated_data):
        # EXTRAI OS DADOS DE ENDERECO E COMODIDADES DO VALIDATED_DATA
        endereco_data = validated_data.pop('endereco')
        comodidades_data = validated_data.pop('comodidades', [])\

        imovel = ImovelService.cadastrar_imovel(validated_data, comodidades_data, endereco_data)
        
        return imovel

        
    def update(self, instance, validated_data):
        # EXTRAI OS DADOS DE ENDERECO E COMODIDADES DO VALIDATED_DATA
        endereco_data = validated_data.pop('endereco', None)
        comodidades_list = validated_data.pop('comodidades', None)

        # ATUALIZA OS CAMPOS DIRETO DO IMOVEL
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # ATUALIZA O ENDERECO ANINHADO
        if endereco_data:
            # Obtém a instância do endereço relacionada ao imóvel
            endereco_instance = instance.endereco
                
            # Atualiza a instância do endereço. 
            for addr_attr, addr_value in endereco_data.items():
                setattr(endereco_instance, addr_attr, addr_value)
            endereco_instance.save()

        # Atualiza as comodidades (se fornecidas)
        if comodidades_list is not None:
            instance.comodidades.set(comodidades_list) # Substitui todas as comodidades

        instance.save() # Salva o imóvel com as alterações
        return instance

    

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