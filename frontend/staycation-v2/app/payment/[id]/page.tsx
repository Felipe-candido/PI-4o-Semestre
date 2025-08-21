'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import MainLayout from "@/components/layout/MainLayout"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { apiFetch2 } from '@/lib/api'

// O componente de Detalhes da Reserva pode ser mantido se você quiser mostrar
// uma tela de "Redirecionando..." antes do pagamento.

export default function PaymentPage() {
  const { id } = useParams()
  const router = useRouter()
  const [error, setError] = useState("") 
  const [loading, setLoading] = useState(true)

  // useEffect ÚNICO para buscar a reserva e redirecionar para o pagamento
  useEffect(() => {
    const createPreferenceAndRedirect = async () => {
      if (!id) return;

      try {
        // Passo 1: Buscar os dados da reserva (opcional, apenas para pegar o valor)
        // Se o seu backend já sabe o valor a partir do reserva_id, você pode pular isso.
        const reservaResponse = await apiFetch2(`/api/reservas/reserva/?id=${id}`);
        if (!reservaResponse.ok) {
          throw new Error("Não foi possível carregar os detalhes da reserva.");
        }
        const reservaData = await reservaResponse.json();

        // Passo 2: Criar a preferência de pagamento no backend
        const preferencePayload = {
          reserva_id: id,
          // Garanta que o backend use o reserva_id para buscar o valor correto e seguro
        };
        console.log('📦 Solicitando preferência de pagamento...');
        
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
        console.log('✅ Preferência recebida:', preference);

        // Passo 3: REDIRECIONAR para o Checkout Pro
        // Verifique se o init_point existe antes de redirecionar
        if (preference.init_point) {
          window.location.href = preference.init_point;
        } else {
          throw new Error("A resposta da API não incluiu a URL de pagamento (init_point).");
        }
        
      } catch (err: any) {
        console.error('🔥 ERRO NO FLUXO DE PAGAMENTO:', err);
        setError(err.message || "Erro ao inicializar pagamento.");
        setLoading(false); // Pare o loading para mostrar o erro
      }
    };

    createPreferenceAndRedirect();
  }, [id, router]); // Adicione router às dependências


  // Renderiza uma tela de "carregando" ou de "erro"
  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h2>Preparando seu pagamento...</h2>
          <p>Você será redirecionado para um ambiente seguro para finalizar a compra.</p>
        </div>
      </MainLayout>
    )
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
    )
  }

  // Este return é quase desnecessário, pois o usuário será redirecionado
  // ou verá uma tela de erro.
  return null;
}