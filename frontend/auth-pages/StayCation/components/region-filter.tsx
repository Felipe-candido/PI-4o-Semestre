"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function RegionFilter() {
  const [region, setRegion] = useState("")

  const regions = [
    { id: "1", name: "Norte" },
    { id: "2", name: "Sul" },
    { id: "3", name: "Leste" },
    { id: "4", name: "Oeste" },
    { id: "5", name: "Centro" },
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-64">
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma região" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.id} value={region.id}>
                {region.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button>Filtrar</Button>
      <Button variant="outline">Usar minha localização</Button>
    </div>
  )
}

