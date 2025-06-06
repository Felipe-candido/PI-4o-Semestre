from django.urls import path
from . import views

urlpatterns = [
    path('criar_preferencia/', views.criar_preferencia, name='criar_preferencia'),
    path('webhook/', views.webhook, name='webhook'),
] 