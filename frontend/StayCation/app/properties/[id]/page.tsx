"use client"

import { PropertyDetail } from "@/components/property-detail"
import { PropertyMap } from "@/components/property-map"
import { PropertyReviews } from "@/components/property-reviews"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <PropertyDetail id={params.id} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Localização</h2>
          <PropertyMap id={params.id} />
          <h2 className="text-2xl font-bold mb-4 mt-8">Avaliações</h2>
          <PropertyReviews id={params.id} />
        </div>
        <div className="bg-card rounded-lg p-6 border shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-4">Reservar</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Preço por diária</p>
              <p className="text-2xl font-bold">R$ 450,00</p>
            </div>
            <div className="flex items-center gap-2">
              <Button className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Verificar disponibilidade
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Entre em contato com o proprietário para mais informações</p>
          </div>
        </div>
      </div>
    </div>
  )
}

