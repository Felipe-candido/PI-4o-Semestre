from django.urls import path
from . import views
from .views import autenticar_mercadopago, callback_MP

urlpatterns = [
    path('criar_preferencia/', views.criar_preferencia, name='criar_preferencia'),
    path('webhook/', views.webhook, name='webhook'),
    path('mercadopago/connect/', autenticar_mercadopago.as_view(), name='mp_connect'),
    path('mercadopago/callback/', callback_MP.as_view(), name='mp_callback'),
] 