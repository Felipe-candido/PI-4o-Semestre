import MainLayout from "@/components/layout/MainLayout"
import { Search, Filter, CheckCircle, XCircle, Eye, Calendar, MapPin } from "lucide-react"

export default function AdminApprovals() {
  // Em uma aplicação real, você obteria os dados do usuário do seu contexto de autenticação
  const userRole = "admin"
  const userName = "Carlos Administrador"
  const userAvatar = "/images/admin-avatar.jpg"

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-primary">Aprovações de Propriedades</h1>
            <p className="text-gray-600">Gerencie e aprove novas listagens de propriedades</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
              <option>Ordenar por: Mais recentes</option>
              <option>Ordenar por: Mais antigos</option>
              <option>Ordenar por: Preço (maior)</option>
              <option>Ordenar por: Preço (menor)</option>
            </select>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar propriedades por nome, localização ou ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                <option>Todos os Tipos</option>
                <option>Casa de Campo</option>
                <option>Chalé</option>
                <option>Fazenda</option>
                <option>Cabana</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                <option>Todos os Status</option>
                <option>Pendentes</option>
                <option>Aprovados</option>
                <option>Rejeitados</option>
              </select>
              <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg inline-flex items-center">
                <Filter size={18} className="mr-2" />
                Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Approval Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Pendentes</h2>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">12</p>
              <p className="ml-2 text-sm text-yellow-600">Aguardando revisão</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Aprovados (Hoje)</h2>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">5</p>
              <p className="ml-2 text-sm text-green-600">Aprovados hoje</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Rejeitados (Hoje)</h2>
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">2</p>
              <p className="ml-2 text-sm text-red-600">Rejeitados hoje</p>
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-6 text-primary">Propriedades Pendentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                id: "PROP-12345",
                name: "Chalé na Montanha",
                location: "Serra da Mantiqueira, SP",
                owner: "Maria Oliveira",
                price: "R$180/noite",
                submitted: "15/05/2023",
                image: "/images/property-1.jpg",
              },
              {
                id: "PROP-12346",
                name: "Fazenda Histórica",
                location: "Campos do Jordão, SP",
                owner: "João Pereira",
                price: "R$250/noite",
                submitted: "14/05/2023",
                image: "/images/property-2.jpg",
              },
              {
                id: "PROP-12347",
                name: "Casa de Campo",
                location: "Atibaia, SP",
                owner: "Ana Costa",
                price: "R$150/noite",
                submitted: "13/05/2023",
                image: "/images/property-3.jpg",
              },
              {
                id: "PROP-12348",
                name: "Cabana Rústica",
                location: "Monte Verde, MG",
                owner: "Pedro Santos",
                price: "R$120/noite",
                submitted: "12/05/2023",
                image: "/images/property-4.jpg",
              },
            ].map((property, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{property.name}</h3>
                        <p className="text-gray-600 text-sm flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {property.location}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        Pendente
                      </span>
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm">
                        <span className="font-medium">ID:</span> {property.id}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Proprietário:</span> {property.owner}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Preço:</span> {property.price}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Enviado em:</span> {property.submitted}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex items-center px-3 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary/90">
                        <Eye className="w-4 h-4 mr-1" />
                        Revisar
                      </button>
                      <button className="flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Aprovar
                      </button>
                      <button className="flex items-center px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                        <XCircle className="w-4 h-4 mr-1" />
                        Rejeitar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Carregar Mais</button>
          </div>
        </div>

        {/* Recent Approvals */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-6 text-primary">Aprovações Recentes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
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
                    Proprietário
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
                    Revisor
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
                    property: "Chalé Pinheiros",
                    owner: "Roberto Alves",
                    date: "15/05/2023",
                    reviewer: "Carlos Administrador",
                    status: "Aprovado",
                  },
                  {
                    property: "Sítio Verde Vale",
                    owner: "Juliana Mendes",
                    date: "15/05/2023",
                    reviewer: "Carlos Administrador",
                    status: "Aprovado",
                  },
                  {
                    property: "Cabana do Lago",
                    owner: "Fernando Costa",
                    date: "14/05/2023",
                    reviewer: "Carlos Administrador",
                    status: "Aprovado",
                  },
                  {
                    property: "Fazenda Estrela",
                    owner: "Mariana Santos",
                    date: "14/05/2023",
                    reviewer: "Carlos Administrador",
                    status: "Rejeitado",
                  },
                  {
                    property: "Chalé das Araucárias",
                    owner: "Paulo Oliveira",
                    date: "13/05/2023",
                    reviewer: "Carlos Administrador",
                    status: "Aprovado",
                  },
                ].map((approval, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{approval.property}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{approval.owner}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{approval.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{approval.reviewer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          approval.status === "Aprovado" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {approval.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

