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
import { apiFetch } from "@/lib/api"

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
    numero: number
    bairro: string
  }
  logo?: string
  imagens: { imagem: string; legenda: string }[]
}


interface Reserva {
  id: number
  checkIn: string
  checkOut: string
  numero_hospedes: number
  valor: number
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  useEffect(() => {

    async function fetchImovel() {
      try{
        const res = await apiFetch(`/api/imoveis/propriedade/?id=${id}`)

        const data_imovel = await res.json()

        setImovel(data_imovel)
        console.log(data_imovel)
      }
      catch(error){
        console.log('erro ao buscar imovel', error)
      }
    }

    

    if(id){
      fetchImovel()
    }
  })



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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Detalhes da reserva</h1>
        <p className="text-foreground">Gerencie sua reserva e veja informações inportantes</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Reservation Summary */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Detalhes da propriedade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <img
                  src={imovel?.logo || "/placeholder.svg"}
                  alt={imovel?.titulo}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{imovel?.titulo}</h3>
                <p className="text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {imovel?.endereco.cidade}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Check-in</p>
                    <p className="text-sm text-muted-foreground">{formatDate(reserva?.checkIn ?? "")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Check-out</p>
                    <p className="text-sm text-muted-foreground">{formatDate(reserva?.checkOut ?? "")}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Guests</p>
                  <p className="text-sm text-muted-foreground">{reserva?.numero_hospedes} Hospedes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Host Information */}
              <div>
                <h4 className="font-medium mb-3">Your Host</h4>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={imovel?.proprietario_foto || "/placeholder.svg"} alt={imovel?.proprietario_nome
                    } />
                    <AvatarFallback>
                      {imovel?.proprietario_nome}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{imovel?.proprietario_nome}</p>
                    <p className="text-sm text-muted-foreground">Anfitriao da propriedade</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Location & Map */}
              <div>
                <h4 className="font-medium mb-3">Location</h4>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Interactive map would be here</p>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <ExternalLink className="h-4 w-4" />
                      View on Maps
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Reservation ID */}
              <div> 
                <h4 className="font-medium mb-2">ID da reserva</h4>
                <code className="bg-muted px-2 py-1 rounded text-sm">{reserva?.id}</code>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Pricing & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Price Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>
                    ${reserva?.valor} × {reserva?.valor} nights
                  </span>
                  <span>${reserva?.valor}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span>${reserva?.valor}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>${reserva?.valor}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${reserva?.valor}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleCheckIn} disabled={reserva?.status == "CONFIRMADA"} className="w-full gap-2" size="lg">
                <CheckCircle className="h-4 w-4" />
                {reserva?.checkIn ? "Confirm Check-in" : "Checkin confirmado"}
              </Button>

              <Button variant="destructive" onClick={() => setShowCancelModal(true)} className="w-full gap-2" size="lg">
                <XCircle className="h-4 w-4" />
                Cancel Reservation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <CancelReservationModal
        open={showCancelModal}
        onOpenChange={setShowCancelModal}
        onConfirm={handleCancel}
        reservationId={reserva?.id}
      />
    </div>
  )
}
