import MainLayout from "@/components/layout/MainLayout"
import Link from "next/link"
import { Calendar, MapPin, Star, Edit, Shield, Bell, CreditCard, User, Home, DollarSign, Settings } from "lucide-react"

export default function OwnerProfile() {
  // Em uma aplicação real, você obteria os dados do usuário do seu contexto de autenticação
  const userRole = "owner"
  const userName = "Maria Oliveira"
  const userAvatar = "/images/owner-avatar.jpg"

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col items-center text-center mb-6">
                <img
                  src={userAvatar || "/placeholder.svg"}
                  alt={userName}
                  className="w-24 h-24 rounded-full mb-4 object-cover"
                />
                <h2 className="text-xl font-bold">{userName}</h2>
                <p className="text-gray-600">Anfitriã desde 2021</p>
                <div className="flex items-center mt-2">
                  <Star className="w-4 h-4 text-secondary fill-current" />
                  <span className="ml-1 text-sm">4.95 (32 avaliações)</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <nav className="flex flex-col space-y-2">
                  <Link href="/profile/owner" className="flex items-center p-2 rounded-md bg-primary/10 text-primary">
                    <User className="mr-3 h-5 w-5" />
                    Perfil
                  </Link>
                  <Link href="/dashboard" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
                    <Settings className="mr-3 h-5 w-5" />
                    Painel
                  </Link>
                  <Link
                    href="/dashboard/properties"
                    className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <Home className="mr-3 h-5 w-5" />
                    Meus Imóveis
                  </Link>
                  <Link
                    href="/dashboard/bookings"
                    className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <Calendar className="mr-3 h-5 w-5" />
                    Reservas
                  </Link>
                  <Link
                    href="/dashboard/earnings"
                    className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <DollarSign className="mr-3 h-5 w-5" />
                    Ganhos
                  </Link>
                  <Link
                    href="/profile/owner/payments"
                    className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <CreditCard className="mr-3 h-5 w-5" />
                    Pagamentos
                  </Link>
                  <Link
                    href="/profile/owner/notifications"
                    className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <Bell className="mr-3 h-5 w-5" />
                    Notificações
                  </Link>
                  <Link
                    href="/profile/owner/security"
                    className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <Shield className="mr-3 h-5 w-5" />
                    Segurança
                  </Link>
                </nav>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold mb-4">Verificações</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-green-500 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Identidade verificada
                </div>
                <div className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-green-500 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  E-mail verificado
                </div>
                <div className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-green-500 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Telefone verificado
                </div>
                <div className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-green-500 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Documentos do imóvel verificados
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary">Informações Pessoais</h2>
                <button className="flex items-center text-secondary hover:text-secondary/80">
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Nome Completo</h3>
                  <p className="font-medium">Maria Oliveira</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">E-mail</h3>
                  <p className="font-medium">maria.oliveira@email.com</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Telefone</h3>
                  <p className="font-medium">(11) 97654-3210</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Data de Nascimento</h3>
                  <p className="font-medium">22/08/1980</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Endereço</h3>
                  <p className="font-medium">Av. Paulista, 1000 - São Paulo, SP</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">CPF</h3>
                  <p className="font-medium">987.654.321-00</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Dados Bancários</h3>
                  <p className="font-medium">Banco 001 - Ag. 1234 - CC 56789-0</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Membro desde</h3>
                  <p className="font-medium">Março de 2021</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary">Minhas Propriedades</h2>
                <Link
                  href="/dashboard/properties/new"
                  className="bg-secondary hover:bg-secondary/90 text-white font-semibold py-2 px-4 rounded-lg text-sm"
                >
                  Adicionar Propriedade
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 flex">
                  <div className="w-1/3">
                    <img
                      src="/images/property-1.jpg"
                      alt="Chalé na Montanha"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-2/3 pl-4">
                    <h3 className="font-semibold">Chalé na Montanha</h3>
                    <p className="text-gray-600 text-sm flex items-center mb-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      Serra da Mantiqueira, SP
                    </p>
                    <div className="flex items-center text-sm mb-2">
                      <Star className="w-4 h-4 text-secondary fill-current" />
                      <span className="ml-1">4.9 (18 avaliações)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">R$180/noite</span>
                      <Link href="/dashboard/properties/1" className="text-primary hover:text-primary/80 text-sm">
                        Gerenciar
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 flex">
                  <div className="w-1/3">
                    <img
                      src="/images/property-2.jpg"
                      alt="Fazenda Histórica"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-2/3 pl-4">
                    <h3 className="font-semibold">Fazenda Histórica</h3>
                    <p className="text-gray-600 text-sm flex items-center mb-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      Campos do Jordão, SP
                    </p>
                    <div className="flex items-center text-sm mb-2">
                      <Star className="w-4 h-4 text-secondary fill-current" />
                      <span className="ml-1">4.8 (12 avaliações)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">R$250/noite</span>
                      <Link href="/dashboard/properties/2" className="text-primary hover:text-primary/80 text-sm">
                        Gerenciar
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 flex">
                  <div className="w-1/3">
                    <img
                      src="/images/property-3.jpg"
                      alt="Casa de Campo"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-2/3 pl-4">
                    <h3 className="font-semibold">Casa de Campo</h3>
                    <p className="text-gray-600 text-sm flex items-center mb-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      Atibaia, SP
                    </p>
                    <div className="flex items-center text-sm mb-2">
                      <Star className="w-4 h-4 text-secondary fill-current" />
                      <span className="ml-1">4.7 (9 avaliações)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">R$150/noite</span>
                      <Link href="/dashboard/properties/3" className="text-primary hover:text-primary/80 text-sm">
                        Gerenciar
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link
                  href="/dashboard/properties"
                  className="text-secondary hover:text-secondary/80 font-semibold inline-flex items-center"
                >
                  Ver todas as propriedades
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 ml-1"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">Avaliações Recentes</h2>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-start mb-4">
                    <img
                      src="/images/tenant-avatar.jpg"
                      alt="João Locatário"
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">João (Hóspede)</h3>
                      <p className="text-gray-600 text-sm">Chalé na Montanha • Maio 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= 5 ? "text-secondary fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">
                    Lugar incrível! O chalé é exatamente como nas fotos, muito limpo e aconchegante. A Maria foi uma
                    anfitriã excepcional, sempre disponível para ajudar e deu ótimas dicas de passeios na região.
                    Recomendo muito e certamente voltarei!
                  </p>
                </div>

                <div>
                  <div className="flex items-start mb-4">
                    <img
                      src="/images/tenant-avatar-2.jpg"
                      alt="Ana Locatária"
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">Ana (Hóspede)</h3>
                      <p className="text-gray-600 text-sm">Fazenda Histórica • Abril 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= 5 ? "text-secondary fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">
                    A fazenda é um lugar mágico! Muito bem preservada, com uma decoração que nos transporta para outra
                    época. A Maria nos recebeu com muito carinho e atenção. O café da manhã é delicioso, com produtos
                    frescos da região. Experiência inesquecível!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

