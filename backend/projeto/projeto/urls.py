from django.contrib import admin
from django.urls import include, path
from cadastro import views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from imoveis.views import ChacaraViewSet
from reservas.views import ReservaViewSet, buscar_reserva

router = DefaultRouter()
router.register(r'imoveis', ChacaraViewSet)
router.register(r'reservas', ReservaViewSet, basename='reserva')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('cadastro.urls')),
    path('api/imoveis/', include('imoveis.urls')),
    path('api/reservas/', include('reservas.urls')),
    path('api/pagamentos/', include('pagamentos.urls')),
    path('api/comentarios/', include('comentarios.urls')),
    path('api/', include(router.urls)),
    path('api/reservas/buscar/', buscar_reserva.as_view()),
    path('api-auth/', include('rest_framework.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
