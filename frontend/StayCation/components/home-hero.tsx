import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"

export function HomeHero() {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop"
        fallbackSrc="/placeholder.svg?height=500&width=1200"
        alt="Chácara"
        className="w-full h-[500px] object-cover"
      />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">StayCation</h1>
        <p className="text-xl md:text-2xl text-center mb-4">Encontre a chácara perfeita para seu descanso</p>
        <p className="text-lg md:text-xl text-center mb-8 max-w-2xl">
          Descubra chácaras próximas a você para passar momentos inesquecíveis com família e amigos
        </p>
        <div className="flex gap-4">
          <Button size="lg" className="bg-white text-black hover:bg-white/90">
            <Search className="mr-2 h-4 w-4" />
            Buscar chácaras
          </Button>
        </div>
      </div>
    </div>
  )
}

