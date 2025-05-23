'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import MainLayout from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ReservaDetalhes {
  id: string
  imovel: {
    titulo: string
    preco: number
  }
  data_inicio: string
  data_fim: string
  valor_total: number
  status: string
}

export default function PaymentPage() {
  const { id } = useParams()
  const router = useRouter()
  const [reserva, setReserva] = useState<ReservaDetalhes | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  // Dados do cartão
  const [formData, setFormData] = useState({
    numeroCartao: '',
    nomeCartao: '',
    validade: '',
    cvv: ''
  })

  // Buscar detalhes da reserva
  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/reservas/${id}/`)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Aqui você implementaria a integração com o gateway de pagamento
      const response = await fetch(`http://localhost:8000/api/reservas/${id}/confirmar-pagamento/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          reserva_id: id
        })
      })

      if (response.ok) {
        router.push(`/reservas/${id}/confirmacao`)
      } else {
        setError("Erro ao processar pagamento")
      }
    } catch (error) {
      setError("Erro ao processar pagamento")
    } finally {
      setLoading(false)
    }
  }

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
          <h1 className="text-3xl font-bold mb-6">Pagamento da Reserva</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Detalhes da Reserva */}
            <Card>
              <CardHeader>
                <CardTitle>Detalhes da Reserva</CardTitle>
                <CardDescription>Confira os detalhes antes de pagar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Imóvel</h3>
                    <p>{reserva.imovel.titulo}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Período</h3>
                    <p>Check-in: {new Date(reserva.data_inicio).toLocaleDateString()}</p>
                    <p>Check-out: {new Date(reserva.data_fim).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Valor Total</h3>
                    <p className="text-2xl font-bold">R$ {reserva.valor_total.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Formulário de Pagamento */}
            <Card>
              <CardHeader>
                <CardTitle>Dados do Pagamento</CardTitle>
                <CardDescription>Preencha os dados do seu cartão</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertTitle>Erro</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div>
                    <Label htmlFor="numeroCartao">Número do Cartão</Label>
                    <Input
                      id="numeroCartao"
                      placeholder="1234 5678 9012 3456"
                      value={formData.numeroCartao}
                      onChange={(e) => setFormData({...formData, numeroCartao: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="nomeCartao">Nome no Cartão</Label>
                    <Input
                      id="nomeCartao"
                      placeholder="Como está no cartão"
                      value={formData.nomeCartao}
                      onChange={(e) => setFormData({...formData, nomeCartao: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="validade">Validade</Label>
                      <Input
                        id="validade"
                        placeholder="MM/AA"
                        value={formData.validade}
                        onChange={(e) => setFormData({...formData, validade: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Processando..." : `Pagar R$ ${reserva.valor_total.toFixed(2)}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 