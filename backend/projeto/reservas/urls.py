from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'chacaras', views.ChacaraViewSet)
router.register(r'reservas', views.ReservaViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 