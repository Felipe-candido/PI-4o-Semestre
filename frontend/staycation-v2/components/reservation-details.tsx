"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Users, MapPin, CheckCircle, XCircle, ExternalLink, AlertTriangle, BadgeDollarSign, BedDouble } from "lucide-react"
import { CancelReservationModal } from "./cancel-reservation-modal"
import { apiFetch2 } from "@/lib/api"

// Interfaces de Tipo
interface Imovel {
  id: number
  titulo: string
  descricao: string
  regras?: string
  proprietario_nome?: string
  proprietario_telefone?: string
  proprietario_foto?: string
  endereco: {
    cidade: string
    estado: string
  }
  logo?: string
}

interface Reserva {
  id: number
  Imovel: {
    id: number
    titulo: string
  }
  data_inicio: string
  data_fim: string
  numero_hospedes: number
  valor_total: number
  status: string
}

// Componente de Skeleton para o estado de Loading
function ReservationDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-pulse">
      <div className="mb-8">
        <Skeleton className="h-9 w-3/4 mb-2" />
        <Skeleton className="h-5 w-1/2" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-7 w-2/3" />
                <Skeleton className="h-5 w-1/4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export function ReservationDetails() {
  const { id } = useParams()
  const router = useRouter();
  
  // Estados para dados, carregamento e erros
  const [reserva, setReserva] = useState<Reserva | null>(null)
  const [imovel, setImovel] = useState<Imovel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Estado para o modal de cancelamento
  const [showCancelModal, setShowCancelModal] = useState(false)

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

  // --- Funções Auxiliares ---
  const formatDate = (dateString: string) => {
    if (!dateString) return "Data indisponível"
    return new Date(dateString).toLocaleDateString("pt-BR", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    })
  }

  const formatCurrency = (value: number) => {
     if (typeof value !== 'number') return "R$ 0,00"
     return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }
  
  const calculateNights = (start: string, end: string) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  
  const nights = calculateNights(reserva?.data_inicio ?? "", reserva?.data_fim ?? "");
  const pricePerNight = nights > 0 ? reserva?.valor_total / nights : 0; // Exemplo simplificado

  // Efeito para buscar os dados da reserva e do imóvel
  useEffect(() => {
    if (!id) {
      setError("ID da reserva não encontrado na URL.")
      setLoading(false)
      return
    }

    async function fetchData() {
      try {
        setLoading(true)
        const reservaRes = await apiFetch2(`/api/reservas/reserva/?id=${id}`)
        if (!reservaRes.ok) throw new Error("Não foi possível buscar os detalhes da reserva.")
        const reservaData: Reserva = await reservaRes.json()
        setReserva(reservaData)

        if (reservaData.Imovel?.id) {
          const imovelRes = await apiFetch2(`/api/imoveis/propriedade/?id=${reservaData.Imovel.id}`)
          if (!imovelRes.ok) throw new Error("Não foi possível buscar os detalhes da propriedade.")
          const imovelData: Imovel = await imovelRes.json()
          setImovel(imovelData)
        }
      } catch (err: any) {
        console.error('Falha ao buscar dados:', err)
        setError(err.message || "Ocorreu um erro desconhecido.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  // --- Lógica de Ações ---
  const handleCheckIn = () => console.log("Check-in confirmado para a reserva:", reserva?.id)
  const handleCancel = () => {
    console.log("Reserva cancelada:", reserva?.id)
    // Aqui você adicionaria a lógica de API para cancelar
    // e depois, talvez, atualizar o estado da reserva ou redirecionar.
    setShowCancelModal(false)
  }

  // --- Renderização Condicional ---
  if (loading) {
    return <ReservationDetailsSkeleton />
  }

  if (error || !reserva || !imovel) {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Erro ao Carregar Reserva</AlertTitle>
                <AlertDescription>{error || "Não foi possível encontrar os dados da reserva. Tente novamente mais tarde."}</AlertDescription>
            </Alert>
        </div>
    );
  }
  
  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status.toUpperCase()) {
        case 'CONFIRMADA': return "default";
        case 'PENDENTE': return "secondary";
        case 'CANCELADA': return "destructive";
        case 'FINALIZADA': return "outline";
        default: return "secondary";
    }
  };


  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Cabeçalho */}
        <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-2">
                <h1 className="text-3xl font-bold text-slate-800">Detalhes da Reserva</h1>
                <Badge variant={getStatusBadgeVariant(reserva.status)} className="capitalize text-sm">{reserva.status}</Badge>
            </div>
            <p className="text-slate-500">Gerencie sua reserva e veja informações importantes.</p>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Esquerda */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-700">
                        <BedDouble className="h-5 w-5 text-sky-600" />
                        Sua Estadia em {imovel.titulo}
                    </CardTitle>
                </CardHeader>
              <CardContent className="space-y-6">
                <div className="aspect-video relative overflow-hidden rounded-lg">
                  <img
                    src={imovel.logo ? `${baseURL}${imovel.logo}` : "/placeholder.svg"}
                    alt={`Imagem de ${imovel.titulo}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-sky-600" />
                    <div>
                      <p className="font-semibold text-slate-700">Check-in</p>
                      <p className="text-sm text-slate-500">{formatDate(reserva.data_inicio)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-sky-600" />
                    <div>
                      <p className="font-semibold text-slate-700">Check-out</p>
                      <p className="text-sm text-slate-500">{formatDate(reserva.data_fim)}</p>
                    </div>
                  </div>
                </div>
                 <div className="flex items-center gap-3 p-4 bg-slate-100 rounded-lg">
                    <Users className="h-6 w-6 text-sky-600" />
                    <div>
                        <p className="font-semibold text-slate-700">Hóspedes</p>
                        <p className="text-sm text-slate-500">{reserva.numero_hospedes} pessoa(s)</p>
                    </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-slate-700">Informações Adicionais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-slate-600 mb-3">Seu Anfitrião</h4>
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={imovel.proprietario_foto ? `${baseURL}${imovel.proprietario_foto}` : undefined} alt={imovel.proprietario_nome} />
                                <AvatarFallback className="bg-sky-100 text-sky-700 font-bold">
                                    {imovel.proprietario_nome?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-slate-800">{imovel.proprietario_nome}</p>
                                <p className="text-sm text-slate-500">{imovel.proprietario_telefone}</p>
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div> 
                        <h4 className="font-semibold text-slate-600 mb-2">ID da Reserva</h4>
                        <code className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-sm font-mono">{reserva.id}</code>
                    </div>
                </CardContent>
            </Card>
          </div>

          {/* Coluna Direita */}
          <div className="space-y-6">
            <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-700">
                      <BadgeDollarSign className="h-5 w-5 text-sky-600" />
                      Detalhes do Pagamento
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-slate-600">
                    <div className="flex justify-between">
                        <span>{formatCurrency(pricePerNight)} x {nights} noites</span>
                        <span>{formatCurrency(reserva.valor_total)}</span>
                    </div>
                    {/* Adicione outras taxas se existirem */}
                    <div className="flex justify-between">
                        <span>Taxa de serviço</span>
                        <span>{formatCurrency(0)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold text-slate-800 text-lg">
                        <span>Total</span>
                        <span>{formatCurrency(reserva.valor_total)}</span>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-slate-700">Ações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Button 
                        onClick={handleCheckIn} 
                        disabled={reserva.status !== "CONFIRMADA"} 
                        className="w-full gap-2 bg-sky-600 hover:bg-sky-700" 
                        size="lg"
                    >
                        <CheckCircle className="h-5 w-5" />
                        Confirmar Check-in
                    </Button>
                    <Button 
                        variant="outline" 
                        onClick={() => setShowCancelModal(true)}
                        disabled={['CANCELADA', 'FINALIZADA'].includes(reserva.status.toUpperCase())}
                        className="w-full gap-2" 
                        size="lg"
                    >
                        <XCircle className="h-5 w-5" />
                        Cancelar Reserva
                    </Button>
                </CardContent>
            </Card>
          </div>
        </div>

        <CancelReservationModal
          open={showCancelModal}
          onOpenChange={setShowCancelModal}
          onConfirm={handleCancel}
          reservationId={reserva.id}
        />
      </div>
    </div>
  )
}