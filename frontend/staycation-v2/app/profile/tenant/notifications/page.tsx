import MainLayout from "@/components/layout/MainLayout"
import Link from "next/link"
import { Calendar, Star, Shield, Bell, CreditCard, User, Settings, MessageSquare, Home } from "lucide-react"

export default function TenantNotifications() {
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
                    className="flex items-center p-2 rounded-md bg-primary/10 text-primary"
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
                <h2 className="text-2xl font-bold text-primary">Notificações</h2>
                <div className="flex items-center space-x-2">
                  <button className="text-sm text-primary hover:text-primary/80 font-medium">
                    Marcar todas como lidas
                  </button>
                  <button className="text-sm text-gray-600 hover:text-gray-800 font-medium">Configurações</button>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Não lidas</h3>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">3 novas</span>
                </div>
                <div className="space-y-4">
                  <div className="border-l-4 border-secondary bg-secondary/5 p-4 rounded-r-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <Calendar className="w-6 h-6 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Lembrete de Check-in</h4>
                          <span className="text-xs text-gray-500">Hoje, 09:30</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          Seu check-in no Chalé na Montanha está agendado para amanhã. Não se esqueça de levar seus
                          documentos!
                        </p>
                        <div className="mt-2 flex items-center">
                          <Link
                            href="/dashboard/bookings/1"
                            className="text-secondary hover:text-secondary/80 text-sm font-medium"
                          >
                            Ver detalhes da reserva
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-secondary bg-secondary/5 p-4 rounded-r-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <MessageSquare className="w-6 h-6 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Nova mensagem do anfitrião</h4>
                          <span className="text-xs text-gray-500">Ontem, 18:45</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          Maria enviou uma mensagem sobre sua próxima estadia no Chalé na Montanha.
                        </p>
                        <div className="mt-2 flex items-center">
                          <button className="text-secondary hover:text-secondary/80 text-sm font-medium">
                            Ler mensagem
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-secondary bg-secondary/5 p-4 rounded-r-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <CreditCard className="w-6 h-6 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Pagamento confirmado</h4>
                          <span className="text-xs text-gray-500">2 dias atrás</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          Seu pagamento de R$1.090,00 para a reserva no Chalé na Montanha foi confirmado.
                        </p>
                        <div className="mt-2 flex items-center">
                          <Link
                            href="/profile/tenant/payments"
                            className="text-secondary hover:text-secondary/80 text-sm font-medium"
                          >
                            Ver detalhes do pagamento
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Anteriores</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <Home className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Reserva confirmada</h4>
                          <span className="text-xs text-gray-500">1 semana atrás</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          Sua reserva no Chalé na Montanha foi confirmada pelo anfitrião.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 p-4 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <Star className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Avaliação solicitada</h4>
                          <span className="text-xs text-gray-500">2 semanas atrás</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          Sua estadia na Casa de Campo foi concluída. Compartilhe sua experiência avaliando o local.
                        </p>
                        <div className="mt-2 flex items-center">
                          <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                            Avaliar agora
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 p-4 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <Settings className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Atualização de termos</h4>
                          <span className="text-xs text-gray-500">1 mês atrás</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          Atualizamos nossos termos de serviço e política de privacidade. Por favor, revise as mudanças.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">Preferências de Notificação</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <MessageSquare className="w-5 h-5 text-primary mr-3" />
                    <span>Mensagens</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary" checked />
                      <span className="ml-2 text-sm">Email</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary" checked />
                      <span className="ml-2 text-sm">App</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary" checked />
                      <span className="ml-2 text-sm">SMS</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-primary mr-3" />
                    <span>Reservas</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary" checked />
                      <span className="ml-2 text-sm">Email</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary" checked />
                      <span className="ml-2 text-sm">App</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary" checked />
                      <span className="ml-2 text-sm">SMS</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-primary mr-3" />
                    <span>Pagamentos</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary" checked />
                      <span className="ml-2 text-sm">Email</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary" checked />
                      <span className="ml-2 text-sm">App</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary" checked />
                      <span className="ml-2 text-sm">SMS</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Bell className="w-5 h-5 text-primary mr-3" />
                    <span>Promoções e Novidades</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                      <span className="ml-2 text-sm">Email</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary" checked />
                      <span className="ml-2 text-sm">App</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                      <span className="ml-2 text-sm">SMS</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                  Salvar Preferências
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

