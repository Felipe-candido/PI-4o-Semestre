"use client"

import { HomeHero } from "@/components/home-hero"
import { PropertyList } from "@/components/property-list"
import { RegionFilter } from "@/components/region-filter"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HomeHero />
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">Encontre chácaras próximas a você</h2>
        <RegionFilter />
      </div>
      <div className="mb-12">
        <PropertyList />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t">
        <div className="text-center p-6">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              <path d="M5 3v4" />
              <path d="M19 17v4" />
              <path d="M3 5h4" />
              <path d="M17 19h4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Experiências Únicas</h3>
          <p className="text-muted-foreground">
            Descubra chácaras com características únicas para tornar sua estadia inesquecível.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Conforto e Qualidade</h3>
          <p className="text-muted-foreground">
            Todas as nossas chácaras são verificadas para garantir o máximo conforto e qualidade.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Segurança Garantida</h3>
          <p className="text-muted-foreground">
            Reservas seguras e verificadas, com suporte ao cliente disponível 24/7.
          </p>
        </div>
      </div>
    </div>
  )
}

