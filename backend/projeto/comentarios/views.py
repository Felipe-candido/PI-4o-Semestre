from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from django.db.models import Avg
from .models import Comentario
from .serializers import ComentarioSerializer
from projeto.services import CookieJWTAuthentication

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
        if imovel_id:
            return Comentario.objects.filter(imovel_id=imovel_id).order_by('-data_criacao')
        return Comentario.objects.none()

    @action(detail=False, methods=['get'])
    def media_avaliacoes(self, request):
        imovel_id = request.query_params.get('imovel_id')
        if not imovel_id:
            return Response({'error': 'imovel_id é obrigatório'}, status=status.HTTP_400_BAD_REQUEST)
        
        media = Comentario.objects.filter(imovel_id=imovel_id).aggregate(
            media=Avg('avaliacao')
        )
        
        return Response({
            'media': round(media['media'] or 0, 2),
            'total_avaliacoes': Comentario.objects.filter(imovel_id=imovel_id).count()
        })

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
