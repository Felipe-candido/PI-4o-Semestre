from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view


# Create your views here.

def home(request):
    return render(request, 'home/home.html', {'user': request.user})

@api_view
def apiCadastro(request):
    return