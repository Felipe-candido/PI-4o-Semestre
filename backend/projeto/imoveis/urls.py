from django.contrib import admin
from django.urls import include, path
from . import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()

router.register(r"registrar", views.cadastro_imovel, basename='registro')
router.register(r"list", views.imovel_list_cidade, basename='list')
router.register(r'chacaras', views.ChacaraViewSet)





urlpatterns = [
    path('', include(router.urls)),
    path('propriedade/', views.imovel_por_id.as_view()),
    path('editar/<int:id>/', views.EditarImovelView.as_view())
]
