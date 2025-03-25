"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

export function PropertyFilters() {
  const [priceRange, setPriceRange] = useState([200, 800])

  return (
    <div className="bg-card rounded-lg p-6 border shadow-sm mb-6">
      <h2 className="text-xl font-bold mb-4">Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Região</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Todas as regiões" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="norte">Norte</SelectItem>
              <SelectItem value="sul">Sul</SelectItem>
              <SelectItem value="leste">Leste</SelectItem>
              <SelectItem value="oeste">Oeste</SelectItem>
              <SelectItem value="centro">Centro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Tipo</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Todos os tipos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="familiar">Familiar</SelectItem>
              <SelectItem value="eventos">Para eventos</SelectItem>
              <SelectItem value="piscina">Com piscina</SelectItem>
              <SelectItem value="lago">Com lago</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Capacidade</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Qualquer capacidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">Até 10 pessoas</SelectItem>
              <SelectItem value="20">Até 20 pessoas</SelectItem>
              <SelectItem value="50">Até 50 pessoas</SelectItem>
              <SelectItem value="100">Até 100 pessoas</SelectItem>
              <SelectItem value="100+">Mais de 100 pessoas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Distância máxima</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Qualquer distância" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">Até 5km</SelectItem>
              <SelectItem value="10">Até 10km</SelectItem>
              <SelectItem value="20">Até 20km</SelectItem>
              <SelectItem value="50">Até 50km</SelectItem>
              <SelectItem value="100">Até 100km</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium mb-3 block">
          Faixa de preço: R$ {priceRange[0]} - R$ {priceRange[1]}
        </label>
        <Slider
          defaultValue={priceRange}
          min={100}
          max={1000}
          step={50}
          onValueChange={setPriceRange}
          className="mb-6"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <Button className="sm:w-auto">Aplicar filtros</Button>
        <Button variant="outline" className="sm:w-auto">
          Limpar filtros
        </Button>
      </div>
    </div>
  )
}

