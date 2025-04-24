import Link from "next/link"
import MainLayout from "@/components/layout/MainLayout"
import { Search, MapPin, Calendar, Users, Filter, Star } from "lucide-react"

export default function SearchPage() {
  // In a real app, you would get the user data from your auth context
  const userRole = "visitor"
  const userName = "Visitante"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <section className="bg-white rounded-xl shadow-lg p-6 mb-8 sticky top-4 z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Para onde você vai?"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary appearance-none">
                  <option>1 hóspede</option>
                  <option>2 hóspedes</option>
                  <option>3 hóspedes</option>
                  <option>4+ hóspedes</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button className="border border-gray-300 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg inline-flex items-center">
              <Filter size={16} className="mr-2" />
              Filtros
            </button>
            <button className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-6 rounded-lg inline-flex items-center">
              <Search size={18} className="mr-2" />
              Buscar
            </button>
          </div>
        </section>

        {/* Filter Pills */}
        <section className="mb-6 flex flex-wrap gap-2">
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium">
            Preço: R$50-R$200
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium">Piscina</button>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium">
            Churrasqueira
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium">
            Aceita pets
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium">Wi-Fi</button>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium">
            Próximo ao lago
          </button>
        </section>

        {/* Results Count */}
        <section className="mb-6">
          <h1 className="text-2xl font-bold">
            <span className="text-primary">248</span> propriedades encontradas
          </h1>
          <p className="text-gray-600">São Paulo, Brasil • 15-20 de Maio • 2 hóspedes</p>
        </section>

        {/* Search Results */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Link href={`/properties/${item}`} key={item} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col sm:flex-row h-full">
                  <div className="relative h-64 sm:h-auto sm:w-2/5">
                    <img
                      src={`/placeholder.svg?height=300&width=400&text=Propriedade+${item}`}
                      alt={`Propriedade ${item}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-600 hover:text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow sm:w-3/5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">Refúgio Campestre {item}</h3>
                        <p className="text-gray-600 text-sm">São Paulo, Brasil</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-primary fill-current" />
                        <span className="text-sm font-medium ml-1">4.9</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 flex-grow">
                      Casa de campo tranquila com vistas incríveis, atividades ao ar livre e piscina privativa. Perfeito
                      para famílias e grupos.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Piscina</span>
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Churrasqueira</span>
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Wi-Fi</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">
                        R$120 <span className="text-gray-600 font-normal text-sm">noite</span>
                      </p>
                      <span className="text-xs text-gray-600">15-20 de Maio • R$600 total</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
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
              <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                1
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                2
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                3
              </button>
              <span className="mx-2">...</span>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                12
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
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
        </section>
      </div>
    </MainLayout>
  )
}

