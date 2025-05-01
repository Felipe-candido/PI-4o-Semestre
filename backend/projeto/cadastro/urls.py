from django.contrib import admin
from django.urls import include, path
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenVerifyView, TokenRefreshView

router = DefaultRouter()
router.register(r"registrar", views.view_registro, basename='registro')
router.register(r"entrar", views.viewLogin, basename='entrar')
router.register(r"", views.UserAuthenticated, basename='me')
router.register(r"", views.viewLogout, basename='logout')
router.register(r'editar-perfil', views.editUsuario, basename='editar-perfil')


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]

