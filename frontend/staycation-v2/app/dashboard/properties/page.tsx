'use client'

import Link from "next/link"
import MainLayout from "@/components/layout/MainLayout"
import { Star, Search, Filter, Plus } from "lucide-react"
import { useEffect, useState } from "react"

export default function Properties() {
  // In a real app, you would get the user data from your auth context
  const userRole = "owner"
  const userName = "Maria Silva"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  const [imoveis, setImoveis] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchImoveis() {
      try {
        const res = await fetch("http://localhost:8000/api/imoveis/registrar/", {
          credentials: "include",
        })
        if (!res.ok) throw new Error("Erro ao buscar imóveis")
        const data = await res.json()
        setImoveis(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchImoveis()
  }, [])

  if (loading) return <div>Carregando imóveis...</div>
  if (error) return <div>Erro: {error}</div>

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Minhas propriedades</h1>
            <p className="text-gray-600">Gerencie seus imoveis</p>
          </div>
          <Link
            href="/dashboard/properties/new"
            className="mt-4 md:mt-0 bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar nova propriedade
          </Link>
        </div>

        {/* Properties List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {imoveis.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-8">Nenhum imóvel encontrado.</div>
          ) : (
            imoveis.map((imovel) => (
              <div key={imovel.id} className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="relative h-48">
                  <img
                    src={imovel.logo || "/placeholder.svg?height=300&width=400&text=Imóvel"}
                    alt={imovel.titulo}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-semibold bg-green-100 text-green-800">
                    Ativo
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{imovel.titulo}</h3>
                  <p className="text-gray-600 text-sm mb-2">{imovel.endereco?.cidade}, {imovel.endereco?.estado}</p>
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-semibold">
                      R$ {imovel.preco} <span className="text-gray-600 font-normal text-sm">/noite</span>
                    </p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-primary fill-current" />
                      <span className="text-sm font-medium ml-1">4.9</span>
                      <span className="text-xs text-gray-500 ml-1">(28)</span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="flex space-x-2 mt-3">
                      <Link
                        href={`/dashboard/properties/${imovel.id}/edit`}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium py-2 px-4 rounded-lg text-center"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/properties/${imovel.id}`}
                        className="flex-1 bg-primary hover:bg-primary/90 text-white text-sm font-medium py-2 px-4 rounded-lg text-center"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mb-8">
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
            <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">1</button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
              2
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
      </div>
    </MainLayout>
  )
}

