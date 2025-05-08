from django.contrib import admin
from django.urls import include, path
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenVerifyView, TokenRefreshView

router = DefaultRouter()

router.register(r"registrar", views.cadastro_imovel, basename='registro')


urlpatterns = [
    path('api/imoveis', include(router.urls)),
]
