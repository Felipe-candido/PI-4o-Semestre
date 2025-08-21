import json
from venv import logger
from django.shortcuts import redirect
import mercadopago
import requests
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from django.conf import settings
from reservas.models import Reserva
from imoveis.models import Imovel
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Conta_MP, PagamentoReserva
from rest_framework import status
from .services import PagamentoMPService
from django.contrib.auth import get_user_model
import secrets # Para gerar um token seguro para o 'state'
from cadastro.services import CookieJWTAuthentication
from django.views.decorators.csrf import csrf_exempt



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
            
            redirect_uri = "https://a97152e5315d.ngrok-free.app/api/pagamentos/mercadopago/callback/"
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
            "redirect_uri": "https://a97152e5315d.ngrok-free.app/api/pagamentos/mercadopago/callback/",
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



# class criar_preferencia(APIView):
#     authentication_classes = [CookieJWTAuthentication]
#     permission_classes = [IsAuthenticated] 

#     def post(self, request):
#         reserva_id = None
#         try:
#             # BUSCAR RESERVA
#             reserva_id = request.data.get('reserva_id')
#             reserva = Reserva.objects.get(id=reserva_id)
#             print("🔍 reserva_id recebido:", reserva_id)
#             id_proprietario = reserva.Imovel.proprietario_id

#             conta_mp = Conta_MP.objects.get(proprietario_id=id_proprietario)
#             print(conta_mp.conectado_mp)
#             if not conta_mp.conectado_mp:
#                 print('TROCO')
#                 return Response(
#                     {"error": "Proprietário do imóvel não conectado ao Mercado Pago."},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )
            
#             valor_total = request.data.get('valor')
#             taxa_plataforma = valor_total * 0.07
#             descricao = request.data.get('descricao')
#             payer_email = request.user.email

#             pagamento_info = PagamentoMPService.criar_preferencia_pagamento(
#                 imovel_id=reserva.Imovel.id,
#                 valor_total=valor_total,
#                 comissao_plataforma=taxa_plataforma,
#                 reserva_id=reserva_id,
#                 payer_email=payer_email
#             )
            
            
#             print("🔗 FRONTEND_URL:", settings.FRONTEND_URL)
#             print("✅ back_urls['success']:", f"{settings.FRONTEND_URL}/payment/{reserva_id}/confirmacao")
#             success_url = f"{settings.FRONTEND_URL}/payment/{reserva_id}/confirmacao"
#             print("✅ Success URL:", repr(success_url))


#             return Response(pagamento_info, status=status.HTTP_200_OK)


#         except Reserva.DoesNotExist:
#             print('MERDA')
#             return Response({"error": "Reserva não encontrada"}, status=404)
#         except Exception as e:
#             print('BOSTA', str(e))
#             return Response({"error": str(e)}, status=400)

class criar_preferencia(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]


    def post(self, request):
        """
    ATUALIZADA: Agora usa o sistema de split com retenção até check-in
    """
        try:
            reserva_id = request.data.get('reserva_id')
            logger.info(f"🔍 Criando preferência para reserva: {reserva_id}")
            
            if not reserva_id:
                return Response(
                    {"error": "reserva_id é obrigatório"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Verificar se reserva existe
            try:
                reserva = Reserva.objects.select_related('Imovel__proprietario', 'usuario').get(id=reserva_id, usuario=request.user)
                logger.info(f"✅ Reserva encontrada: {reserva.Imovel.titulo}")
            except Reserva.DoesNotExist:
                return Response(
                    {"error": "Reserva não encontrada"}, 
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Verificar se já existe pagamento
            # if hasattr(reserva, 'pagamento'):
            #     pagamento = reserva.pagamento
            #     logger.info(f"⚠️ Pagamento já existe com status: {pagamento.status}")
                
            #     if pagamento.status == 'PENDENTE' and pagamento.preference_id:
            #         # Retornar preferência existente
            #         return Response({
            #             "id": pagamento.preference_id,
            #             "init_point": f"https://www.mercadopago.com.br/checkout/v1/redirect?pref_id={pagamento.preference_id}"
            #         })
            #     elif pagamento.status in ['PAGO', 'RETIDO', 'LIBERADO']:
            #         return Response(
            #             {"error": "Pagamento já foi processado"}, 
            #             status=status.HTTP_400_BAD_REQUEST
            #         )
            
            # Verificar se proprietário tem conta MP
            proprietario = reserva.Imovel.proprietario
            if not hasattr(proprietario, 'conta_mp') or not proprietario.conta_mp.conectado_mp:
                return Response(
                    {"error": "Proprietário do imóvel não conectado ao Mercado Pago."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            logger.info(f"✅ Proprietário conectado ao MP: {proprietario.conta_mp.conectado_mp}")
            
            
            # Usar o novo serviço de split
            resultado = PagamentoMPService.criar_pagamento_inicial(reserva_id)
            
            logger.info(f"✅ Preferência criada: {resultado['preference_id']}")
            
            
            return Response({
                "preference_id": resultado['preference_id'],
                "init_point": resultado['init_point'],
                "sandbox_init_point": resultado.get('sandbox_init_point')
            })

        except Exception as e:
            logger.error(f"🔥 Erro ao criar preferência: {str(e)}")
            return Response(
                {"error": f"Erro interno: {str(e)}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['POST'])
@csrf_exempt # Garante que o Django não vai bloquear o webhook por falta de token CSRF
def webhook(request):
    try:
        notification = request.data
        logger.info(f"Webhook recebido: {notification}")

        # O Mercado Pago pode enviar dois tipos de notificação.
        # Vamos checar qual é.
        
        notification_type = notification.get("type") or notification.get("topic")

        if notification_type == "payment":
            payment_id = notification.get("data", {}).get("id")
            if payment_id:
                logger.info(f"Processando notificação 'payment' com ID: {payment_id}")
                # Chama sua função de serviço que já sabe como processar um pagamento
                PagamentoMPService.processar_pagamento(str(payment_id))

        elif notification_type == "merchant_order":
            # Pega o ID da merchant_order, que geralmente vem nos query_params
            # mas vamos checar o corpo também por segurança.
            merchant_order_id = request.query_params.get("id") or notification.get("resource", "").split('/')[-1]
            if not merchant_order_id:
                logger.error("Webhook 'merchant_order' sem ID.")
                return Response({"status": "Erro"}, status=400)

            logger.info(f"Processando 'merchant_order' ID: {merchant_order_id}")
            # Aqui você precisaria buscar a ordem e depois o pagamento, como na versão anterior.
            # Vamos focar no 'payment' que é o que o MP está enviando agora.
            order_response = sdk.merchant_order().get(merchant_order_id)
            if order_response["status"] != 200:
                logger.error(f"Erro ao buscar merchant_order {merchant_order_id} na API.")
                return Response({"status": "Erro"}, status=500)
            
            order_data = order_response["response"]
            
            # 3. Pega os pagamentos de dentro da ordem
            pagamentos_da_ordem = order_data.get("payments", [])
            
            for pagamento_info in pagamentos_da_ordem:
                # Verificamos se o pagamento está aprovado ANTES de processar
                if pagamento_info.get("status") == "approved":
                    payment_id = pagamento_info.get("id")
                    logger.info(f"Pagamento {payment_id} encontrado na ordem e APROVADO. Processando...")
                    
                    # 4. Chama a nossa função de serviço com o ID do pagamento
                    PagamentoMPService.processar_pagamento(payment_id)

        else:
            logger.warning(f"Webhook com tipo desconhecido ou ausente: '{notification_type}'.")

        # Sempre responda 200 OK para o Mercado Pago saber que você recebeu.
        return Response({"status": "OK"})
    
    except Exception as e:
        logger.error(f"Erro CRÍTICO no processamento do webhook: {e}")
        # Retornar 500 faz o Mercado Pago tentar reenviar a notificação mais tarde.
        return Response({"error": str(e)}, status=500)





from django.http import JsonResponse

# Adicione esta função de teste
def teste_ngrok(request):
    # Se a requisição chegar aqui, este print aparecerá no terminal do Django
    print("✅✅✅ A REQUISIÇÃO DE TESTE CHEGOU NO DJANGO! ✅✅✅")
    return JsonResponse({"status": "Olá do Django, a conexão funcionou!"})