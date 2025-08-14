"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar, Users, MapPin, CheckCircle, XCircle, ExternalLink } from "lucide-react"
import { CancelReservationModal } from "./cancel-reservation-modal"

interface Reservation {
  id: string
  property: {
    name: string
    address: string
    image: string
  }
  dates: {
    checkIn: string
    checkOut: string
  }
  guests: number
  pricing: {
    nightlyRate: number
    nights: number
    subtotal: number
    cleaningFee: number
    serviceFee: number
    total: number
  }
  amenities: Array<{
    name: string
    icon: string
  }>
  host: {
    name: string
    avatar: string
  }
  location: {
    lat: number
    lng: number
  }
  canCheckIn: boolean
}

interface ReservationDetailsProps {
  reservation: Reservation
}

export function ReservationDetails({ reservation }: ReservationDetailsProps) {
  const [showCancelModal, setShowCancelModal] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleCheckIn = () => {
    // Handle check-in logic
    console.log("Check-in confirmed for reservation:", reservation.id)
  }

  const handleCancel = () => {
    // Handle cancellation logic
    console.log("Reservation cancelled:", reservation.id)
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
                  src={reservation.property.image || "/placeholder.svg"}
                  alt={reservation.property.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{reservation.property.name}</h3>
                <p className="text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {reservation.property.address}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Check-in</p>
                    <p className="text-sm text-muted-foreground">{formatDate(reservation.dates.checkIn)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Check-out</p>
                    <p className="text-sm text-muted-foreground">{formatDate(reservation.dates.checkOut)}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Guests</p>
                  <p className="text-sm text-muted-foreground">{reservation.guests} guests</p>
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
              {/* Amenities */}
              <div>
                <h4 className="font-medium mb-3">Amenities</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {reservation.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="justify-start gap-2 py-2">
                      <span>{amenity.icon}</span>
                      {amenity.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Host Information */}
              <div>
                <h4 className="font-medium mb-3">Your Host</h4>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={reservation.host.avatar || "/placeholder.svg"} alt={reservation.host.name} />
                    <AvatarFallback>
                      {reservation.host.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{reservation.host.name}</p>
                    <p className="text-sm text-muted-foreground">Property Host</p>
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
                <h4 className="font-medium mb-2">Reservation ID</h4>
                <code className="bg-muted px-2 py-1 rounded text-sm">{reservation.id}</code>
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
                    ${reservation.pricing.nightlyRate} × {reservation.pricing.nights} nights
                  </span>
                  <span>${reservation.pricing.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span>${reservation.pricing.cleaningFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>${reservation.pricing.serviceFee}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${reservation.pricing.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleCheckIn} disabled={!reservation.canCheckIn} className="w-full gap-2" size="lg">
                <CheckCircle className="h-4 w-4" />
                {reservation.canCheckIn ? "Confirm Check-in" : "Check-in Not Available"}
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
        reservationId={reservation.id}
      />
    </div>
  )
}
