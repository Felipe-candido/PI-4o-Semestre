import json
from django.shortcuts import redirect
import mercadopago
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from reservas.models import Reserva
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Conta_MP
from rest_framework import status
from .services import PagamentoMPService
from django.contrib.auth import get_user_model
import secrets # Para gerar um token seguro para o 'state'
from cadastro.services import CookieJWTAuthentication


sdk = mercadopago.SDK(settings.MERCADO_PAGO_ACCESS_TOKEN)
User = get_user_model()

class autenticar_mercadopago(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated] 
    

    def get(self, request):
        # REDIRECIONA O USUARIO PARA A PAGINA DE AUTENTICACAO DO MERCADOPAGO
        try:
            user_id = request.user.id
            print('usuario', user_id)
            if not user_id:
                # Embora IsAuthenticated devesse garantir isso, é uma boa checagem
                raise Exception("Usuário não logado para iniciar a conexão com Mercado Pago.")
            
            # Gere um 'state' seguro e único para esta transação OAuth
            # Incluímos o user_id e um token aleatório para segurança (CSRF)
            state_token = secrets.token_urlsafe(32) 
            # Armazene o estado na sessão do usuário (temporariamente)
            # Isso será validado no callback
            request.session['mp_oauth_state'] = {
                'user_id': user_id,
                'state_token': state_token
            }

            request.session.save()
            
            redirect_uri = "https://dc6f0513eef0.ngrok-free.app/api/pagamentos/mercadopago/callback/"
            auth_url = (
                f"https://auth.mercadopago.com/authorization"
                f"?client_id={settings.MP_CLIENT_ID}"
                f"&response_type=code"
                f"&platform_id=mp"
                f"&redirect_uri={redirect_uri}"
                f"&state={user_id}-{state_token}"
            )
            print(f"DEBUG: auth_url gerada: {auth_url}")
            return Response({'redirect_url': auth_url}, status=status.HTTP_200_OK)
        
        except Exception as e:
            print('peido pesado', str(e))
            return Response(
                {'erro': f'Erro ao preparar conexão com Mercado Pago: {str(e)}'},  
                status=status.HTTP_400_BAD_REQUEST
            )
    


class callback_MP(APIView):
    permission_classes = [AllowAny] 

    def get(self, request):
        code = request.query_params.get('code')
        state_param = request.query_params.get('state')

        if not code or not state_param:
            print(f"Callback sem 'code' ou 'state': code={code}, state={state_param}")
            # Redireciona para uma página de erro no frontend
            return redirect(settings.FRONTEND_URL)
        
        try:
            # Divida o 'state' em user_id e o token aleatório
            user_id_str, received_state_token = state_param.split('-', 1)
            user_id = int(user_id_str)
            print(user_id)
        except (ValueError, IndexError):
            print(f"Formato de 'state' inválido: {state_param}")
            return redirect(settings.FRONTEND_URL)
        
        

        token_url = "https://api.mercadopago.com/oauth/token"
        headers = { "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded" }
        data = {
            "client_id": settings.MP_CLIENT_ID,
            "client_secret": settings.MP_CLIENT_SECRET,
            "code": code,
            "redirect_uri": "https://dc6f0513eef0.ngrok-free.app/api/pagamentos/mercadopago/callback/",
            "grant_type": "authorization_code"
        }

        # ACESSA O OBJETO DO USAUARIO QUE ESTA TENTANDO AUTENTICAR
        try:
            user_connect = User.objects.get(id=user_id)
        except User.DoesNotExist:
            print(f"Usuário não encontrado para ID: {user_id}")
            return redirect(settings.FRONTEND_URL)

        response = requests.post(token_url, headers=headers, data=data)
        response.raise_for_status() 
        token_info = response.json()

        access_token = token_info.get('access_token')
        public_key = token_info.get('public_key')
        mp_user_id = token_info.get('user_id')

        try:
            Conta_MP.objects.update_or_create(
                proprietario=user_connect, 
                defaults={
                    'access_token': access_token,
                    'public_key': public_key,
                    'conta_MP_id': mp_user_id,
                    'conectado_mp': True
                }
            )
        except Exception as e:
            print(f"Erro ao salvar Conta_MP para o usuário {user_id}: {e}")
            return redirect(settings.FRONTEND_URL + f'/dashboard/proprietario/conexao-mp-falha?error=erro_salvar_conta&details={str(e)}')
        
        print('DEU CERTO', access_token)
        return redirect(settings.FRONTEND_URL)


@api_view(['POST'])
def criar_preferencia(self, request):
    reserva_id = None
    try:
        # BUSCAR RESERVA
        reserva_id = request.data.get('reserva_id')
        reserva = Reserva.objects.get(id=reserva_id)
        print("🔍 reserva_id recebido:", reserva_id)

        if not hasattr(reserva.imovel.proprietario, 'mp_conta') or not reserva.imovel.proprietario.mp_conta.conectado_mp:
                return Response(
                    {"error": "Proprietário do imóvel não conectado ao Mercado Pago."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        valor_total = request.data.get('valor')
        taxa_plataforma = valor_total * 0.7
        descricao = request.data.get('descricao')
        referencia = f"reserva-{reserva.id}"
        payer_email = request.user.email

        pagamento_info = PagamentoMPService.criar_preferencia_pagamento(
            imovel_id=reserva.imovel.id,
            valor_total=valor_total,
            comissao_plataforma=taxa_plataforma,
            external_reference=referencia,
            payer_email=payer_email
        )
        
        
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
                    "unit_price": float(valor_total)
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
