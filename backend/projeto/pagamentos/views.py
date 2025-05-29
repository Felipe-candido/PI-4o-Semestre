from django.shortcuts import render

import mercadopago
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from reservas.models import Reserva

sdk = mercadopago.SDK(settings.MERCADO_PAGO_ACCESS_TOKEN)

@api_view(['POST'])
def criar_preferencia(request):
    try:
        reserva_id = request.data.get('reserva_id')
        valor = request.data.get('valor')
        descricao = request.data.get('descricao')

        # Buscar reserva
        reserva = Reserva.objects.get(id=reserva_id)

        # Criar preferência no Mercado Pago
        preference_data = {
            "items": [
                {
                    "title": descricao,
                    "quantity": 1,
                    "currency_id": "BRL",
                    "unit_price": float(valor)
                }
            ],
            "back_urls": {
                "success": f"{settings.FRONTEND_URL}/reservas/{reserva_id}/confirmacao",
                "failure": f"{settings.FRONTEND_URL}/payment/{reserva_id}",
                "pending": f"{settings.FRONTEND_URL}/payment/{reserva_id}"
            },
            "auto_return": "approved",
            "external_reference": str(reserva_id)
        }

        preference_response = sdk.preference().create(preference_data)
        preference = preference_response["response"]

        return Response({
            "id": preference["id"],
            "init_point": preference["init_point"]
        })

    except Reserva.DoesNotExist:
        return Response({"error": "Reserva não encontrada"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(['POST'])
def webhook(request):
    try:
        payment_data = request.data
        
        if payment_data["type"] == "payment":
            payment_id = payment_data["data"]["id"]
            payment = sdk.payment().get(payment_id)
            
            if payment["status"] == 200:
                payment_info = payment["response"]
                reserva_id = payment_info["external_reference"]
                
                if payment_info["status"] == "approved":
                    reserva = Reserva.objects.get(id=reserva_id)
                    reserva.status = "PAGO"
                    reserva.save()
        
        return Response({"status": "OK"})
    
    except Exception as e:
        return Response({"error": str(e)}, status=400) 
