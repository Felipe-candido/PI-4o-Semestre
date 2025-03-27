"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Share2, Star } from "lucide-react"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"

interface PropertyDetailProps {
  id: string
}

export function PropertyDetail({ id }: PropertyDetailProps) {
  // Dados simulados da chácara
  const property = {
    id,
    title: "Chácara Recanto Verde",
    description:
      "Espaço amplo com piscina, churrasqueira e campo de futebol. Localizada em uma área tranquila, perfeita para reuniões familiares e eventos. A chácara conta com acomodações confortáveis, cozinha completa e uma vista deslumbrante para as montanhas.",
    price: 450,
    location: "Norte - 5km de distância",
    address: "Estrada Rural, km 5, Região Norte",
    rating: 4.8,
    reviews: 24,
    features: [
      "Piscina",
      "Churrasqueira",
      "Campo de futebol",
      "Área de lazer",
      "Estacionamento",
      "Wi-Fi",
      "Cozinha completa",
      "5 quartos",
    ],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800&auto=format&fit=crop",
    ],
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">{property.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-medium">{property.rating}</span>
              <span className="text-muted-foreground ml-1">({property.reviews} avaliações)</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{property.location}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
          <Button variant="outline" size="sm">
            <Heart className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {property.images.map((image, index) => (
          <div
            key={index}
            className={`${
              index === 0 ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" : "col-span-1"
            } overflow-hidden rounded-lg`}
          >
            <ImageWithFallback
              src={image || "/placeholder.svg"}
              fallbackSrc="/placeholder.svg?height=400&width=600"
              alt={`${property.title} - Imagem ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Sobre a chácara</h2>
          <p className="text-muted-foreground mb-6">{property.description}</p>

          <h3 className="text-xl font-bold mb-3">Comodidades</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
            {property.features.map((feature, index) => (
              <Badge key={index} variant="outline" className="justify-start font-normal py-1.5">
                {feature}
              </Badge>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-3">Endereço</h3>
          <p className="text-muted-foreground">{property.address}</p>
        </div>
      </div>
    </div>
  )
}

