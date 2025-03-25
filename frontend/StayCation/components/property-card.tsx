import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Link from "next/link"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"

interface PropertyCardProps {
  property: {
    id: string
    title: string
    description: string
    price: number
    location: string
    image: string
    rating: number
  }
}

export function PropertyCard({ property }: PropertyCardProps) {
  // Array de imagens de chácaras para usar como fallback
  const chacaraImages = [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=400&auto=format&fit=crop",
  ]

  // Selecionar uma imagem aleatória do array
  const randomImage = chacaraImages[Math.floor(Math.random() * chacaraImages.length)]

  return (
    <Link href={`/properties/${property.id}`}>
      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
        <div className="aspect-video relative overflow-hidden">
          <ImageWithFallback
            src={property.image || randomImage}
            fallbackSrc={randomImage}
            alt={property.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
          <Badge className="absolute top-2 right-2 bg-primary">R$ {property.price}/dia</Badge>
        </div>
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold line-clamp-1">{property.title}</h3>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{property.rating}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{property.location}</p>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm line-clamp-2">{property.description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

