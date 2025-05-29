from django.urls import path
from . import views

urlpatterns = [
    path('criar-preferencia/', views.criar_preferencia, name='criar_preferencia'),
    path('webhook/', views.webhook, name='webhook'),
] 