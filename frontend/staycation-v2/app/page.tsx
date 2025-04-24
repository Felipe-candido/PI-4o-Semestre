import Link from "next/link"
import { Search, MapPin, Calendar, Users } from "lucide-react"
import MainLayout from "@/components/layout/MainLayout"
import { apiFetch } from '@/lib/api'

interface UserData {
  id: string
  nome: string
  email: string
  tipo: string
  avatar?: string
}

export default function Home() {
  // In a real app, you would get the user data from your auth context
  const userRole = "visitor"
  const userName = "Visitante"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="relative h-[500px] rounded-xl overflow-hidden mb-12">
          <img src="/images/hero-image.jpg" alt="Belo retiro no campo" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-8 md:px-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Encontre seu lugar <br /> perfeito para descansar
            </h1>
            <p className="text-xl text-white mb-8 max-w-md">
              Descubra e reserve casas de campo, fazendas e retiros rurais únicos para suas próximas férias.
            </p>
            <Link
              href="/search"
              className="bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 px-6 rounded-lg inline-block w-fit"
            >
              Explorar Propriedades
            </Link>
          </div>
        </section>

        {/* Search Bar */}
        <section className="bg-white rounded-xl shadow-lg p-6 mb-12 -mt-24 relative z-10 mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Hóspedes</label>
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
          <div className="mt-4 flex justify-center md:justify-end">
            <Link
              href="/search"
              className="bg-secondary hover:bg-secondary/90 text-white font-semibold py-2 px-6 rounded-lg inline-flex items-center"
            >
              <Search size={18} className="mr-2" />
              Buscar
            </Link>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-primary">Propriedades em Destaque</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                id: 1,
                title: "Chalé na Montanha",
                location: "Serra da Mantiqueira, SP",
                image: "/images/property-1.jpg",
                price: 180,
              },
              {
                id: 2,
                title: "Fazenda Histórica",
                location: "Campos do Jordão, SP",
                image: "/images/property-2.jpg",
                price: 250,
              },
              {
                id: 3,
                title: "Casa de Campo",
                location: "Atibaia, SP",
                image: "/images/property-3.jpg",
                price: 150,
              },
              {
                id: 4,
                title: "Cabana Rústica",
                location: "Monte Verde, MG",
                image: "/images/property-4.jpg",
                price: 120,
              },
            ].map((property) => (
              <Link href={`/properties/${property.id}`} key={property.id} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-64">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-600 hover:text-secondary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-secondary"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm font-medium ml-1">4.9</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      Casa de campo tranquila com vistas incríveis e atividades ao ar livre.
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">
                        R${property.price} <span className="text-gray-600 font-normal text-sm">noite</span>
                      </p>
                      <span className="text-xs text-gray-600">Disponível agora</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/search"
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
        </section>

        {/* Popular Destinations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-primary">Destinos Populares</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "São Paulo",
                image: "/images/destination-sp.jpg",
              },
              {
                name: "Rio de Janeiro",
                image: "/images/destination-rj.jpg",
              },
              {
                name: "Minas Gerais",
                image: "/images/destination-mg.jpg",
              },
            ].map((location) => (
              <Link href="/search" key={location.name} className="group">
                <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
                  <img
                    src={location.image || "/placeholder.svg"}
                    alt={location.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold">{location.name}</h3>
                    <p className="text-white text-sm">Explore propriedades incríveis</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-12 bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-8 text-center text-primary">Por que escolher a StayCation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-accent"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Propriedades Verificadas</h3>
              <p className="text-gray-600">
                Todas as propriedades são verificadas pela nossa equipe para garantir qualidade e precisão.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-accent"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Pagamentos Seguros</h3>
              <p className="text-gray-600">
                Nosso sistema de pagamento é seguro e oferecemos proteção tanto para hóspedes quanto para anfitriões.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-accent"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Suporte 24/7</h3>
              <p className="text-gray-600">
                Nossa equipe de suporte ao cliente está disponível 24/7 para ajudar com qualquer problema.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12 bg-primary rounded-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Pronto para anunciar sua propriedade?</h2>
              <p className="max-w-md">
                Junte-se a milhares de proprietários que estão ganhando renda extra anunciando suas propriedades na
                StayCation.
              </p>
            </div>
            <Link
              href="/auth/register"
              className="bg-secondary text-white hover:bg-secondary/90 font-semibold py-3 px-6 rounded-lg"
            >
              Torne-se um Anfitrião
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}

