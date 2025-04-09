import MainLayout from "@/components/layout/MainLayout"
import Link from "next/link"
import { Calendar, Star, Shield, Bell, CreditCard, User, Lock, Smartphone, Key, AlertTriangle } from "lucide-react"

export default function TenantSecurity() {
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
                    className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
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
                    className="flex items-center p-2 rounded-md bg-primary/10 text-primary"
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
                <h2 className="text-2xl font-bold text-primary">Segurança da Conta</h2>
                <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  Protegida
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Senha</h3>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Lock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Senha da conta</p>
                        <p className="text-gray-500 text-sm">Última alteração: 3 meses atrás</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary/90">
                      Alterar
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Verificação em duas etapas</h3>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Smartphone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Autenticação por SMS</p>
                        <p className="text-gray-500 text-sm">Ativada para (11) 98765-4321</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                      Gerenciar
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Dispositivos Conectados</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 text-primary"
                          >
                            <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
                            <path
                              fillRule="evenodd"
                              d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">iPhone 13</p>
                          <p className="text-gray-500 text-sm">São Paulo, Brasil • Ativo agora</p>
                        </div>
                      </div>
                      <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Este dispositivo</div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 text-primary"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v9.75c0 .83.67 1.5 1.5 1.5h13.5c.83 0 1.5-.67 1.5-1.5V5.25c0-.83-.67-1.5-1.5-1.5H5.25c-.83 0-1.5.67-1.5 1.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">MacBook Pro</p>
                          <p className="text-gray-500 text-sm">São Paulo, Brasil • Último acesso: ontem</p>
                        </div>
                      </div>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">Remover</button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Histórico de Login</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Data e Hora
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Dispositivo
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Localização
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[
                          {
                            date: "15/05/2023, 10:30",
                            device: "iPhone 13",
                            location: "São Paulo, Brasil",
                            status: "Sucesso",
                          },
                          {
                            date: "14/05/2023, 18:45",
                            device: "MacBook Pro",
                            location: "São Paulo, Brasil",
                            status: "Sucesso",
                          },
                          {
                            date: "10/05/2023, 09:15",
                            device: "Chrome em Windows",
                            location: "Rio de Janeiro, Brasil",
                            status: "Sucesso",
                          },
                          {
                            date: "05/05/2023, 22:10",
                            device: "Dispositivo desconhecido",
                            location: "Lisboa, Portugal",
                            status: "Bloqueado",
                          },
                          {
                            date: "01/05/2023, 14:30",
                            device: "iPhone 13",
                            location: "São Paulo, Brasil",
                            status: "Sucesso",
                          },
                        ].map((login, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{login.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{login.device}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{login.location}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  login.status === "Sucesso" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}
                              >
                                {login.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">Configurações Avançadas</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Chaves de Acesso</h3>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Key className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Chaves de segurança</p>
                        <p className="text-gray-500 text-sm">Adicione uma chave física para maior segurança</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary/90">
                      Configurar
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Exclusão de Conta</h3>
                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">Excluir minha conta</p>
                        <p className="text-gray-600 text-sm">Esta ação é irreversível e excluirá todos os seus dados</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

