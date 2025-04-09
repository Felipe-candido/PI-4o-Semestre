import MainLayout from "@/components/layout/MainLayout"
import Link from "next/link"
import { Shield, Bell, User, Settings, Users, CheckSquare, FileText, Edit, Activity, BarChart } from "lucide-react"

export default function AdminProfile() {
  // Em uma aplicação real, você obteria os dados do usuário do seu contexto de autenticação
  const userRole = "admin"
  const userName = "Carlos Administrador"
  const userAvatar = "/images/admin-avatar.jpg"

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
                <p className="text-gray-600">Administrador Sênior</p>
                <div className="flex items-center mt-2">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Acesso Total
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <nav className="flex flex-col space-y-2">
                  <Link href="/profile/admin" className="flex items-center p-2 rounded-md bg-primary/10 text-primary">
                    <User className="mr-3 h-5 w-5" />
                    Perfil
                  </Link>
                  <Link href="/admin" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
                    <Settings className="mr-3 h-5 w-5" />
                    Painel Admin
                  </Link>
                  <Link
                    href="/admin/approvals"
                    className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <CheckSquare className="mr-3 h-5 w-5" />
                    Gerenciar Imóveis
                  </Link>
                  <Link
                    href="/admin/users"
                    className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <Users className="mr-3 h-5 w-5" />
                    Gerenciar Usuários
                  </Link>
                  <Link
                    href="/admin/reports"
                    className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <FileText className="mr-3 h-5 w-5" />
                    Relatórios
                  </Link>
                  <Link
                    href="/profile/admin/notifications"
                    className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <Bell className="mr-3 h-5 w-5" />
                    Notificações
                  </Link>
                  <Link
                    href="/profile/admin/security"
                    className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <Shield className="mr-3 h-5 w-5" />
                    Segurança
                  </Link>
                </nav>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold mb-4">Atividade Recente</h3>
              <div className="space-y-3">
                <div className="flex items-start text-sm">
                  <Activity className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800">Aprovação de 3 novas propriedades</p>
                    <p className="text-gray-500 text-xs">Hoje, 10:45</p>
                  </div>
                </div>
                <div className="flex items-start text-sm">
                  <Activity className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800">Revisão de relatórios mensais</p>
                    <p className="text-gray-500 text-xs">Ontem, 14:30</p>
                  </div>
                </div>
                <div className="flex items-start text-sm">
                  <Activity className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800">Resolução de 5 disputas de usuários</p>
                    <p className="text-gray-500 text-xs">2 dias atrás</p>
                  </div>
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
                  <p className="font-medium">Carlos Administrador</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">E-mail</h3>
                  <p className="font-medium">carlos.admin@staycation.com</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Telefone</h3>
                  <p className="font-medium">(11) 99876-5432</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Data de Nascimento</h3>
                  <p className="font-medium">10/03/1978</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Endereço</h3>
                  <p className="font-medium">Rua Augusta, 500 - São Paulo, SP</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">CPF</h3>
                  <p className="font-medium">111.222.333-44</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Cargo</h3>
                  <p className="font-medium">Administrador Sênior</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Membro desde</h3>
                  <p className="font-medium">Janeiro de 2020</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">Estatísticas de Desempenho</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-700">Propriedades Aprovadas</h3>
                    <CheckSquare className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold text-primary">128</p>
                  <p className="text-sm text-gray-500">Últimos 30 dias</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-700">Usuários Gerenciados</h3>
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold text-primary">56</p>
                  <p className="text-sm text-gray-500">Últimos 30 dias</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-700">Disputas Resolvidas</h3>
                    <Shield className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold text-primary">23</p>
                  <p className="text-sm text-gray-500">Últimos 30 dias</p>
                </div>
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">Gráfico de atividade mensal</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">Permissões e Acesso</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <CheckSquare className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Gerenciamento de Propriedades</h3>
                      <p className="text-sm text-gray-500">Aprovar, rejeitar e moderar listagens</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Acesso Total
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Gerenciamento de Usuários</h3>
                      <p className="text-sm text-gray-500">Criar, editar e desativar contas</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Acesso Total
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Relatórios e Análises</h3>
                      <p className="text-sm text-gray-500">Visualizar e exportar dados da plataforma</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Acesso Total
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Settings className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Configurações do Sistema</h3>
                      <p className="text-sm text-gray-500">Modificar parâmetros e configurações</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Acesso Total
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">Histórico de Atividades</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Ação
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Detalhes
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
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        action: "Aprovação de Propriedade",
                        details: "Chalé na Montanha - ID: 12345",
                        date: "15/05/2023 - 10:30",
                        status: "Concluído",
                      },
                      {
                        action: "Resolução de Disputa",
                        details: "Conflito entre hóspede e anfitrião - ID: 7890",
                        date: "12/05/2023 - 14:45",
                        status: "Concluído",
                      },
                      {
                        action: "Suspensão de Usuário",
                        details: "Violação de termos de uso - ID: 5432",
                        date: "10/05/2023 - 09:15",
                        status: "Concluído",
                      },
                      {
                        action: "Geração de Relatório",
                        details: "Relatório mensal de desempenho",
                        date: "01/05/2023 - 08:00",
                        status: "Concluído",
                      },
                      {
                        action: "Atualização de Política",
                        details: "Política de cancelamento atualizada",
                        date: "28/04/2023 - 16:20",
                        status: "Concluído",
                      },
                    ].map((activity, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{activity.details}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{activity.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {activity.status}
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
      </div>
    </MainLayout>
  )
}

