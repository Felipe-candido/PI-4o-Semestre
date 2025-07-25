import mercadopago
from django.conf import settings
from imoveis.models import Imovel
from .models import Conta_MP

# SDK do Mercado Pago
mp_sdk = mercadopago.SDK(settings.MERCADO_PAGO_ACCESS_TOKEN)

class PagamentoMPService:
    @staticmethod
    def criar_preferencia_pagamento(imovel_id: int, valor_total: float, comissao_plataforma: float, external_reference: str, payer_email: str):

        try:
            
            imovel = Imovel.objects.get(id=imovel_id)
            proprietario = imovel.proprietario
            
            # VERIFICA SE O PROPRIETARIA ESTA AUTENTICADO TAMBEM NO MERCADOPAGO
            if not hasattr(proprietario, 'mp_conta') or not proprietario.mp_conta.conectado_mp:
                raise Exception("Proprietário do imóvel não está conectado ao Mercado Pago.")
            
            mp_user_id_proprietario = proprietario.mp_conta.mp_user_id
            
            # ----- Ponto Chave para o Repasse -----
            # O Mercado Pago Connect associa o pagamento ao vendedor através da sua aplicação.
            # Você não precisa passar o `access_token` do proprietário aqui.
            # O Mercado Pago já sabe que este imóvel pertence ao proprietário X,
            # e que o proprietário X autorizou sua aplicação de marketplace.
            # O marketplace_fee garante que sua comissão seja retida.
            # O restante será repassado para a conta MP do proprietário automaticamente.
            
            preference_data = {
                "items": [
                    {
                        "title": f"Aluguel de {imovel.titulo}",
                        "quantity": 1,
                        "unit_price": float(valor_total) 
                    }
                ],
                "payer": {
                    "email": payer_email
                },
                "marketplace_fee": float(comissao_plataforma), # Sua comissão
                "external_reference": external_reference, # Seu ID de referência da reserva
                "back_urls": {
                "success": "https://dcad-177-128-8-150.ngrok-free.app/payment/{reserva_id}/confirmacao",
                "failure": f"https://dcad-177-128-8-150.ngrok-free.app/payment/{reserva_id}",
                "pending": f"https://dcad-177-128-8-150.ngrok-free.app/payment/{reserva_id}"
                },
            }

            preference_response = mp_sdk.preference().create(preference_data)
            preference = preference_response["response"]
            
            return {
                "preference_id": preference.get('id'),
                "init_point": preference.get('init_point'),
                "sandbox_init_point": preference.get('sandbox_init_point')
            }

        except Imovel.DoesNotExist:
            raise Exception("Imóvel não encontrado.")
        except Exception as e:
            raise Exception(f"Erro ao criar preferência de pagamento: {e}")
