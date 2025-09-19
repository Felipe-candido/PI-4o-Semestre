// pages/payment/[id].tsx (ou onde quer que seu arquivo esteja)
'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

// Componentes de UI e Layout
import MainLayout from "@/components/layout/MainLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton"; // Sugestão: adicione um skeleton para o loading

// API e Mercado Pago SDK
import { apiFetch2 } from '@/lib/api';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import { Description } from '@radix-ui/react-toast';

// Chame a inicialização FORA do componente. 
// Ela só precisa ser executada uma vez quando a aplicação carrega.
const publicKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY;
if (publicKey) {
  initMercadoPago(publicKey, { locale: 'pt-BR' });
} else {
  console.error("Mercado Pago Public Key não encontrada. Verifique suas variáveis de ambiente.");
}

// Tipagem para a sua reserva
interface Reserva {
  id: string;
  imovel: {
    titulo: string;
  };
  data_inicio: string;
  data_fim: string;
  numero_hospedes: number;
  status: string;
  valor_total: number;
}

export default function PaymentPage() {
  const { id } = useParams();
  const router = useRouter();

  // Estados do componente
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [reserva, setReserva] = useState<Reserva | null>(null);

  // useEffect para buscar dados da reserva e criar a preferência de pagamento
  useEffect(() => {
    // Garante que temos um ID da reserva antes de prosseguir
    if (!id) {
      setError("ID da reserva não encontrado.");
      setLoading(false);
      return;
    }

    const fetchPaymentData = async () => {
      try {
        setLoading(true);

        // 1. Buscar detalhes da reserva
        const reservaResponse = await apiFetch2(`/api/reservas/reserva/?id=${id}`);
        if (!reservaResponse.ok) throw new Error("Falha ao buscar detalhes da reserva.");
        const reservaData: Reserva = await reservaResponse.json();
        reservaData.valor_total = Number(reservaData.valor_total);
        console.log("PORRA DA RESERVA",reservaData)
        
        setReserva(reservaData);

        // 2. Criar a preferência de pagamento no backend
        const preferencePayload = { reserva_id: id };
        const preferenceResponse = await apiFetch2('/api/pagamentos/criar_preferencia/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(preferencePayload)
        });

        if (!preferenceResponse.ok) {
            if (preferenceResponse.status === 401) {
                router.push('/login');
                return;
            }
            const errorText = await preferenceResponse.text();
            throw new Error(`Erro ao criar preferência: ${errorText}`);
        }
        
        const preference = await preferenceResponse.json();
        setPreferenceId(preference.preference_id);

      } catch (err: any) {
        console.error('🔥 ERRO NO FLUXO DE PAGAMENTO:', err);
        setError(err.message || "Ocorreu um erro ao inicializar o pagamento.");
      } finally {
        // Importante: para de carregar tanto em sucesso quanto em erro
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [id, router]);

  // Renderização condicional da UI
  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-4">Preparando seu pagamento...</h2>
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertTitle>Erro no Pagamento</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </MainLayout>
    );
  }

  // Renderiza o checkout apenas se tudo estiver pronto
  if (preferenceId && reserva) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Finalize sua Reserva</h1>
            <p className="text-gray-600">Você está pagando pela reserva em: <span className="font-semibold">{reserva.Imovel.titulo}</span></p>
            <p className="text-xl font-bold text-blue-600 mt-2">
              Valor Total: R$ {Number(reserva.valor_total).toFixed(2).replace('.', ',')}
            </p>
          </div>
          
          <Payment
            initialization={{
              amount: reserva.valor_total,
              preferenceId: preferenceId,
            }}
            customization={{
              visual: {
                style: { theme: 'flat' } // 'flat' é um tema moderno e limpo
              },
              paymentMethods: {
                creditCard: "all",
                debitCard: "all",
                ticket: "all",
                bankTransfer: "all",
                maxInstallments: 12
              },
            }}
            onSubmit={async ({formData}) => {
              // O callback onSubmit já é uma Promise, não precisa encapsular
              console.log("Enviando dados para o backend...", formData);
              try {
                const bodyPayload = {
                  ...formData,
                  description: `reserva_${reserva.id}`,
                }

                const response = await fetch("/api/pagamentos/processar_pagamento", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(bodyPayload),
                });

                if (!response.ok) {
                    throw new Error("Falha ao processar o pagamento.");
                }

                const result = await response.json();
                console.log("Pagamento processado:", result);
                
                // Redireciona para uma página de confirmação passando o ID da reserva
                router.push(`/payment/${id}/confirmacao`);

              } catch (submitError: any) {
                console.error('Erro no onSubmit:', submitError);
                // Redireciona para uma página de falha
                router.push(`/payment/${id}/failure`);
              }
            }}
          />
        </div>
      </MainLayout>
    );
  }

  // Fallback caso algo inesperado aconteça
  return null;
}