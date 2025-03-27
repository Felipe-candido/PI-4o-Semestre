"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface PropertyReviewsProps {
  id: string
}

export function PropertyReviews({ id }: PropertyReviewsProps) {
  // Dados simulados de avaliações
  const reviews = [
    {
      id: "1",
      user: {
        name: "João Silva",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "10/03/2023",
      comment:
        "Lugar incrível! Passamos um final de semana maravilhoso com a família. A piscina é ótima e a área de churrasqueira muito bem equipada.",
    },
    {
      id: "2",
      user: {
        name: "Maria Oliveira",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4,
      date: "22/02/2023",
      comment:
        "Chácara muito bonita e bem cuidada. O proprietário foi muito atencioso. Só achei que poderia ter mais utensílios na cozinha.",
    },
    {
      id: "3",
      user: {
        name: "Pedro Santos",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "15/01/2023",
      comment:
        "Excelente lugar para eventos. Fizemos uma festa de aniversário e todos adoraram. Espaço amplo e bem organizado.",
    },
  ]

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-6 last:border-0">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src={review.user.avatar} alt={review.user.name} />
              <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{review.user.name}</h4>
                <span className="text-sm text-muted-foreground">{review.date}</span>
              </div>
              <div className="flex mt-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm">{review.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

