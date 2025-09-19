from django.urls import path
from . import views
from .views import autenticar_mercadopago, callback_MP, criar_preferencia, ProcessarPagamentoAPI

urlpatterns = [
    path('criar_preferencia/', criar_preferencia.as_view(), name='criar_preferencia'),
    path('webhook/', views.webhook, name='webhook'),
    path('mercadopago/connect/', autenticar_mercadopago.as_view(), name='mp_connect'),
    path('mercadopago/callback/', callback_MP.as_view(), name='mp_callback'),
    path('processar_pagamento/', ProcessarPagamentoAPI.as_view(), name='ProcessarPagamentoAPI'),
    path('teste/', views.teste_ngrok, name='teste_ngrok'),
] 
