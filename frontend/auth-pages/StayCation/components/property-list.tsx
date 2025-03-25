import { PropertyCard } from "@/components/property-card"

export function PropertyList() {
  // Dados simulados de chácaras
  const properties = [
    {
      id: "1",
      title: "Chácara Recanto Verde",
      description: "Espaço amplo com piscina, churrasqueira e campo de futebol",
      price: 450,
      location: "Norte - 5km de distância",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.8,
    },
    {
      id: "2",
      title: "Chácara Águas Claras",
      description: "Ambiente familiar com lago para pesca e área de lazer completa",
      price: 380,
      location: "Sul - 8km de distância",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
    },
    {
      id: "3",
      title: "Chácara Bela Vista",
      description: "Vista panorâmica com área gourmet e piscina aquecida",
      price: 520,
      location: "Leste - 12km de distância",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.9,
    },
    {
      id: "4",
      title: "Chácara Bosque Encantado",
      description: "Cercada por natureza com trilhas e cachoeira privativa",
      price: 490,
      location: "Oeste - 15km de distância",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.7,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}

