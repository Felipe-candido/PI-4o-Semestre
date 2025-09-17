"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar, Users, MapPin, CheckCircle, XCircle, ExternalLink } from "lucide-react"
import { CancelReservationModal } from "./cancel-reservation-modal"
import { useParams, useRouter } from 'next/navigation'
import { apiFetch, apiFetch2 } from "@/lib/api"

interface Imovel {
  id: number
  titulo: string
  descricao: string
  regras?: string
  preco?: number
  proprietario_nome?: string
  proprietario_telefone?: string
  proprietario_foto?: string
  endereco: {
    cidade: string
    estado: string
    numero: number
    bairro: string
  }
  logo?: string
  imagens: { imagem: string; legenda: string }[]
}


interface Reserva {
  id: number
  usuario: {
    id: number
    nome: string
    email: string
  }
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

interface ReservationDetailsProps {
  Reserva: Reserva
}

export function ReservationDetails({ Reserva }: ReservationDetailsProps) {
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [imovel, setImovel] = useState<Imovel | null>(null)
  const [reserva, setReserva] = useState<Reserva | null>(null)
  const { id } = useParams()

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calculateNights = (checkIn: string, checkOut: string) => {
    const startDate = new Date(checkIn)
    const endDate = new Date(checkOut)
    const timeDiff = endDate.getTime() - startDate.getTime()
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return nights > 0 ? nights : 1
  }

  useEffect(() => {

    async function fetchReserva() {
      try{
        const res = await apiFetch2(`/api/reservas/reserva/?id=${id}`)

        const data_reserva = await res.json()

        setReserva(data_reserva)
        console.log(data_reserva)
      }
      catch(error){
        console.log('erro ao buscar reserva', error)
      }
    }
    
    if(id){
      fetchReserva()
    }

  }, [id])

  useEffect(() => {
    async function fetchImovel(){
      try{
        const res = await apiFetch2(`/api/imoveis/propriedade/?id=${reserva?.Imovel.id}`)

        const data_imovel = await res.json()

        setImovel(data_imovel)
        console.log(data_imovel)
      }
      catch(error){
        console.log('erro ao buscar imovel', error)
      }
    }

    if(reserva?.Imovel.id){
      fetchImovel()
    }
  }, [reserva?.Imovel.id])



  const handleCheckIn = () => {
    // Handle check-in logic
    console.log("Check-in confirmed for reservation:", Reserva.id)
  }

  const handleCancel = () => {
    // Handle cancellation logic
    console.log("Reservation cancelled:", Reserva.id)
    setShowCancelModal(false)
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#294c60]/20">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#294c60] to-[#2d080a] bg-clip-text text-transparent mb-2">
              Detalhes da reserva
            </h1>
            <p className="text-[#294c60] text-lg">Gerencie sua reserva e veja informações importantes</p>
          </div>
        </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Reservation Summary */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-[#1d2f6f] text-[#FFFFFF] rounded-t-lg p-3 -mt-6">
              <CardTitle className="flex items-center gap-2 text-xl">
                <MapPin className="h-6 w-6" />
                Detalhes da propriedade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="aspect-video relative overflow-hidden rounded-xl shadow-lg">
                <img
                  src={imovel?.logo ? `${baseURL}${imovel.logo}` : "/placeholder.svg"}
                  alt={imovel?.titulo}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#294c60] mb-2">{imovel?.titulo}</h3>
                <p className="text-[#294c60]/80 flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-[#294c60]" />
                  {imovel?.endereco.cidade} - {imovel?.endereco.estado}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#e7ecef]/50 to-[#294c60]/10 rounded-xl border border-[#294c60]/20">
                  <div className="p-2 bg-[#294c60] rounded-lg">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#294c60]">Check-in</p>
                    <p className="text-sm text-[#294c60]/80 font-medium">{formatDate(reserva?.data_inicio ?? "")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#e7ecef]/50 to-[#2d080a]/10 rounded-xl border border-[#2d080a]/20">
                  <div className="p-2 bg-[#2d080a] rounded-lg">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#294c60]">Check-out</p>
                    <p className="text-sm text-[#294c60]/80 font-medium">{formatDate(reserva?.data_fim ?? "")}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#e7ecef]/50 to-[#294c60]/10 rounded-xl border border-[#294c60]/20">
                <div className="p-2 bg-[#294c60] rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#294c60]">Hóspedes</p>
                  <p className="text-sm text-[#294c60]/80 font-medium">{reserva?.numero_hospedes} Pessoas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-[#1d2f6f] text-[#FFFFFF] rounded-t-lg p-3 -mt-6">
              <CardTitle className="text-xl">Informações Adicionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* Host Information */}
              <div className="p-4 bg-gradient-to-r from-[#e7ecef]/50 to-[#294c60]/10 rounded-xl border border-[#294c60]/20">
                <h4 className="font-semibold mb-4 text-[#294c60] text-lg">Seu Anfitrião</h4>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 ring-4 ring-white shadow-lg">
                    <AvatarImage src={imovel?.proprietario_foto || "/placeholder.svg"} alt={imovel?.proprietario_nome} />
                    <AvatarFallback className="bg-gradient-to-r from-[#294c60] to-[#2d080a] text-white font-bold text-lg">
                      {imovel?.proprietario_nome?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-[#294c60] text-lg">{imovel?.proprietario_nome}</p>
                    <p className="text-[#294c60]/80">Anfitrião da propriedade</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Location & Map */}
              <div className="p-4 bg-gradient-to-r from-[#e7ecef]/50 to-[#294c60]/10 rounded-xl border border-[#294c60]/20">
                <h4 className="font-semibold mb-4 text-[#294c60] text-lg">Localização</h4>
                <div className="aspect-video bg-gradient-to-br from-[#e7ecef] to-[#294c60]/20 rounded-xl flex items-center justify-center shadow-inner">
                  <div className="text-center">
                    <div className="p-4 bg-white rounded-full shadow-lg mb-4 mx-auto w-fit">
                      <MapPin className="h-8 w-8 text-[#294c60]" />
                    </div>
                    <p className="text-[#294c60] mb-4 font-medium">Mapa interativo</p>
                    <Button variant="outline" size="sm" className="gap-2 bg-white hover:bg-[#294c60]/10 border-[#294c60] text-[#294c60] hover:text-[#2d080a]">
                      <ExternalLink className="h-4 w-4" />
                      Ver no Maps
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Reservation ID */}
              <div className="p-4 bg-gradient-to-r from-[#e7ecef]/50 to-[#2d080a]/10 rounded-xl border border-[#2d080a]/20"> 
                <h4 className="font-semibold mb-3 text-[#294c60] text-lg">ID da Reserva</h4>
                <code className="bg-white px-4 py-2 rounded-lg text-sm font-mono border border-[#2d080a]/20 text-[#2d080a] shadow-sm">
                  #{reserva?.id}
                </code>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Pricing & Actions */}
        <div className="space-y-6">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-[#1d2f6f] text-[#FFFFFF] rounded-t-lg p-3 -mt-6">
              <CardTitle className="text-xl">Resumo de Preços</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#e7ecef]/30 rounded-lg">
                  <span className="text-[#294c60] font-medium">
                    R$ {imovel?.preco} × {reserva?.data_inicio && reserva?.data_fim ? calculateNights(reserva.data_inicio, reserva.data_fim) : 1} noite(s)
                  </span>
                  <span className="font-semibold text-[#294c60]">R$ {reserva?.valor_total}</span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#294c60]/10 to-[#2d080a]/10 rounded-xl border border-[#294c60]/20">
                  <span className="font-bold text-lg text-[#294c60]">Total</span>
                  <span className="font-bold text-xl text-[#294c60]">R$ {reserva?.valor_total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-[#1d2f6f] text-[#FFFFFF] rounded-t-lg p-3 -mt-6">
              <CardTitle className="text-xl">Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <Button 
                onClick={handleCheckIn} 
                disabled={reserva?.status == "CONFIRMADA"} 
                className="w-full gap-3 bg-gradient-to-r bg-gradient-to-r from-[#e7ecef]/50 to-[#294c60]/10 border border-[#294c60]/20 hover:shadow-xl transition-all duration-200" 
                size="lg"
              >
                <CheckCircle className="h-5 w-5" />
                {reserva?.data_inicio ? "Confirmar Check-in" : "Check-in confirmado"}
              </Button>

              <Button 
                variant="destructive" 
                onClick={() => setShowCancelModal(true)} 
                className="w-full gap-3 bg-gradient-to-r from-[#e7ecef]/50 to-[#294c60]/10 border border-[#294c60]/20 hover: text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-200" 
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
          reservationId={reserva?.id?.toString() || ""}
        />
      </div>
    </div>
  )
}

