'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import MainLayout from "@/components/layout/MainLayout"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface ReservaForm {
  dataInicio: Date | undefined
  dataFim: Date | undefined
  numeroHospedes: number
  observacoes: string
}

export default function ReservePage() {
  const { id } = useParams()
  const router = useRouter()
  const [imovel, setImovel] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [disponivel, setDisponivel] = useState<boolean | null>(null)
  const [valorTotal, setValorTotal] = useState(0)
  
  const [formData, setFormData] = useState<ReservaForm>({
    dataInicio: undefined,
    dataFim: undefined,
    numeroHospedes: 1,
    observacoes: ""
  })

  // Buscar dados do imóvel
  useState(() => {
    const fetchImovel = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/imoveis/propriedade/?id=${id}`)
        const data = await response.json()
        setImovel(data)
      } catch (error) {
        setError("Erro ao carregar dados do imóvel")
      }
    }
    
    if (id) {
      fetchImovel()
    }
  }, [id])

  // Verificar disponibilidade
  const verificarDisponibilidade = async () => {
    if (!formData.dataInicio || !formData.dataFim) {
      setError("Selecione as datas da reserva")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(
        `http://localhost:8000/api/imoveis/chacaras/?imovel_id=${id}/verificar-disponibilidade/?data_inicio=${format(formData.dataInicio, "yyyy-MM-dd")}&data_fim=${format(formData.dataFim, "yyyy-MM-dd")}`
      )
      const data = await response.json()
      setDisponivel(data.disponivel)
      
      if (data.disponivel) {
        // Calcular valor total
        const dias = Math.ceil((formData.dataFim.getTime() - formData.dataInicio.getTime()) / (1000 * 60 * 60 * 24))
        setValorTotal(dias * imovel.preco)
      }
    } catch (error) {
      setError("Erro ao verificar disponibilidade")
    } finally {
      setLoading(false)
    }
  }

  // Prosseguir para pagamento
  const prosseguirParaPagamento = async () => {
    if (!disponivel) {
      setError("Verifique a disponibilidade primeiro")
      return
    }

    try {
      const response = await fetch('http://localhost:8000/api/reservas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imovel_id: id,
          data_inicio: format(formData.dataInicio!, "yyyy-MM-dd'T'HH:mm:ss"),
          data_fim: format(formData.dataFim!, "yyyy-MM-dd'T'HH:mm:ss"),
          numero_hospedes: formData.numeroHospedes,
          observacoes: formData.observacoes
        })
      })

      if (response.ok) {
        const reserva = await response.json()
        router.push(`/payment/${reserva.id}`)
      } else {
        setError("Erro ao criar reserva")
      }
    } catch (error) {
      setError("Erro ao processar sua reserva")
    }
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Fazer Reserva</h1>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {disponivel && (
            <Alert className="mb-6">
              <AlertTitle>Disponível!</AlertTitle>
              <AlertDescription>
                O imóvel está disponível para as datas selecionadas.
                Valor total: R$ {valorTotal.toFixed(2)}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Data de Check-in</Label>
              <Calendar
                mode="single"
                selected={formData.dataInicio}
                onSelect={(date) => setFormData({...formData, dataInicio: date})}
                locale={ptBR}
                className="rounded-md border"
              />
            </div>

            <div>
              <Label>Data de Check-out</Label>
              <Calendar
                mode="single"
                selected={formData.dataFim}
                onSelect={(date) => setFormData({...formData, dataFim: date})}
                locale={ptBR}
                className="rounded-md border"
              />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <Label>Número de Hóspedes</Label>
              <Input
                type="number"
                min={1}
                max={imovel?.numero_hospedes || 1}
                value={formData.numeroHospedes}
                onChange={(e) => setFormData({...formData, numeroHospedes: parseInt(e.target.value)})}
              />
            </div>

            <div>
              <Label>Observações</Label>
              <textarea
                className="w-full p-2 border rounded-md"
                rows={4}
                value={formData.observacoes}
                onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                placeholder="Alguma observação especial para sua estadia?"
              />
            </div>
          </div>

          <div className="mt-8 space-x-4">
            <Button
              onClick={verificarDisponibilidade}
              disabled={loading || !formData.dataInicio || !formData.dataFim}
            >
              {loading ? "Verificando..." : "Verificar Disponibilidade"}
            </Button>

            {disponivel && (
              <Button
                onClick={prosseguirParaPagamento}
                variant="default"
              >
                Prosseguir para Pagamento
              </Button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 