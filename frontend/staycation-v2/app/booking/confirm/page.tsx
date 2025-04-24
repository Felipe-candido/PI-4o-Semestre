import MainLayout from "@/components/layout/MainLayout"
import Link from "next/link"
import { Calendar, MapPin, User, CreditCard, CheckCircle, ArrowLeft } from "lucide-react"

export default function BookingConfirmation() {
  // Em uma aplicação real, você obteria os dados do usuário e da reserva do seu contexto/API
  const userRole = "tenant"
  const userName = "João Silva"
  const userAvatar = "/images/tenant-avatar.jpg"

  // Dados simulados da reserva
  const booking = {
    id: "RES-12345",
    property: {
      name: "Chalé na Montanha",
      address: "Estrada da Serra, km 15 - Serra da Mantiqueira, SP",
      image: "/images/property-1.jpg",
    },
    host: {
      name: "Maria Oliveira",
      avatar: "/images/owner-avatar.jpg",
    },
    dates: {
      checkIn: "20/06/2023",
      checkOut: "25/06/2023",
      nights: 5,
    },
    guests: 2,
    pricing: {
      nightlyRate: 180,
      cleaningFee: 100,
      serviceFee: 90,
      total: 1090,
    },
    paymentMethod: "Cartão de crédito (final 4321)",
  }

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link href="/search" className="text-primary hover:text-primary/80 flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Continuar explorando
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center text-primary mb-2">Reserva Confirmada!</h1>
            <p className="text-center text-gray-600 mb-8">
              Sua reserva no {booking.property.name} foi confirmada. Enviamos os detalhes para seu e-mail.
            </p>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold mb-4">Detalhes da Reserva</h2>
              <div className="flex flex-col md:flex-row mb-6">
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <img
                    src={booking.property.image || "/placeholder.svg"}
                    alt={booking.property.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-2/3 md:pl-6">
                  <h3 className="text-xl font-semibold mb-2">{booking.property.name}</h3>
                  <p className="text-gray-600 flex items-center mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {booking.property.address}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-accent mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Check-in</p>
                        <p className="font-medium">{booking.dates.checkIn}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-accent mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Check-out</p>
                        <p className="font-medium">{booking.dates.checkOut}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-accent mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Hóspedes</p>
                        <p className="font-medium">{booking.guests} pessoas</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="w-5 h-5 text-accent mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Pagamento</p>
                        <p className="font-medium">{booking.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <h3 className="font-semibold mb-3">Resumo de Preços</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-600">
                      R${booking.pricing.nightlyRate} x {booking.dates.nights} noites
                    </p>
                    <p className="text-gray-600">R${booking.pricing.nightlyRate * booking.dates.nights}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Taxa de limpeza</p>
                    <p className="text-gray-600">R${booking.pricing.cleaningFee}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Taxa de serviço</p>
                    <p className="text-gray-600">R${booking.pricing.serviceFee}</p>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-gray-200 pt-2 mt-2">
                    <p>Total</p>
                    <p>R${booking.pricing.total}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold mb-3">Seu Anfitrião</h3>
                <div className="flex items-center">
                  <img
                    src={booking.host.avatar || "/placeholder.svg"}
                    alt={booking.host.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="font-medium">{booking.host.name}</p>
                    <p className="text-gray-600 text-sm">Anfitriã desde 2021</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Próximos Passos</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full p-2 mr-3">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Entre em contato com o anfitrião</h3>
                  <p className="text-gray-600 text-sm">
                    Converse com {booking.host.name} para combinar detalhes da sua chegada e tirar dúvidas sobre a
                    propriedade.
                  </p>
                  <Link
                    href="/messages/1"
                    className="text-primary hover:text-primary/80 text-sm font-medium inline-block mt-1"
                  >
                    Enviar mensagem
                  </Link>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full p-2 mr-3">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Prepare-se para sua viagem</h3>
                  <p className="text-gray-600 text-sm">
                    Verifique as informações sobre como chegar ao local e o que levar para sua estadia.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full p-2 mr-3">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Aproveite sua estadia!</h3>
                  <p className="text-gray-600 text-sm">
                    Após o check-in, aproveite sua estadia e não hesite em contatar o anfitrião se precisar de algo.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/dashboard/bookings"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-center"
              >
                Ver Minhas Reservas
              </Link>
              <Link href="/" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-center">
                Voltar para Início
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

