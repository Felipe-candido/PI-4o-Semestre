'use client'

import { useState, useEffect } from 'react'
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
  const [usuario, setUsuario] = useState<any>(null)
  
  const [formData, setFormData] = useState<ReservaForm>({
    dataInicio: undefined,
    dataFim: undefined,
    numeroHospedes: 1,
    observacoes: ""
  })

  // Buscar dados do usuario
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/me/', {
          credentials: 'include',
        })
        if (!response.ok) {
          router.push('/auth/login') // Redireciona para login se não estiver autenticado
          return
        }
        const data = await response.json()
        setUsuario(data)
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error)
        router.push('/auth/login')
      }
    }

    fetchUsuario()
  }, [])

  // Buscar dados do imóvel
  useEffect(() => {
    let isMounted = true
  
    const fetchImovel = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/imoveis/propriedade/?id=${id}`)
        const data = await response.json()
        if (isMounted) setImovel(data)
      } catch (error) {
        if (isMounted) setError("Erro ao carregar dados do imóvel")
      }
    }
  
    if (id) {
      fetchImovel()
    }
  
    return () => {
      isMounted = false
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
      // Converter as datas para UTC e formatar como ISO
      const dataInicioUTC = new Date(formData.dataInicio.getTime() - formData.dataInicio.getTimezoneOffset() * 60000);
      const dataFimUTC = new Date(formData.dataFim.getTime() - formData.dataFim.getTimezoneOffset() * 60000);

      const response = await fetch(
        `http://localhost:8000/api/imoveis/chacaras/${id}/verificar_disponibilidade/?data_inicio=${dataInicioUTC.toISOString()}&data_fim=${dataFimUTC.toISOString()}`
      )
      const data = await response.json()
      console.log("Resposta da verificação:", data)
      console.log("Disponível:", data.disponivel)
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

    if (!usuario) {
      setError("Você precisa estar logado para fazer uma reserva")
      router.push('/auth/login')
      return
    }

    setLoading(true)
    setError("")

    try {
      const dataInicio = new Date(formData.dataInicio!)
      const dataFim = new Date(formData.dataFim!)
      
      // Set the time to noon to avoid any timezone issues
      dataInicio.setHours(12, 0, 0, 0)
      dataFim.setHours(12, 0, 0, 0)

      const dadosReserva = {
        Imovel: id,
        data_inicio: dataInicio.toISOString(), 
        data_fim: dataFim.toISOString(),
        numero_hospedes: formData.numeroHospedes,
        observacoes: formData.observacoes || "",
        valor_total: valorTotal,
        usuario: usuario.id
      }
      console.log("Dados sendo enviados:", dadosReserva)

      const response = await fetch('http://localhost:8000/api/reservas/confirma/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dadosReserva)
      })

      const responseData = await response.json()
      console.log("Resposta completa da API:", responseData)

      if (!response.ok) {
        console.error("Erro da API:", responseData)
        throw new Error(responseData.error || responseData.details || responseData.message || "Erro ao criar reserva")
      }

      console.log("Reserva criada com sucesso:", responseData)
      router.push(`/payment/${responseData.id}`)
    } catch (error) {
      console.error("Erro completo:", error)
      setError(error instanceof Error ? error.message : "Erro ao processar sua reserva")
    } finally {
      setLoading(false)
    }
  }

  function getCSRFToken() {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];
    console.log("CSRF Token encontrado:", cookieValue)
    return cookieValue || '';
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

          {disponivel === true && (
            <Alert className="mb-6">
              <AlertTitle>Disponível!</AlertTitle>
              <AlertDescription>
                O imóvel está disponível para as datas selecionadas.
                Valor total: R$ {valorTotal.toFixed(2)}
              </AlertDescription>
            </Alert>
          )}

          {disponivel === false && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Indisponível</AlertTitle>
              <AlertDescription>
                Desculpe, o imóvel não está disponível para as datas selecionadas.
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

            {disponivel === true && (
              <Button
                onClick={prosseguirParaPagamento}
                variant="default"
                disabled={loading}
              >
                {loading ? "Processando..." : "Prosseguir para Pagamento"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 