from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from imoveis.models import Imovel
from .models import Reserva
from imoveis.serializers import imovel_serializer
from .serializers import ReservaSerializer
from datetime import datetime
from .services import GoogleCalendarService



class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer
    permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['usuario'] = request.user.id
        
        imovel = get_object_or_404(Imovel, pk=data['imovel'])
        data_inicio = datetime.fromisoformat(data['data_inicio'])
        data_fim = datetime.fromisoformat(data['data_fim'])
        
        calendar_service = GoogleCalendarService()
        
        if not calendar_service.verificar_disponibilidade(imovel.id_reserva, data_inicio, data_fim):
            return Response(
                {'error': 'Período indisponível para reserva'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        reserva = serializer.save()
        
        # Criar evento no Google Calendar
        event_id = calendar_service.criar_evento_reserva(imovel.id_reserva, reserva)
        reserva.evento_google_id = event_id
        reserva.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['post'])
    def cancelar(self, request, pk=None):
        reserva = self.get_object()
        
        if reserva.status == 'CANCELADA':
            return Response(
                {'error': 'Reserva já está cancelada'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        calendar_service = GoogleCalendarService()
        calendar_service.cancelar_evento(reserva.chacara.calendar_id, reserva.event_id)
        
        reserva.status = 'CANCELADA'
        reserva.save()
        
        return Response({'status': 'Reserva cancelada com sucesso'}) 