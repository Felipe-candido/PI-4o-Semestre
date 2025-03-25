import { PropertyFilters } from "@/components/property-filters"
import { PropertyList } from "@/components/property-list"

export default function PropertiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Chácaras Disponíveis</h1>
        <p className="text-muted-foreground mt-2">Encontre a chácara perfeita para sua próxima estadia no StayCation</p>
      </div>
      <PropertyFilters />
      <PropertyList />
    </div>
  )
}

