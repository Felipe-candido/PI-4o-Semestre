import { DashboardStats } from "@/components/dashboard-stats"
import { PropertyTable } from "@/components/property-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Painel do Proprietário</h1>
          <p className="text-muted-foreground mt-1">Gerencie suas chácaras no StayCation</p>
        </div>
        <Link href="/dashboard/properties/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Chácara
          </Button>
        </Link>
      </div>
      <DashboardStats />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Suas Chácaras</h2>
        <PropertyTable />
      </div>
    </div>
  )
}

