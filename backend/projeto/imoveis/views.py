from django.shortcuts import render
from .models import Imovel
from rest_framework.response import Response
from .serializers import imovel_serializer
from rest_framework import status, viewsets
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated


class cadastro_imovel(viewsets.ViewSet):
      queryset = Imovel.objects.all()
      serializer_class = imovel_serializer
      http_method_names = ['post', 'options']

      def create(self, request, *args, **kwargs):
            dados = request.data.copy()
            serializer = self.get_serializer(data = dados)
            if serializer.is_valid():
                  serializer.save()
                  return Response({'mensagem': 'Imovel registrado com sucesso'},
                                   status=status.HTTP_201_CREATED)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





