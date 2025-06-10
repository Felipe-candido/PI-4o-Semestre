'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import MainLayout from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ReservaDetalhes {
  id: string
  imovel: {
    titulo: string
    valor_total: number
  }
  data_inicio: string
  data_fim: string
  numero_hospedes: number
  status: string
}

export default function PaymentPage() {
  const { id } = useParams()
  const router = useRouter()
  const [reserva, setReserva] = useState<ReservaDetalhes | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initMercadoPago = async () => {
      console.log('MP KEY', process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY)
      const mercadopago_publickey = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY;
      // @ts-ignore
      const mp = new MercadoPago(mercadopago_publickey, {
        locale: 'pt-BR'
      })

      try {
        // Buscar dados da reserva
        const reservaResponse = await fetch(`http://localhost:8000/api/reservas/reserva/?id=${id}`)
        const reservaData = await reservaResponse.json()
        console.log(reservaData)
        try {
          console.log('🔍 reservaData.imovel:', reservaData.Imovel)
          console.log('Enviando dados para criar-preferencia', {
            reserva_id: id,
            valor: reservaData.valor_total,
            descricao: `Reserva em ${reservaData.Imovel.titulo}`
          })        } catch (err) {
          console.error('🔥 Erro ao acessar dados da reserva:', err)
        }
        setReserva(reservaData)



        // Criar preferência de pagamento
        const preferencePayload = {
          reserva_id: id,
          valor: reservaData.valor_total,
          descricao: `Reserva em ${reservaData.Imovel.titulo}`
        }
        console.log('📦 Enviando para criar-preferencia:', preferencePayload)
        
        const preferenceResponse = await fetch('http://localhost:8000/api/pagamentos/criar_preferencia/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(preferencePayload)
        })
        
        // 👇 Verifica se a resposta deu erro HTTP
        if (!preferenceResponse.ok) {
          const text = await preferenceResponse.text()
          throw new Error(`Erro ao criar preferência: ${preferenceResponse.status} - ${text}`)
        }
        
        const preference = await preferenceResponse.json()
        console.log('✅ Preferência criada:', preference)

        // Renderizar botão do Mercado Pago
        mp.checkout({
          preference: {
            id: preference.id
          },
          render: {
            container: '#payment-form',
            label: 'Pagar com Mercado Pago',
          }
        })
      } catch (error: any) {
        console.error('🔥 ERRO COMPLETO:', error)
        setError(error.message || "Erro ao inicializar pagamento")
      } finally {
        setLoading(false)
      }
    }

    const loadMercadoPagoScript = () => {
      const script = document.createElement('script')
      script.src = 'https://sdk.mercadopago.com/js/v2'
      script.onload = () => initMercadoPago()
      document.body.appendChild(script)
    }

    loadMercadoPagoScript()
  }, [id])

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
                    <p>Propriedade: {reserva.Imovel.titulo}</p>
                    <p>Check-in: {new Date(reserva.data_inicio).toLocaleDateString()}</p>
                    <p>Check-out: {new Date(reserva.data_fim).toLocaleDateString()}</p>
                    <p>Hóspedes: {reserva.numero_hospedes}</p>
                    <p className="text-xl font-bold mt-2">
                      Valor Total: R$ {reserva.Imovel.valor_total}
                    </p>
                  </div>

                  <div id="payment-form" className="mt-6">
                    {/* O botão do Mercado Pago será renderizado aqui */}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
} 