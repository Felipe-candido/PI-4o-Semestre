from rest_framework import serializers
from django.contrib.auth import get_user_model

usuario = get_user_model()

class registroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = usuario
        fields = '__all__'

    def create(self, validated_data):
        user = usuario.objects.create_user(**validated_data)
        return user