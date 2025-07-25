'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import MainLayout from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { apiFetch, apiFetch2 } from '@/lib/api'

interface ReservaDetalhes {
  id: string
  imovel: {
    titulo: string
    valor_total: number
  }
  valor_total: number
  data_inicio: string
  data_fim: string
  numero_hospedes: number
  status: string
}

declare global { // Declaração para que TypeScript reconheça MercadoPago globalmente
  interface Window {
    MercadoPago: any;
  }
}

export default function PaymentPage() {
  const { id } = useParams()
  const router = useRouter()
  const [reserva, setReserva] = useState<ReservaDetalhes | null>(null)
  const [error, setError] = useState("") 
  const [loading, setLoading] = useState(true)
  const [preferenceId, setPreferenceId] = useState<string | null>(null)

  // CARREGA O SCRIPT DO MERCADOPAGO
  useEffect(() => {
    const loadMercadoPagoScript = () => {
      if (!document.getElementById('mercadopago-sdk')) { // Previne carregar múltiplas vezes
        const script = document.createElement('script');
        script.id = 'mercadopago-sdk';
        script.src = 'https://sdk.mercadopago.com/js/v2';
        script.onload = () => {
          console.log("Mercado Pago SDK carregado.");
          // A inicialização real do MP (new MercadoPago) será feita em outro useEffect
          // depois que a preference_id estiver disponível.
        };
        script.onerror = () => {
          setError("Falha ao carregar o SDK do Mercado Pago.");
          setLoading(false);
        };
        document.body.appendChild(script);
      }
    };

    loadMercadoPagoScript();
  }, []); // [] para rodar apenas uma vez na montagem do componente


  // Buscar dados da reserva e criar preferência de pagamento
  useEffect(() => {
    const fetchReservaAndCreatePreference = async () => {
      if (!id) return; // Garante que 'id' esteja disponível

      setLoading(true);
      
      try {
        // BUSCA DADOS DA RESERVA
        const reservaResponse = await apiFetch2(`/api/reservas/reserva/?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!reservaResponse.ok) {
          // Se a resposta for 401, redireciona para login
          if (reservaResponse.status === 401) {
              router.push('/login'); // Ou sua rota de login
              return; // Impede o restante da execução
          }
          const errorText = await reservaResponse.text();
          throw new Error(`Erro ao buscar reserva: ${reservaResponse.status} - ${errorText}`);
        }

        const reservaData = await reservaResponse.json();
        setReserva(reservaData);
        console.log("✅ Dados da reserva:", reservaData);
        console.log("✅ Dados da reserva:", reservaData.Imovel);
        console.log("✅ Dados da reserva:", reservaData.Imovel.titulo);
        console.log("✅ Dados da reserva:", reservaData.Imovel.preco);


        // CRIAR PREFERENCIA DE PAGAMENTO
        // Verifique se reservaData.imovel e reservaData.valor_total estão corretos
        if (!reservaData.Imovel || !reservaData.Imovel.titulo || typeof reservaData.Imovel?.preco === 'undefined') {
            throw new Error("Dados da reserva incompletos para criar preferência.");
        }

        const preferencePayload = {
          reserva_id: id,
          valor: reservaData.Imovel.preco,
          descricao: `Reserva em ${reservaData.Imovel.titulo}` 
        };
        console.log('📦 Enviando para criar-preferencia:', preferencePayload);
        
        const preferenceResponse = await apiFetch2('/api/pagamentos/criar_preferencia/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(preferencePayload)
        });
        
        if (!preferenceResponse.ok) {
          // Se a resposta for 401, redireciona para login
          if (preferenceResponse.status === 401) {
              router.push('/login'); // Ou sua rota de login
              return; // Impede o restante da execução
          }
          const errorText = await preferenceResponse.text();
          throw new Error(`Erro ao criar preferência: ${preferenceResponse.status} - ${errorText}`);
        }
        
        const preference = await preferenceResponse.json();
        console.log('✅ Preferência criada:', preference);
        setPreferenceId(preference.preference_id); // Armazena o ID da preferência
        
      } catch (err: any) {
        console.error('🔥 ERRO NO FLUXO DE PAGAMENTO:', err);
        setError(err.message || "Erro ao inicializar pagamento.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservaAndCreatePreference();
  }, [id]); // Depende do 'id' da URL, roda quando 'id' muda


  useEffect(() => {
    if (preferenceId && window.MercadoPago) {
      console.log('🎨 Renderizando botão Mercado Pago com preferenceId:', preferenceId);
      const mercadopago_publickey = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY;
      
      const mp = new window.MercadoPago(mercadopago_publickey, {
        locale: 'pt-BR'
      });

      mp.checkout({
        preference: {
          id: preferenceId
        },
        render: {
          container: '#payment-form',
          label: 'Pagar com Mercado Pago',
        }
      });
    }
  }, [preferenceId]);

  // useEffect(() => {
  //   const initMercadoPago = async () => {
  //     console.log('MP KEY', process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY)
  //     const mercadopago_publickey = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY;
  //     // @ts-ignore
  //     const mp = new MercadoPago(mercadopago_publickey, {
  //       locale: 'pt-BR'
  //     })

  //     try {
  //       // Buscar dados da reserva
  //       const reservaResponse = await fetch(`http://localhost:8000/api/reservas/reserva/?id=${id}`)
  //       const reservaData = await reservaResponse.json()
  //       console.log(reservaData)
  //       try {
  //         console.log('🔍 reservaData.imovel:', reservaData.Imovel)
  //         console.log('Enviando dados para criar-preferencia', {
  //           reserva_id: id,
  //           valor: reservaData.valor_total,
  //           descricao: `Reserva em ${reservaData.Imovel.titulo}`
  //         })        
  //       } catch (err) {
  //         console.error('🔥 Erro ao acessar dados da reserva:', err)
  //       }
  //       setReserva(reservaData)



  //       // Criar preferência de pagamento
  //       const preferencePayload = {
  //         reserva_id: id,
  //         valor: reservaData.valor_total,
  //         descricao: `Reserva em ${reservaData.Imovel.titulo}`
  //       }
  //       console.log('📦 Enviando para criar-preferencia:', preferencePayload)
        
  //       const preferenceResponse = await fetch('http://localhost:8000/api/pagamentos/criar_preferencia/', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(preferencePayload)
  //       })
        
  //       // 👇 Verifica se a resposta deu erro HTTP
  //       if (!preferenceResponse.ok) {
  //         const text = await preferenceResponse.text()
  //         throw new Error(`Erro ao criar preferência: ${preferenceResponse.status} - ${text}`)
  //       }
        
  //       const preference = await preferenceResponse.json()
  //       console.log('✅ Preferência criada:', preference)

  //       // Renderizar botão do Mercado Pago
  //       mp.checkout({
  //         preference: {
  //           id: preference.id
  //         },
  //         render: {
  //           container: '#payment-form',
  //           label: 'Pagar com Mercado Pago',
  //         }
  //       })
  //     } catch (error: any) {
  //       console.error('🔥 ERRO COMPLETO:', error)
  //       setError(error.message || "Erro ao inicializar pagamento")
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   const loadMercadoPagoScript = () => {
  //     const script = document.createElement('script')
  //     script.src = 'https://sdk.mercadopago.com/js/v2'
  //     script.onload = () => initMercadoPago()
  //     document.body.appendChild(script)
  //   }

  //   loadMercadoPagoScript()
  // }, [id])

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto text-center">
            Carregando pagamento...
          </div>
        </div>
      </MainLayout>
    )
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Finalizar Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              {reserva && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Detalhes da Reserva</h3>
                    <p>Propriedade: {reserva.imovel?.titulo}</p>
                    <p>Check-in: {new Date(reserva.data_inicio).toLocaleDateString()}</p>
                    <p>Check-out: {new Date(reserva.data_fim).toLocaleDateString()}</p>
                    <p>Hóspedes: {reserva.numero_hospedes}</p>
                    <p className="text-xl font-bold mt-2">
                      Valor Total: R$ {reserva.imovel?.valor_total}
                    </p>
                  </div>

                  {preferenceId && (
                    <div id="payment-form" className="mt-6">
                    </div>
                  )}
                  {!preferenceId && !loading && !error && (
                      <p className="text-gray-600">Preparando botão de pagamento...</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
} 