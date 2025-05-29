'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import MainLayout from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface ReservaDetalhes {
  id: string
  imovel: {
    titulo: string
    endereco: {
      cidade: string
      estado: string
    }
  }
  data_inicio: string
  data_fim: string
  valor_total: number
  status: string
  numero_hospedes: number
}

export default function ConfirmacaoPage() {
  const { id } = useParams()
  const router = useRouter()
  const [reserva, setReserva] = useState<ReservaDetalhes | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/reservas/confirma/${id}/`)
        if (!response.ok) throw new Error('Reserva não encontrada')
        const data = await response.json()
        setReserva(data)
      } catch (error) {
        setError("Erro ao carregar dados da reserva")
      }
    }

    if (id) {
      fetchReserva()
    }
  }, [id])

  if (!reserva) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {error ? (
              <Alert variant="destructive">
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <div>Carregando...</div>
            )}
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Reserva Confirmada!</h1>
            <p className="text-gray-600">
              Sua reserva foi confirmada com sucesso. Abaixo estão todos os detalhes.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Reserva</CardTitle>
              <CardDescription>Número da reserva: #{reserva.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Imóvel</h3>
                  <p className="text-gray-700">{reserva.imovel.titulo}</p>
                  <p className="text-gray-600">
                    {reserva.imovel.endereco.cidade}, {reserva.imovel.endereco.estado}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-1">Check-in</h3>
                    <p className="text-gray-700">
                      {new Date(reserva.data_inicio).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Check-out</h3>
                    <p className="text-gray-700">
                      {new Date(reserva.data_fim).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">Hóspedes</h3>
                  <p className="text-gray-700">{reserva.numero_hospedes} pessoas</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">Valor Total</h3>
                  <p className="text-2xl font-bold text-primary">
                    R$ {reserva.valor_total.toFixed(2)}
                  </p>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold mb-2">Próximos Passos</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Você receberá um e-mail com todos os detalhes da reserva</li>
                    <li>O proprietário entrará em contato para combinar a entrega das chaves</li>
                    <li>Mantenha seu telefone disponível no dia do check-in</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push('/')}
            >
              Voltar para Home
            </Button>
            <Button
              onClick={() => router.push('/minhas-reservas')}
            >
              Minhas Reservas
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 