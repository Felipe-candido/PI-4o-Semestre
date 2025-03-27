"use client"

import { PropertyForm } from "@/components/property-form"

export default function NewPropertyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cadastrar Nova Chácara</h1>
      <PropertyForm />
    </div>
  )
}

