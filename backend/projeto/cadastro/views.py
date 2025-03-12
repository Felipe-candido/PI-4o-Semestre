from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import usuario
from .serializers import usuarioSerializer

# Create your views here.

def home(request):
    return render(request, 'home/index.html', {'user': request.user})

@api_view
def apiCadastro(request):
    return