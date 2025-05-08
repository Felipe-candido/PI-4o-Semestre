from .models import Imovel
from rest_framework import serializers

class imovel_serializer(serializers.ModelSerializer):
      class Meta:
            model = Imovel
            fields = "__all__"

      def create(self, validated_data):
            imovel = Imovel.objects.create(**validated_data)
            return imovel