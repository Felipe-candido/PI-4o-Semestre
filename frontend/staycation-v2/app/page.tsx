"use client"

import Link from "next/link"
import { Search, MapPin, Calendar, Users } from "lucide-react"
import MainLayout from "@/components/layout/MainLayout"
import { apiFetch } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

interface UserData {
  id: string
  nome: string
  email: string
  tipo: string
  avatar?: string
}

interface Imovel {
  id: number
  titulo: string
  descricao: string
  preco: number
  endereco: {
    cidade: string
    estado: string
  }
  imagens: Array<{
    id: number
    imagem: string
    legenda: string
  }>
  media_avaliacoes: number
  total_avaliacoes: number
  proprietario_nome: string
}

export default function Home() {
  const router = useRouter()
  const [cidade, setCidade] = useState('')
  const [valorMaximo, setValorMaximo] = useState('')
  const [imoveisDestaque, setImoveisDestaque] = useState<Imovel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImoveisDestaque = async () => {
      try {
        console.log('Iniciando busca de imóveis em destaque...')
        const response = await apiFetch('/api/imoveis/destaque/')
        console.log('Resposta da API:', response)
        
        if (!response) {
          console.error('Resposta da API é undefined')
          return
        }

        // Verifica se a resposta é um objeto Response
        if (response instanceof Response) {
          if (response.ok) {
            const data = await response.json()
            console.log('Dados recebidos da API:', data)
            setImoveisDestaque(data)
          } else {
            console.error('Erro na resposta da API:', {
              status: response.status,
              statusText: response.statusText
            })
          }
        } else {
          // Se a resposta não for um objeto Response, assume que é o dado direto
          console.log('Dados recebidos da API:', response)
          setImoveisDestaque(response)
        }
      } catch (error) {
        console.error('Erro ao buscar imóveis em destaque:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchImoveisDestaque()
  }, [])

  const handleSearch = () => {
    const searchParams = new URLSearchParams()
    if (cidade) searchParams.append('cidade', cidade)
    if (valorMaximo) searchParams.append('valor_maximo', valorMaximo)
    router.push(`/search?${searchParams.toString()}`)
  }

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
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Descubra acomodações únicas em todo o Brasil. De casas de campo a chacaras e edículas na cidade, encontre o lugar ideal para sua próxima aventura.
            </p>
            <Link
              href="/search"
              className="bg-secondary hover:bg-secondary/90 text-white text-xl font-semibold py-4 px-8 rounded-lg inline-block w-fit transition-all duration-300 hover:scale-105"
            >
              Explorar Propriedades
            </Link>
          </div>
        </section>

        {/* Search Section */}
       

        {/* Featured Properties */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-primary">Propriedades em Destaque</h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando propriedades em destaque...</p>
            </div>
          ) : imoveisDestaque.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Nenhuma propriedade em destaque no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {imoveisDestaque.map((imovel) => (
                <Link href={`/properties/${imovel.id}`} key={imovel.id} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-64">
                      <img
                        src={imovel.imagens[0]?.imagem || "/placeholder.svg"}
                        alt={imovel.titulo}
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
                          <h3 className="font-semibold text-lg mb-1">{imovel.titulo}</h3>
                          <p className="text-gray-600 text-sm mb-2">{imovel.endereco.cidade}, {imovel.endereco.estado}</p>
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
                          <svg
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-semibold">
                          R${imovel.preco} <span className="text-gray-600 font-normal text-sm">noite</span>
                        </p>
                        <span className="text-xs text-gray-600">Disponível agora</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
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

