from django.shortcuts import render
from .models import Imovel
from rest_framework.response import Response
from .serializers import imovel_serializer
from rest_framework import status, viewsets
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from projeto.services import CookieJWTAuthentication


class cadastro_imovel(viewsets.ModelViewSet):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Imovel.objects.all()
    serializer_class = imovel_serializer
    http_method_names = ['post', 'options']

    def create(self, request, *args, **kwargs): 

        dados_imovel = request.data.get("imovel", {})
        dados_endereco = request.data.get("endereco", {})

        dados_imovel["endereco"] = dados_endereco
    
        serializer = self.get_serializer(data=dados_imovel, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'mensagem': 'Imovel registrado com sucesso!'}, status=status.HTTP_201_CREATED)

    





