from django.contrib import admin
from django.urls import include, path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"registrar", views.view_registro, basename='registro')

urlpatterns = [
    path('api/', include(router.urls)),
]

