from datetime import timezone
from decimal import Decimal
from venv import logger
import mercadopago
import requests
from django.conf import settings
from imoveis.models import Imovel
from .models import CheckIn, Conta_MP, PagamentoReserva
from reservas.models import Reserva
from django.db import transaction
import logging

logger = logging.getLogger(__name__)

# SDK do Mercado Pago
mp_sdk = mercadopago.SDK(settings.MERCADO_PAGO_ACCESS_TOKEN)

class PagamentoMPService:

    @staticmethod
    def calcular_valores(valor_total, percentual_taxa=0.10):
        """Calcula taxa da plataforma e valor do proprietário"""
        valor_total = Decimal(str(valor_total))
        taxa_plataforma = valor_total * Decimal(str(percentual_taxa))
        valor_proprietario = valor_total - taxa_plataforma
        
        return {
            'valor_total': valor_total,
            'taxa_plataforma': taxa_plataforma,
            'valor_proprietario': valor_proprietario
        }
    
    
    @staticmethod
    def criar_pagamento_inicial(reserva_id, percentual_taxa=0.07):
        """
        Cria o pagamento inicial - valor total vai para conta da empresa
        O dinheiro fica retido até confirmação do check-in
        """
        try:
            # Buscar reserva com relacionamentos corretos
            reserva = Reserva.objects.select_related('Imovel__proprietario', 'usuario').get(id=reserva_id)
            logger.info(f"Reserva encontrada: {reserva.id}")
            
            # Verificar se proprietário tem conta MP
            proprietario = reserva.Imovel.proprietario
            if not hasattr(proprietario, 'conta_mp') or not proprietario.conta_mp.conectado_mp:
                raise Exception("Proprietário não possui conta Mercado Pago vinculada")
            
            logger.info(f"Proprietário conectado ao MP: {proprietario.conta_mp.conectado_mp}")

            # Calcular valores
            valores = PagamentoMPService.calcular_valores(reserva.valor_total, percentual_taxa)
            logger.info(f"Valores calculados: {valores}")
            print(f"Valores calculados: {valores}")

            with transaction.atomic():
                pagamento_reserva, created = PagamentoReserva.objects.get_or_create(
                    reserva=reserva,
                    defaults={
                        'valor_total': valores['valor_total'],
                        'taxa_plataforma': valores['taxa_plataforma'],
                        'valor_proprietario': valores['valor_proprietario'],
                        'status': 'PENDENTE'
                    }
                )
                
                if created:
                    logger.info(f"✅ Pagamento criado com ID: {pagamento_reserva.id}")
                else:
                    logger.info(f"⚠️ Pagamento para reserva {reserva_id} já existe. Reutilizando.")
                    # Se já existe e tem preferência, retorna ela
                    if pagamento_reserva.preference_id:
                        # Buscar dados da preferência existente
                        preference_response = mp_sdk.preference().get(pagamento_reserva.preference_id)
                        if preference_response.get("status") == 200:
                            preference = preference_response["response"]
                            return {
                                "preference_id": preference["id"],
                                "init_point": preference["init_point"],
                                "sandbox_init_point": preference.get("sandbox_init_point"),
                                "pagamento_id": pagamento_reserva.id
                            }
            
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
                    "success": f"{settings.FRONTEND_URL}/payment/{reserva.id}/confirmacao",
                    "failure": f"{settings.FRONTEND_URL}/payment/{reserva.id}/failure",
                    "pending": f"{settings.FRONTEND_URL}/payment/{reserva.id}/pending"
                },
                "metadata": {
                    "reserva_id": reserva.id,
                    "tipo_pagamento": "reserva_inicial"
                }
            }
            
            logger.info(f"Criando preferência no MP com dados: {preference_data}")
            preference_response = mp_sdk.preference().create(preference_data)
            
            if preference_response.get("status") != 201:
                logger.error(f"Erro na resposta do MP: {preference_response}")
                raise Exception(f"Erro do Mercado Pago: {preference_response}")
            
            preference = preference_response["response"]
            logger.info(f"Preferência criada com ID: {preference.get('id')}")
            
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
            logger.error(f"Reserva não encontrada: {reserva_id}")
            raise Exception("Reserva não encontrada")
        except Exception as e:
            logger.error(f"Erro ao criar pagamento inicial: {str(e)}")
            raise Exception(f"Erro ao criar pagamento: {str(e)}")
        


    @staticmethod
    def processar_webhook(payment_id, external_reference):
        """
        Processa webhook do Mercado Pago quando pagamento é aprovado
        """
        try:
            # Buscar dados do pagamento no MP
            payment_response = mp_sdk.payment().get(payment_id)
            
            if payment_response["status"] != 200:
                raise Exception("Erro ao buscar dados do pagamento no MP")
            
            payment_data = payment_response["response"]
            external_reference = payment_data.get("external_reference")
            
            if not external_reference or not external_reference.startswith("reserva_"):
                logger.warning(f"External reference inválido: {external_reference}")
                return
            
            reserva_id = external_reference.replace("reserva_", "")
            
            # Buscar pagamento na base
            pagamento = PagamentoReserva.objects.select_related('reserva').get(
                reserva_id=reserva_id,
                preference_id=payment_data.get("preference_id")
            )
            
            if payment_data["status"] == "approved":
                # Pagamento aprovado - dinheiro fica retido até check-in
                pagamento.payment_id = payment_id
                pagamento.status = 'RETIDO'
                pagamento.data_pagamento = timezone.now()
                pagamento.save()
                
                # Atualizar status da reserva
                pagamento.reserva.status = 'CONFIRMADA'
                pagamento.reserva.save()
                
                # Criar registro de check-in
                CheckIn.objects.get_or_create(
                    reserva=pagamento.reserva,
                    defaults={
                        'data_prevista': pagamento.reserva.data_inicio,
                        'status': 'PENDENTE'
                    }
                )
                
                logger.info(f"Pagamento aprovado e retido para reserva {reserva_id}")
                
            elif payment_data["status"] == "cancelled":
                pagamento.status = 'CANCELADO'
                pagamento.save()
                
                pagamento.reserva.status = 'CANCELADA'
                pagamento.reserva.save()
                
            return pagamento
            
        except PagamentoReserva.DoesNotExist:
            logger.error(f"Pagamento não encontrado para payment_id: {payment_id}")
        except Exception as e:
            logger.error(f"Erro ao processar webhook: {str(e)}")
            raise



    @staticmethod
    def money_transfer(pagamento_id):
        """
        Executa a transferência do valor do proprietário via Mercado Pago
        """
        try:
            pagamento = PagamentoReserva.objects.get(payment_id=pagamento_id)
            proprietario = pagamento.reserva.Imovel.proprietario
            conta_mp_prorpietario = Conta_MP.objects.get(proprietario = proprietario)
            
            # Você precisaria do ID do pagamento original que está em sua conta
            # Este ID é retornado na notificação de pagamento bem-sucedido.
            payment_id = pagamento.payment_id
            
            if not payment_id:
                raise Exception("ID do pagamento original não encontrado.")

            # --- AQUI VOCÊ FAZ A CHAMADA À API DE LIBERAÇÃO DE FUNDOS ---
            # Este é o trecho que você precisa confirmar com o Mercado Pago.
            # É uma API específica de "releases" para marketplaces.
            
            # Exemplo teórico de como a requisição poderia ser:
            api_url = f"https://api.mercadopago.com/v1/payments/{payment_id}/releases"
            
            release_data = {
                "amount": float(pagamento.valor_proprietario),
                "external_reference": f"liberacao_{pagamento.id}",
                "recipient_id": conta_mp_prorpietario,
            }
            
            headers = {
                'Authorization': f'Bearer {settings.MERCADO_PAGO_ACCESS_TOKEN}',
                'Content-Type': 'application/json'
            }
            
            response = requests.post(api_url, json=release_data, headers=headers)
            result = response.json()
            
            if response.status_code == 200:
                logger.info(f"Fundos liberados para o proprietário com sucesso. Pagamento ID: {pagamento_id}")
                pagamento.status = 'LIBERADO'
                pagamento.save()
                print(response.json())
                return {
                    'split_id': result.get('id'),
                    'status': result.get('status')
                }
            
            
            else:
                logger.error(f"Erro ao liberar fundos: {response.text}")
                raise Exception(f"Erro ao liberar fundos: {response.text}")
                
        except PagamentoReserva.DoesNotExist:
            logger.error(f"Pagamento de reserva não encontrado: {pagamento_id}")
            raise Exception("Pagamento de reserva não encontrado.")
        except Exception as e:
            logger.error(f"Erro ao liberar fundos: {str(e)}")
            raise



    @staticmethod
    def confirmar_checkin_e_liberar_pagamento(reserva_id, confirmado_por):
        """
        Confirma check-in e executa split do pagamento para o proprietário
        """
        try:
            reserva = Reserva.objects.select_related('Imovel__proprietario').get(id=reserva_id)
            pagamento = PagamentoReserva.objects.get(reserva=reserva)
            checkin = CheckIn.objects.get(reserva=reserva)
                
            # Verificar se pagamento está retido
            if pagamento.status != 'RETIDO':
                raise Exception(f"Pagamento não está no status adequado para liberação. Status atual: {pagamento.status}")
                
            # Confirmar check-in
            checkin.status = 'CONFIRMADO'
            checkin.data_confirmacao = timezone.now()
            checkin.confirmado_por = confirmado_por
            checkin.save()
                
            # Executar split do pagamento
            split_result = PagamentoMPService.money_transfer()
                
            # Atualizar pagamento
            pagamento.status = 'LIBERADO'
            pagamento.data_checkin_confirmado = timezone.now()
            pagamento.data_split_executado = timezone.now()
            pagamento.split_payment_id = split_result.get('split_id')
            pagamento.save()
                
            logger.info(f"Check-in confirmado e pagamento liberado para reserva {reserva_id}")
                
            return {
                'checkin_confirmado': True,
                'pagamento_liberado': True,
                'valor_proprietario': float(pagamento.valor_proprietario),
                'split_id': split_result.get('split_id')
            }
                
        except (Reserva.DoesNotExist, PagamentoReserva.DoesNotExist, CheckIn.DoesNotExist):
            raise Exception("Reserva, pagamento ou check-in não encontrado")
        except Exception as e:
            logger.error(f"Erro ao confirmar check-in: {str(e)}")
            raise


