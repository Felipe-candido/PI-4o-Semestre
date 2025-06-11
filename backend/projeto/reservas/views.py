from projeto.services import CookieJWTAuthentication
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from imoveis.models import Imovel
from .models import Reserva
from imoveis.serializers import imovel_serializer
from .serializers import ReservaSerializer, ReservaReadSerializer
from datetime import datetime, timezone
from .services import GoogleCalendarService
from rest_framework.views import APIView



class buscar_reserva(APIView):
    def get(self, request):
        reserva_id = request.query_params.get("id")
        if not reserva_id:
            return Response({'error': 'reserva nao encontrada'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            reserva = Reserva.objects.select_related('Imovel').get(id = reserva_id)
            serializer = ReservaReadSerializer(reserva)
            return Response(serializer.data)

        except Reserva.DoesNotExist:
            return Response({'error': 'Reserva não encontrada'}, status=status.HTTP_404_NOT_FOUND)

            



class ReservaViewSet(viewsets.ModelViewSet):
    serializer_class = ReservaSerializer
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Reserva.objects.filter(usuario=self.request.user)

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return ReservaReadSerializer
        return ReservaSerializer

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
            data_inicio = datetime.fromisoformat(data['data_inicio'].replace('Z', '+00:00'))
            data_fim = datetime.fromisoformat(data['data_fim'].replace('Z', '+00:00'))
            
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

    @action(detail=True, methods=['post'])
    def confirmar(self, request, pk=None):
        reserva = self.get_object()
        if reserva.status == 'CONFIRMADA':
            return Response({'status': 'Reserva já está confirmada'})
        reserva.status = 'CONFIRMADA'
        reserva.save()
        return Response({'status': 'Reserva confirmada com sucesso'})

class ReservasProprietarioView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Busca todas as reservas dos imóveis do proprietário
            reservas = Reserva.objects.filter(
                Imovel__proprietario=request.user
            ).select_related('usuario', 'Imovel').order_by('-criado_em')
            
            # Serializa as reservas
            serializer = ReservaReadSerializer(reservas, many=True)
            
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {'error': f'Erro ao buscar reservas: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            ) 