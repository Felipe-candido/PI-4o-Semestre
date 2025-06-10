import json
from django.shortcuts import render
import mercadopago
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from reservas.models import Reserva

sdk = mercadopago.SDK(settings.MERCADO_PAGO_ACCESS_TOKEN)

@api_view(['POST'])
def criar_preferencia(request):
    reserva_id = None
    try:
        reserva_id = request.data.get('reserva_id')
        print("🔍 reserva_id recebido:", reserva_id)
        valor = request.data.get('valor')
        descricao = request.data.get('descricao')

        # Buscar reserva
        reserva = Reserva.objects.get(id=reserva_id)
        print("🔗 FRONTEND_URL:", settings.FRONTEND_URL)
        print("✅ back_urls['success']:", f"{settings.FRONTEND_URL}/payment/{reserva_id}/confirmacao")

        success_url = f"{settings.FRONTEND_URL}/payment/{reserva_id}/confirmacao"
        print("✅ Success URL:", repr(success_url))



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
                "success": "https://dcad-177-128-8-150.ngrok-free.app/payment/{reserva_id}/confirmacao",
                "failure": f"https://dcad-177-128-8-150.ngrok-free.app/payment/{reserva_id}",
                "pending": f"https://dcad-177-128-8-150.ngrok-free.app/payment/{reserva_id}"
            },
            "auto_return": "approved",
            "external_reference": str(reserva_id)
        }

        print("📦 Preference Data:", json.dumps(preference_data, indent=2))

        preference_response = sdk.preference().create(preference_data)
        print("🧾 Resposta do Mercado Pago:", preference_response)
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
