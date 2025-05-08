from django.contrib import admin
from django.urls import include, path
from . import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()

router.register(r"registrar", views.cadastro_imovel, basename='registro')


urlpatterns = [
    path('', include(router.urls)),
]
