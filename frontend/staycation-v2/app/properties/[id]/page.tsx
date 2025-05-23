'use client'

import Link from "next/link"
import MainLayout from "@/components/layout/MainLayout"
import { Star, MapPin, Wifi, Tv, Utensils, Car, Wind, PawPrint } from "lucide-react"
import { useState, useEffect, JSX } from "react"
import { useParams } from 'next/navigation'
import { number } from "zod"

interface Comodidade {
  id: number
  nome: string
}

interface Imovel {
  id: number
  titulo: string
  descricao: string
  preco: number
  numero_hospedes: number
  endereco: {
    cidade: string
    estado: string
    numero: number
    bairro: string
  }
  logo?: string
  imagens: { imagem: string; legenda: string }[]
  comodidades: Comodidade[]
}


export default function PropertyDetails() {
  const { id } = useParams()
  const [imovel, setImovel] = useState<Imovel | null>(null)


  const iconesPorComodidade: Record<string, JSX.Element> = {
    WiFi: <Wifi className="w-6 h-6 text-blue-500" />,
    Estacionamento: <Car className="w-6 h-6 text-blue-500" />,
    Piscina: <Wind className="w-6 h-6 text-blue-500" />,
    TV: <Tv className="w-6 h-6 text-blue-500" />,
    Cozinha: <Utensils className="w-6 h-6 text-blue-500" />,
    Pets: <PawPrint className="w-6 h-6 text-blue-500" />,
    // adicione mais conforme suas comodidades
  }

  useEffect(() => {
    
    async function fetchImovel() {
      try{
        const res = await fetch(`http://localhost:8000/api/imoveis/propriedade/?id=${id}`)
        
        const data = await res.json()
        setImovel(data)
        console.log(data)

      } catch(error){
        console.error('erro ao buscar imovel: ', error)
      }
      
    }

    if(id){
      fetchImovel()
      
    }
  }, [id])


  const userRole = "visitor"
  const userName = "Guest"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4">
        {/* Property Title */}
        <section className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{imovel?.titulo}</h1>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-primary fill-current" />
              <span className="ml-1 font-medium">4.92</span>
              <span className="mx-1">·</span>
              <Link href="#reviews" className="text-gray-600 hover:underline">
                128 reviews
              </Link>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{imovel?.endereco?.cidade}, {imovel?.endereco?.estado}</span>
            </div>
            <button className="ml-auto text-primary hover:underline flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 0m-3.935 0l-9.566-5.314m9.566-4.314a2.25 2.25 0 10-3.935 0m3.935 0l-9.566 5.314"
                />
              </svg>
              Share
            </button>
            <button className="text-primary hover:underline flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              Save
            </button>
          </div>
        </section>

        {/* Property Images */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:grid-rows-2 rounded-xl overflow-hidden">
            <div className="md:col-span-2 md:row-span-2">
            <img
                src={imovel?.imagens[0]?.imagem ? `http://localhost:8000/${imovel.imagens[0].imagem}` : "/placeholder.svg?height=600&width=800&text=Main+Image"}
                alt="Main property view"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <img
                src={imovel?.imagens[1]?.imagem ? `http://localhost:8000/${imovel.imagens[1].imagem}` : "/placeholder.svg?height=300&width=400&text=Image+2"}
                alt="Property image"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
            <img
              src={imovel?.imagens[2]?.imagem ? `http://localhost:8000/${imovel.imagens[2].imagem}` : "/placeholder.svg?height=300&width=400&text=Image+3"}
              alt="Property image"
              className="w-full h-full object-cover"
            />
            </div>
            <div>
            <img
              src={imovel?.imagens[3]?.imagem ? `http://localhost:8000/${imovel.imagens[3].imagem}` : "/placeholder.svg?height=300&width=400&text=Image+4"}
              alt="Property image"
              className="w-full h-full object-cover"
            />
            </div>
            <div>
            <img
              src={imovel?.imagens[4]?.imagem ? `http://localhost:8000/${imovel.imagens[4].imagem}` : "/placeholder.svg?height=300&width=400&text=Image+5"}
              alt="Property image"
              className="w-full h-full object-cover"
            />
            </div>
          </div>
          <button className="mt-2 border border-gray-800 rounded-lg px-4 py-2 text-sm font-medium flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            Show all photos
          </button>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Host Info */}
            <section className="mb-8 border-b border-gray-200 pb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">proprietario</h2>
                  <p className="text-gray-600">{imovel?.numero_hospedes} Hospedes</p>
                </div>
                <img
                  src="/placeholder.svg?height=56&width=56&text=Host"
                  alt="Host"
                  className="w-14 h-14 rounded-full"
                />
              </div>
            </section>

            {/* Property Description */}
            <section className="mb-8 border-b border-gray-200 pb-8">
              <h2 className="text-xl font-bold mb-4">Sobre esse lugar</h2>
              <p className="text-gray-600 mb-4">
                {imovel?.descricao}
              </p>
              <p className="text-gray-600 mb-4">
                {imovel?.regras}
              </p>
            </section>

            {/* Amenities */}
            <section className="mb-8 border-b border-gray-200 pb-8">
              <h2 className="text-xl font-bold mb-6">O que esse lugar oferece</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {imovel?.comodidades?.map((comodidade, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div>
                      {iconesPorComodidade[comodidade] ?? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-700 font-medium">{comodidade}</span>
                  </div>
                ))}
              </div>
            </section>


            {/* Reviews */}
            <section id="reviews" className="mb-8">
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-primary fill-current" />
                <span className="ml-1 font-bold text-lg">4.92</span>
                <span className="mx-1">·</span>
                <span className="font-bold text-lg">128 reviews</span>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((review) => (
                  <div key={review} className="mb-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={`/placeholder.svg?height=40&width=40&text=User+${review}`}
                        alt={`User ${review}`}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="font-medium">John Doe</h4>
                        <p className="text-gray-600 text-sm">May 2023</p>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Amazing place! The farm house was beautiful, clean, and had everything we needed. The surroundings
                      are peaceful and the pool was perfect. Maria was a great host, very responsive and helpful. We'll
                      definitely be back!
                    </p>
                  </div>
                ))}
              </div>

              <button className="border border-gray-800 rounded-lg px-6 py-2 font-medium">Show all 128 reviews</button>
            </section>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl border border-gray-200 shadow-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-2xl font-bold">R$ {imovel?.preco}</span>
                  <span className="text-gray-600"> Dia</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-primary fill-current" />
                  <span className="ml-1 font-medium">4.92</span>
                  <span className="mx-1 text-gray-400">·</span>
                  <Link href="#reviews" className="text-gray-600 hover:underline">
                    128 reviews
                  </Link>
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg mb-4">
                <div className="grid grid-cols-2 divide-x divide-gray-300">
                  <div className="p-3">
                    <label className="block text-xs font-bold uppercase">PREÇO</label>
                    <p className="text-lg font-bold">R$ {imovel?.preco}/dia</p>
                  </div>
                  <div className="p-3">
                    <label className="block text-xs font-bold uppercase">CAPACIDADE</label>
                    <p className="text-lg font-bold">{imovel?.numero_hospedes} hóspedes</p>
                  </div>
                </div>
              </div>

              <Link 
                href={`/properties/${id}/reserve`}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg mb-4 block text-center"
              >
                Reservar Agora
              </Link>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="underline">Taxa de limpeza</span>
                  <span>$60</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-300 font-bold">
                  <span>Total</span>
                  <span>$990</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Voce estara aqui</h2>
          <div className="h-80 bg-gray-200 rounded-xl mb-4">
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Map placeholder - Google Maps would be integrated here
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}

