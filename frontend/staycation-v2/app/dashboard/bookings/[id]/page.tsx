import Link from "next/link"
import MainLayout from "@/components/layout/MainLayout"
import { Calendar, MapPin, User, Phone, Mail, Home, CreditCard, MessageSquare, Download, Printer } from "lucide-react"

export default function BookingDetails({ params }: { params: { id: string } }) {
  // Em uma aplicação real, você obteria os dados do usuário e da reserva do seu contexto/API
  const userRole = "tenant"
  const userName = "João Silva"
  const userAvatar = "/images/tenant-avatar.jpg"

  // Dados simulados da reserva
  const booking = {
    id: params.id,
    status: "Confirmado",
    checkIn: "20/06/2023",
    checkOut: "25/06/2023",
    guests: 2,
    nights: 5,
    property: {
      name: "Chalé na Montanha",
      address: "Estrada da Serra, km 15 - Serra da Mantiqueira, SP",
      image: "/images/property-1.jpg",
    },
    host: {
      name: "Maria Oliveira",
      phone: "(11) 97654-3210",
      email: "maria.oliveira@email.com",
      avatar: "/images/owner-avatar.jpg",
    },
    pricing: {
      nightlyRate: 180,
      cleaningFee: 100,
      serviceFee: 90,
      total: 1090,
    },
    paymentMethod: "Cartão de crédito (final 4321)",
    paymentStatus: "Pago",
    bookingDate: "15/05/2023",
  }

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard/bookings" className="text-primary hover:text-primary/80 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Voltar para Reservas
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Detalhes da Reserva */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-primary">Detalhes da Reserva #{booking.id}</h1>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {booking.status}
                </span>
              </div>

              <div className="flex flex-col md:flex-row mb-6">
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <img
                    src={booking.property.image || "/placeholder.svg"}
                    alt={booking.property.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-2/3 md:pl-6">
                  <h2 className="text-xl font-semibold mb-2">{booking.property.name}</h2>
                  <p className="text-gray-600 flex items-center mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {booking.property.address}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-accent mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Check-in</p>
                        <p className="font-medium">{booking.checkIn}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-accent mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Check-out</p>
                        <p className="font-medium">{booking.checkOut}</p>
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
                      <Home className="w-5 h-5 text-accent mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Estadia</p>
                        <p className="font-medium">{booking.nights} noites</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Informações do Anfitrião</h3>
                <div className="flex items-center">
                  <img
                    src={booking.host.avatar || "/placeholder.svg"}
                    alt={booking.host.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="font-medium">{booking.host.name}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 mt-1">
                      <div className="flex items-center mr-4">
                        <Phone className="w-4 h-4 mr-1" />
                        {booking.host.phone}
                      </div>
                      <div className="flex items-center mt-1 sm:mt-0">
                        <Mail className="w-4 h-4 mr-1" />
                        {booking.host.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4">Regras e Informações</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Horários</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>Check-in: a partir das 15:00</li>
                      <li>Check-out: até 11:00</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Regras da Casa</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>Não é permitido fumar</li>
                      <li>Não são permitidas festas</li>
                      <li>Animais de estimação são permitidos</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Detalhes do Pagamento</h3>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <CreditCard className="w-5 h-5 text-accent mr-2" />
                  <p className="font-medium">Método de Pagamento</p>
                </div>
                <p className="text-gray-600 ml-7">{booking.paymentMethod}</p>
              </div>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <p className="text-gray-600">
                    R${booking.pricing.nightlyRate} x {booking.nights} noites
                  </p>
                  <p className="text-gray-600">R${booking.pricing.nightlyRate * booking.nights}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-gray-600">Taxa de limpeza</p>
                  <p className="text-gray-600">R${booking.pricing.cleaningFee}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-gray-600">Taxa de serviço</p>
                  <p className="text-gray-600">R${booking.pricing.serviceFee}</p>
                </div>
                <div className="flex justify-between font-semibold border-t border-gray-200 pt-2 mt-2">
                  <p>Total</p>
                  <p>R${booking.pricing.total}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {booking.paymentStatus}
                </div>
                <p className="text-sm text-gray-500 ml-2">em {booking.bookingDate}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Ações</h3>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contatar Anfitrião
                </button>
                <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Recibo
                </button>
                <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimir Detalhes
                </button>
                <button className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                  Cancelar Reserva
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Resumo da Reserva</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-accent mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Data da Reserva</p>
                    <p className="font-medium">{booking.bookingDate}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-accent mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Check-in</p>
                    <p className="font-medium">{booking.checkIn} (a partir das 15:00)</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-accent mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Check-out</p>
                    <p className="font-medium">{booking.checkOut} (até 11:00)</p>
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
                  <Home className="w-5 h-5 text-accent mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Propriedade</p>
                    <p className="font-medium">{booking.property.name}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 text-accent mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Total Pago</p>
                    <p className="font-medium">R${booking.pricing.total}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium mb-3">Política de Cancelamento</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Cancelamento gratuito até 5 dias antes do check-in. Após esse período, será cobrada uma taxa de 50% do
                  valor total da reserva.
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Status</p>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Precisa de Ajuda?</h3>
              <p className="text-gray-600 mb-4">
                Se você tiver alguma dúvida ou precisar de assistência com sua reserva, nossa equipe de suporte está
                disponível 24/7.
              </p>
              <button className="w-full flex items-center justify-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contatar Suporte
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

