import MainLayout from "@/components/layout/MainLayout"
import Link from "next/link"
import { Calendar, Star, Edit, Shield, Bell, CreditCard, User, Download, Filter, Search } from "lucide-react"

export default function TenantPayments() {
  // Em uma aplicação real, você obteria os dados do usuário do seu contexto de autenticação
  const userRole = "tenant"
  const userName = "João Silva"
  const userAvatar = "/images/tenant-avatar.jpg"

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
                <p className="text-gray-600">Locatário desde 2022</p>
                <div className="flex items-center mt-2">
                  <Star className="w-4 h-4 text-secondary fill-current" />
                  <span className="ml-1 text-sm">4.9 (15 avaliações)</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <nav className="flex flex-col space-y-2">
                  <Link
                    href="/profile/tenant"
                    className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <User className="mr-3 h-5 w-5" />
                    Perfil
                  </Link>
                  <Link
                    href="/dashboard/bookings"
                    className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <Calendar className="mr-3 h-5 w-5" />
                    Minhas Reservas
                  </Link>
                  <Link
                    href="/profile/tenant/payments"
                    className="flex items-center p-2 rounded-md bg-primary/10 text-primary"
                  >
                    <CreditCard className="mr-3 h-5 w-5" />
                    Pagamentos
                  </Link>
                  <Link
                    href="/profile/tenant/notifications"
                    className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <Bell className="mr-3 h-5 w-5" />
                    Notificações
                  </Link>
                  <Link
                    href="/profile/tenant/security"
                    className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <Shield className="mr-3 h-5 w-5" />
                    Segurança
                  </Link>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary">Métodos de Pagamento</h2>
                <button className="flex items-center text-secondary hover:text-secondary/80 font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-1"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Adicionar Novo
                </button>
              </div>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <CreditCard className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Cartão de Crédito</h3>
                      <p className="text-gray-600 text-sm">**** **** **** 4321 | Expira em 05/25</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Principal
                    </span>
                    <button className="text-gray-500 hover:text-gray-700">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <CreditCard className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Cartão de Débito</h3>
                      <p className="text-gray-600 text-sm">**** **** **** 8765 | Expira em 09/24</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary">Histórico de Pagamentos</h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Buscar pagamentos..."
                      className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <button className="flex items-center text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <Filter className="w-4 h-4 mr-1" />
                    Filtrar
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Propriedade
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Data
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Valor
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        id: "PAG-12345",
                        property: "Chalé na Montanha",
                        date: "15/05/2023",
                        amount: "R$1.090,00",
                        status: "Pago",
                      },
                      {
                        id: "PAG-12346",
                        property: "Casa de Campo",
                        date: "10/04/2023",
                        amount: "R$750,00",
                        status: "Pago",
                      },
                      {
                        id: "PAG-12347",
                        property: "Cabana Rústica",
                        date: "05/03/2023",
                        amount: "R$620,00",
                        status: "Pago",
                      },
                      {
                        id: "PAG-12348",
                        property: "Fazenda Histórica",
                        date: "20/02/2023",
                        amount: "R$1.250,00",
                        status: "Pago",
                      },
                      {
                        id: "PAG-12349",
                        property: "Chalé na Montanha",
                        date: "15/01/2023",
                        amount: "R$900,00",
                        status: "Pago",
                      },
                    ].map((payment, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{payment.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{payment.property}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{payment.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{payment.amount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary hover:text-primary/80 mr-3 flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            Recibo
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">Mostrando 5 de 12 pagamentos</p>
                <div className="flex items-center space-x-2">
                  <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                    1
                  </button>
                  <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                    2
                  </button>
                  <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                    3
                  </button>
                  <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">Fatura Atual</h2>
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-lg">Chalé na Montanha</h3>
                    <p className="text-gray-600 text-sm">Reserva para 20/06/2023 - 25/06/2023</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      Pendente
                    </span>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <p className="text-gray-600">R$180 x 5 noites</p>
                    <p className="text-gray-600">R$900,00</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Taxa de limpeza</p>
                    <p className="text-gray-600">R$100,00</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Taxa de serviço</p>
                    <p className="text-gray-600">R$90,00</p>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-gray-200 pt-2 mt-2">
                    <p>Total</p>
                    <p>R$1.090,00</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Vencimento: 15/06/2023</p>
                  <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90">
                    Pagar Agora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

