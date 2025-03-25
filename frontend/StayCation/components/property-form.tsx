"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { Upload } from "lucide-react"

export function PropertyForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    region: "",
    address: "",
    capacity: "",
    features: {
      pool: false,
      barbecue: false,
      soccerField: false,
      wifi: false,
      parking: false,
      lake: false,
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: checked,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar lógica de cadastro de chácara
    console.log("Cadastro de chácara:", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="title">Nome da chácara</Label>
          <Input
            id="title"
            name="title"
            placeholder="Ex: Chácara Recanto Verde"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Descreva sua chácara, comodidades, ambiente, etc."
            rows={5}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Preço por dia (R$)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            placeholder="Ex: 450"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="capacity">Capacidade (pessoas)</Label>
          <Input
            id="capacity"
            name="capacity"
            type="number"
            placeholder="Ex: 20"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="region">Região</Label>
          <Select
            value={formData.region}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, region: value }))}
          >
            <SelectTrigger id="region">
              <SelectValue placeholder="Selecione a região" />
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

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Endereço completo</Label>
          <Input
            id="address"
            name="address"
            placeholder="Rua, número, bairro, cidade, etc."
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Comodidades</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pool"
                checked={formData.features.pool}
                onCheckedChange={(checked) => handleFeatureChange("pool", checked as boolean)}
              />
              <Label htmlFor="pool" className="cursor-pointer">
                Piscina
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="barbecue"
                checked={formData.features.barbecue}
                onCheckedChange={(checked) => handleFeatureChange("barbecue", checked as boolean)}
              />
              <Label htmlFor="barbecue" className="cursor-pointer">
                Churrasqueira
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="soccerField"
                checked={formData.features.soccerField}
                onCheckedChange={(checked) => handleFeatureChange("soccerField", checked as boolean)}
              />
              <Label htmlFor="soccerField" className="cursor-pointer">
                Campo de futebol
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="wifi"
                checked={formData.features.wifi}
                onCheckedChange={(checked) => handleFeatureChange("wifi", checked as boolean)}
              />
              <Label htmlFor="wifi" className="cursor-pointer">
                Wi-Fi
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="parking"
                checked={formData.features.parking}
                onCheckedChange={(checked) => handleFeatureChange("parking", checked as boolean)}
              />
              <Label htmlFor="parking" className="cursor-pointer">
                Estacionamento
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="lake"
                checked={formData.features.lake}
                onCheckedChange={(checked) => handleFeatureChange("lake", checked as boolean)}
              />
              <Label htmlFor="lake" className="cursor-pointer">
                Lago
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Fotos da chácara</Label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-1">Arraste e solte imagens aqui ou clique para selecionar</p>
            <p className="text-xs text-muted-foreground">Suporte para JPG, PNG ou WEBP (máx. 5MB cada)</p>
            <Input id="images" type="file" multiple className="hidden" />
            <Button type="button" variant="outline" size="sm" className="mt-4">
              Selecionar arquivos
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit">Cadastrar chácara</Button>
        <Button type="button" variant="outline">
          Cancelar
        </Button>
      </div>
    </form>
  )
}

