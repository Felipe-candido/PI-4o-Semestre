from django.contrib import admin
from django.urls import include, path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('/registros', views.get_usuarios, name='get_all_users'),
]

