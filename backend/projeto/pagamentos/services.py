import mercadopago
from django.conf import settings
from imoveis.models import Imovel
import requests
from django.utils import timezone
from decimal import Decimal
from reservas.models import Reserva
from .models import Conta_MP, PagamentoReserva, CheckIn
import logging


# SDK do Mercado Pago
mp_sdk = mercadopago.SDK(settings.MERCADO_PAGO_ACCESS_TOKEN)

class PagamentoMPService:
    @staticmethod
    def criar_preferencia_pagamento(imovel_id: int, valor_total: float, comissao_plataforma: float, external_reference: str, payer_email: str, reserva_id):

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
                "success": f"{settings.FRONTEND_URL}/payment/{reserva_id}/confirmacao",
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
        


class PagamentoSplitService:
    
    @staticmethod
    def calcular_valores(valor_total, percentual_taxa=0.07):
        """Calcula taxa da plataforma e valor do proprietário"""
        valor_total = Decimal(str(valor_total))
        taxa_plataforma = valor_total * Decimal(str(percentual_taxa))
        valor_proprietario = valor_total - taxa_plataforma
        
        return {
            'valor_total': valor_total,
            'taxa_plataforma': taxa_plataforma,
            'valor_proprietario': valor_proprietario
        }
    
    def criar_pagamento_inicial(reserva_id, percentual_taxa=0.10):
        """
        Cria o pagamento inicial - valor total vai para conta da empresa
        O dinheiro fica retido até confirmação do check-in
        """
        try:
            reserva = Reserva.objects.select_related('Imovel__proprietario', 'usuario').get(id=reserva_id)
            
            # Verificar se proprietário tem conta MP
            if not hasattr(reserva.Imovel.proprietario, 'conta_mp') or not reserva.Imovel.proprietario.conta_mp.conectado_mp:
                raise Exception("Proprietário não possui conta Mercado Pago vinculada")
            
            # Calcular valores
            valores = PagamentoSplitService.calcular_valores(reserva.valor_total, percentual_taxa)
            
            # Criar registro de pagamento
            pagamento_reserva = PagamentoReserva.objects.create(
                reserva=reserva,
                valor_total=valores['valor_total'],
                taxa_plataforma=valores['taxa_plataforma'],
                valor_proprietario=valores['valor_proprietario'],
                status='PENDENTE'
            )
            
            # Criar preferência no Mercado Pago
            preference_data = {
                "items": [
                    {
                        "title": f"Aluguel - {reserva.Imovel.titulo}",
                        "quantity": 1,
                        "currency_id": "BRL",
                        "unit_price": float(valores['valor_total'])
                    }
                ],
                "payer": {
                    "email": reserva.usuario.email,
                    "name": reserva.usuario.nome
                },
                "external_reference": f"reserva_{reserva.id}",
                "notification_url": f"{settings.BASE_URL}/api/pagamentos/webhook/",
                "back_urls": {
                    "success": f"{settings.FRONTEND_URL}/payment/{reserva.id}/success",
                    "failure": f"{settings.FRONTEND_URL}/payment/{reserva.id}/failure",
                    "pending": f"{settings.FRONTEND_URL}/payment/{reserva.id}/pending"
                },
                "auto_return": "approved",
                "metadata": {
                    "reserva_id": reserva.id,
                    "tipo_pagamento": "reserva_inicial"
                }
            }
            
            preference_response = mp_sdk.preference().create(preference_data)
            preference = preference_response["response"]
            
            # Atualizar pagamento com preference_id
            pagamento_reserva.preference_id = preference["id"]
            pagamento_reserva.save()
            
            return {
                "preference_id": preference["id"],
                "init_point": preference["init_point"],
                "sandbox_init_point": preference.get("sandbox_init_point"),
                "pagamento_id": pagamento_reserva.id
            }
            
        except Reserva.DoesNotExist:
            raise Exception("Reserva não encontrada")
        except Exception as e:
            logger.error(f"Erro ao criar pagamento inicial: {str(e)}")
            raise Exception(f"Erro ao criar pagamento: {str(e)}")
