from projeto.services import CookieJWTAuthentication
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from imoveis.models import Imovel
from .models import Reserva
from imoveis.serializers import imovel_serializer
from .serializers import ReservaSerializer
from datetime import datetime, timezone
from .services import GoogleCalendarService



class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    
    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['usuario'] = request.user.id
        
        try:
            # Verificar se temos imovel ou imovel_id
            imovel_id = data.get('imovel_id') or data.get('Imovel')
            if not imovel_id:
                return Response(
                    {'error': 'É necessário informar o imóvel'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Garantir que temos o campo correto para o serializer
            if 'imovel_id' in data:
                data['Imovel'] = data.pop('imovel_id')
            
            imovel = get_object_or_404(Imovel, pk=imovel_id)
            data_inicio = datetime.fromisoformat(data['data_inicio'])
            if not data_inicio.tzinfo:
                data_inicio = data_inicio.replace(tzinfo=timezone.utc)
            
            data_fim = datetime.fromisoformat(data['data_fim'])
            if not data_fim.tzinfo:
                data_fim = data_fim.replace(tzinfo=timezone.utc)
            
            calendar_service = GoogleCalendarService()
            
            try:
                if not calendar_service.verificar_disponibilidade(imovel.id_reserva, data_inicio, data_fim):
                    return Response(
                        {'error': 'Período indisponível para reserva'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            except ValueError as e:
                return Response(
                    {'error': str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            serializer = self.get_serializer(data=data)
            if not serializer.is_valid():
                return Response(
                    {'error': 'Erro ao criar reserva', 'details': serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            reserva = serializer.save()
            
            # Criar evento no Google Calendar
            event_id = calendar_service.criar_evento_reserva(imovel.id_reserva, reserva)
            reserva.evento_google_id = event_id
            reserva.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response(
                {
                    'error': 'Erro ao criar reserva',
                    'details': str(e),
                    'type': type(e).__name__
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=True, methods=['post'])
    def cancelar(self, request, pk=None):
        reserva = self.get_object()
        
        if reserva.status == 'CANCELADA':
            return Response(
                {'error': 'Reserva já está cancelada'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        calendar_service = GoogleCalendarService()
        calendar_service.cancelar_evento(reserva.Imovel.id_reserva, reserva.evento_google_id)
        
        reserva.status = 'CANCELADA'
        reserva.save()
        
        return Response({'status': 'Reserva cancelada com sucesso'}) 