"use client"

import type React from "react"

import MainLayout from "@/components/layout/MainLayout"
import Link from "next/link"
import { Star, ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function NewReview({ params }: { params: { id: string } }) {
  // Em uma aplicação real, você obteria os dados do usuário e da propriedade do seu contexto/API
  const userRole = "tenant"
  const userName = "João Silva"
  const userAvatar = "/images/tenant-avatar.jpg"

  // Estados para controlar as avaliações
  const [overallRating, setOverallRating] = useState(0)
  const [cleanlinessRating, setCleanlinessRating] = useState(0)
  const [accuracyRating, setAccuracyRating] = useState(0)
  const [communicationRating, setCommunicationRating] = useState(0)
  const [locationRating, setLocationRating] = useState(0)
  const [valueRating, setValueRating] = useState(0)
  const [reviewText, setReviewText] = useState("")

  // Dados simulados da propriedade
  const property = {
    id: params.id,
    name: "Chalé na Montanha",
    location: "Serra da Mantiqueira, SP",
    image: "/images/property-1.jpg",
    host: {
      name: "Maria Oliveira",
      avatar: "/images/owner-avatar.jpg",
    },
    dates: {
      checkIn: "15/05/2023",
      checkOut: "20/05/2023",
    },
  }

  // Função para renderizar as estrelas
  const renderStars = (rating: number, setRating: (rating: number) => void) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
            <Star className={`w-6 h-6 ${star <= rating ? "text-secondary fill-current" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Em uma aplicação real, você enviaria a avaliação para o backend
    console.log({
      propertyId: property.id,
      overallRating,
      cleanlinessRating,
      accuracyRating,
      communicationRating,
      locationRating,
      valueRating,
      reviewText,
    })
    // Redirecionar para a página de confirmação ou de detalhes da propriedade
  }

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link href={`/properties/${property.id}`} className="text-primary hover:text-primary/80 flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar para a propriedade
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-2xl font-bold text-primary mb-6">Avalie sua estadia</h1>

            <div className="flex flex-col md:flex-row items-start mb-8">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
              <div className="md:w-3/4 md:pl-6">
                <h2 className="text-xl font-semibold mb-1">{property.name}</h2>
                <p className="text-gray-600 mb-2">{property.location}</p>
                <p className="text-gray-600 text-sm">
                  Estadia de {property.dates.checkIn} a {property.dates.checkOut}
                </p>
                <div className="flex items-center mt-3">
                  <img
                    src={property.host.avatar || "/placeholder.svg"}
                    alt={property.host.name}
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                  <p className="text-sm">Anfitrião: {property.host.name}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-2">Avaliação Geral</label>
                <div className="flex items-center">
                  {renderStars(overallRating, setOverallRating)}
                  <span className="ml-2 text-sm text-gray-600">
                    {overallRating > 0 ? `${overallRating} estrelas` : "Selecione uma avaliação"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium mb-2">Limpeza</label>
                  {renderStars(cleanlinessRating, setCleanlinessRating)}
                </div>
                <div>
                  <label className="block font-medium mb-2">Precisão</label>
                  {renderStars(accuracyRating, setAccuracyRating)}
                </div>
                <div>
                  <label className="block font-medium mb-2">Comunicação</label>
                  {renderStars(communicationRating, setCommunicationRating)}
                </div>
                <div>
                  <label className="block font-medium mb-2">Localização</label>
                  {renderStars(locationRating, setLocationRating)}
                </div>
                <div>
                  <label className="block font-medium mb-2">Custo-Benefício</label>
                  {renderStars(valueRating, setValueRating)}
                </div>
              </div>

              <div>
                <label htmlFor="review-text" className="block text-lg font-semibold mb-2">
                  Compartilhe sua experiência
                </label>
                <p className="text-gray-600 text-sm mb-2">
                  Conte aos outros hóspedes sobre sua estadia. O que você mais gostou? O que poderia ser melhorado?
                </p>
                <textarea
                  id="review-text"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Escreva sua avaliação aqui..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <Link
                  href={`/properties/${property.id}`}
                  className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
                  disabled={overallRating === 0 || !reviewText.trim()}
                >
                  Enviar Avaliação
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

