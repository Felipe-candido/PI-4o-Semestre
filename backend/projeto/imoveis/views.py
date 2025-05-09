from django.shortcuts import render
from .models import Imovel
from rest_framework.response import Response
from .serializers import imovel_serializer
from rest_framework import status, viewsets
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated


class cadastro_imovel(viewsets.ModelViewSet):
    queryset = Imovel.objects.all()
    serializer_class = imovel_serializer
    http_method_names = ['post']

    def get_serializer_context(self):
        return {'request': self.request}





