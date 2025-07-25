from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from .serializers import ComentarioSerializer
from projeto.services import CookieJWTAuthentication
from .repositories import ComentariosRepository
from .services import ComentariosService

# Create your views here.

class ComentarioViewSet(viewsets.ModelViewSet):
    serializer_class = ComentarioSerializer
    authentication_classes = [CookieJWTAuthentication]

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'media_avaliacoes']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        imovel_id = self.request.query_params.get('imovel_id')
        return ComentariosRepository.get_by_id(imovel_id)

    @action(detail=False, methods=['get'])
    def media_avaliacoes(self, request):
        imovel_id = request.query_params.get('imovel_id')
        if not imovel_id:
            return Response({'error': 'imovel_id é obrigatório'}, status=status.HTTP_400_BAD_REQUEST)
        
        media = ComentariosRepository.avg_avaliacoes(imovel_id)
        
        return Response({
            'media': round(media['media'] or 0, 2),
            'total_avaliacoes': ComentariosRepository.total_avaliacoes(imovel_id)
        })

    def create(self, request, *args, **kwargs):
        comentario = ComentariosService.save_comentario(request.data, request.user)
        self.perform_create(comentario)
        headers = self.get_success_headers(comentario.data)
        return Response(comentario.data, status=status.HTTP_201_CREATED, headers=headers)
