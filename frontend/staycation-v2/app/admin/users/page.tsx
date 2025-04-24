import MainLayout from "@/components/layout/MainLayout"
import { Search, Filter, User, Edit, Trash2, UserPlus, Download, MoreHorizontal, Shield } from "lucide-react"

export default function AdminUsers() {
  // Em uma aplicação real, você obteria os dados do usuário do seu contexto de autenticação
  const userRole = "admin"
  const userName = "Carlos Administrador"
  const userAvatar = "/images/admin-avatar.jpg"

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-primary">Gerenciamento de Usuários</h1>
            <p className="text-gray-600">Gerencie todos os usuários da plataforma</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <button className="flex items-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90">
              <UserPlus className="w-5 h-5 mr-2" />
              Adicionar Usuário
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <Download className="w-5 h-5 mr-2" />
              Exportar
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar usuários por nome, email ou ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                <option>Todos os Tipos</option>
                <option>Locatários</option>
                <option>Proprietários</option>
                <option>Administradores</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                <option>Todos os Status</option>
                <option>Ativos</option>
                <option>Inativos</option>
                <option>Pendentes</option>
                <option>Bloqueados</option>
              </select>
              <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg inline-flex items-center">
                <Filter size={18} className="mr-2" />
                Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Usuário
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tipo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Data de Registro
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
                    name: "João Silva",
                    email: "joao.silva@email.com",
                    type: "Locatário",
                    registrationDate: "15/05/2022",
                    status: "Ativo",
                    avatar: "/images/tenant-avatar.jpg",
                  },
                  {
                    name: "Maria Oliveira",
                    email: "maria.oliveira@email.com",
                    type: "Proprietário",
                    registrationDate: "22/03/2021",
                    status: "Ativo",
                    avatar: "/images/owner-avatar.jpg",
                  },
                  {
                    name: "Pedro Santos",
                    email: "pedro.santos@email.com",
                    type: "Locatário",
                    registrationDate: "10/07/2022",
                    status: "Inativo",
                    avatar: "/images/tenant-avatar-2.jpg",
                  },
                  {
                    name: "Ana Costa",
                    email: "ana.costa@email.com",
                    type: "Proprietário",
                    registrationDate: "05/01/2022",
                    status: "Ativo",
                    avatar: "/images/owner-avatar-2.jpg",
                  },
                  {
                    name: "Lucas Ferreira",
                    email: "lucas.ferreira@email.com",
                    type: "Locatário",
                    registrationDate: "18/09/2022",
                    status: "Bloqueado",
                    avatar: "/placeholder.svg?height=40&width=40&text=LF",
                  },
                  {
                    name: "Juliana Mendes",
                    email: "juliana.mendes@email.com",
                    type: "Proprietário",
                    registrationDate: "30/11/2021",
                    status: "Pendente",
                    avatar: "/placeholder.svg?height=40&width=40&text=JM",
                  },
                  {
                    name: "Roberto Almeida",
                    email: "roberto.almeida@staycation.com",
                    type: "Administrador",
                    registrationDate: "05/02/2020",
                    status: "Ativo",
                    avatar: "/images/admin-avatar.jpg",
                  },
                  {
                    name: "Camila Rodrigues",
                    email: "camila.rodrigues@email.com",
                    type: "Locatário",
                    registrationDate: "12/04/2023",
                    status: "Ativo",
                    avatar: "/placeholder.svg?height=40&width=40&text=CR",
                  },
                ].map((user, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={user.avatar || "/placeholder.svg"}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm ${
                          user.type === "Administrador" ? "text-primary font-medium" : "text-gray-900"
                        }`}
                      >
                        {user.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.registrationDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === "Ativo"
                            ? "bg-green-100 text-green-800"
                            : user.status === "Inativo"
                              ? "bg-gray-100 text-gray-800"
                              : user.status === "Pendente"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-primary hover:text-primary/80">
                          <Edit className="w-5 h-5" />
                        </button>
                        {user.type !== "Administrador" && (
                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                        <div className="relative group">
                          <button className="text-gray-500 hover:text-gray-700">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Ver detalhes
                            </a>
                            {user.status === "Ativo" ? (
                              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Desativar conta
                              </a>
                            ) : (
                              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Ativar conta
                              </a>
                            )}
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Redefinir senha
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Mostrando <span className="font-medium">1</span> a <span className="font-medium">8</span> de{" "}
                <span className="font-medium">24</span> resultados
              </div>
              <div className="flex items-center space-x-2">
                <button className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
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
                <button className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center">1</button>
                <button className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  2
                </button>
                <button className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  3
                </button>
                <span className="mx-1">...</span>
                <button className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  8
                </button>
                <button className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
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
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Total de Usuários</h2>
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">1,245</p>
              <p className="ml-2 text-sm text-green-600 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                  />
                </svg>
                15%
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-1">Comparado ao mês anterior</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Locatários</h2>
              <div className="p-2 bg-secondary/10 rounded-lg">
                <User className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">856</p>
              <p className="ml-2 text-sm text-green-600 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                  />
                </svg>
                12%
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-1">Comparado ao mês anterior</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Proprietários</h2>
              <div className="p-2 bg-accent/10 rounded-lg">
                <User className="h-6 w-6 text-accent" />
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">384</p>
              <p className="ml-2 text-sm text-green-600 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                  />
                </svg>
                8%
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-1">Comparado ao mês anterior</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Administradores</h2>
              <div className="p-2 bg-highlight/10 rounded-lg">
                <Shield className="h-6 w-6 text-highlight" />
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">5</p>
              <p className="ml-2 text-sm text-gray-600 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
                0%
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-1">Sem alteração</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-6 text-primary">Atividade Recente</h2>
          <div className="space-y-6">
            {[
              {
                action: "Usuário criado",
                user: "Camila Rodrigues",
                date: "12/04/2023 - 10:15",
                details: "Novo usuário registrado como locatário",
              },
              {
                action: "Usuário bloqueado",
                user: "Lucas Ferreira",
                date: "10/04/2023 - 14:30",
                details: "Usuário bloqueado por violação dos termos de uso",
              },
              {
                action: "Usuário atualizado",
                user: "Maria Oliveira",
                date: "08/04/2023 - 09:45",
                details: "Informações de perfil atualizadas",
              },
              {
                action: "Senha redefinida",
                user: "Pedro Santos",
                date: "05/04/2023 - 16:20",
                details: "Senha redefinida a pedido do usuário",
              },
              {
                action: "Usuário desativado",
                user: "Ana Costa",
                date: "01/04/2023 - 11:10",
                details: "Conta desativada temporariamente",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{activity.action}</h4>
                      <p className="text-sm text-gray-600">{activity.user}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

