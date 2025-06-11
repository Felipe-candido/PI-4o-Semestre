from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register(r'confirma', views.ReservaViewSet, basename='confirma')

urlpatterns = [
    path('', include(router.urls)),
    path('reserva/', views.buscar_reserva.as_view()),
    path('proprietario/', views.ReservasProprietarioView.as_view(), name='reservas-proprietario')
] 