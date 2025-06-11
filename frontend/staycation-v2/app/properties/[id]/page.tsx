'use client'

import Link from "next/link"
import MainLayout from "@/components/layout/MainLayout"
import { Star, MapPin, Wifi, Tv, Utensils, Car, Wind, PawPrint } from "lucide-react"
import { useState, useEffect, JSX } from "react"
import { useParams, useRouter } from 'next/navigation'
import { number } from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

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
  regras?: string
  proprietario_nome?: string
  proprietario_telefone?: string
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

interface Comentario {
  id: number
  usuario_nome: string
  texto: string
  data_criacao: string
  avaliacao: number
}

interface AvaliacaoMedia {
  media: number
  total_avaliacoes: number
}

export default function PropertyDetails() {
  const { id } = useParams()
  const router = useRouter()
  const [imovel, setImovel] = useState<Imovel | null>(null)
  const [comentarios, setComentarios] = useState<Comentario[]>([])
  const [novoComentario, setNovoComentario] = useState("")
  const [avaliacao, setAvaliacao] = useState(5)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [avaliacaoMedia, setAvaliacaoMedia] = useState<AvaliacaoMedia>({ media: 0, total_avaliacoes: 0 })

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

  // Fetch comments
  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/comentarios/?imovel_id=${id}`)
        if (response.ok) {
          const data = await response.json()
          // Ensure data is an array
          setComentarios(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Erro ao buscar comentários:', error)
        setComentarios([]) // Set empty array on error
      }
    }

    if (id) {
      fetchComentarios()
    }
  }, [id])

  // Fetch average rating
  useEffect(() => {
    const fetchAvaliacaoMedia = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/comentarios/media_avaliacoes/?imovel_id=${id}`)
        if (response.ok) {
          const data = await response.json()
          setAvaliacaoMedia(data)
        }
      } catch (error) {
        console.error('Erro ao buscar média de avaliações:', error)
      }
    }

    if (id) {
      fetchAvaliacaoMedia()
    }
  }, [id])

  const handleSubmitComentario = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch('http://localhost:8000/api/comentarios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
        credentials: 'include',
        body: JSON.stringify({
          imovel: id,
          texto: novoComentario,
          avaliacao: avaliacao
        })
      })

      if (!response.ok) {
        throw new Error('Erro ao enviar comentário')
      }

      const data = await response.json()
      setComentarios([data, ...comentarios])
      setNovoComentario("")
      setAvaliacao(5)

      // Atualizar a média de avaliações
      const mediaResponse = await fetch(`http://localhost:8000/api/comentarios/media_avaliacoes/?imovel_id=${id}`)
      if (mediaResponse.ok) {
        const mediaData = await mediaResponse.json()
        setAvaliacaoMedia(mediaData)
      }
    } catch (error) {
      setError('Erro ao enviar comentário. Por favor, tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  function getCSRFToken() {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];
    return cookieValue || '';
  }

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
              <span className="ml-1 font-medium">{avaliacaoMedia.media.toFixed(1)}</span>
              <span className="mx-1">·</span>
              <Link href="#reviews" className="text-gray-600 hover:underline">
              {comentarios.length} reviews
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
          
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Host Info */}
            <section className="mb-8 border-b border-gray-200 pb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Proprietário: {imovel?.proprietario_nome || 'Proprietário'}</h2>
                  <p className="text-gray-600 mb-2">{imovel?.numero_hospedes} Hóspedes</p>
                  <p className="text-gray-600">
                    <span className="font-medium">Contato:</span> {imovel?.proprietario_telefone || 'Não disponível'}
                  </p>
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
              {imovel?.regras && (
                <p className="text-gray-600 mb-4">
                  {imovel.regras}
                </p>
              )}
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
                <span className="ml-1 font-bold text-lg">{avaliacaoMedia.media.toFixed(1)}</span>
                <span className="mx-1">·</span>
                <span className="font-bold text-lg">{comentarios.length} reviews</span>
              </div>

              {/* Comment Form */}
              <div className="mb-8 p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-4">Deixe seu comentário</h3>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleSubmitComentario}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Avaliação</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setAvaliacao(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= avaliacao ? 'text-primary fill-current' : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <Textarea
                      value={novoComentario}
                      onChange={(e) => setNovoComentario(e.target.value)}
                      placeholder="Compartilhe sua experiência..."
                      className="w-full"
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar Comentário"}
                  </Button>
                </form>
              </div>

              {/* Comments List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.isArray(comentarios) && comentarios.map((comentario) => (
                  <div key={comentario.id} className="mb-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={`/placeholder.svg?height=40&width=40&text=${comentario.usuario_nome}`}
                        alt={comentario.usuario_nome}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="font-medium">{comentario.usuario_nome}</h4>
                        <p className="text-gray-600 text-sm">
                          {new Date(comentario.data_criacao).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < comentario.avaliacao ? 'text-primary fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">{comentario.texto}</p>
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

      </div>
    </MainLayout>
  )
}

