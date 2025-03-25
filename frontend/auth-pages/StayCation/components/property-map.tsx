interface PropertyMapProps {
  id: string
}

export function PropertyMap({ id }: PropertyMapProps) {
  return (
    <div className="bg-muted h-[300px] rounded-lg flex items-center justify-center">
      <p className="text-muted-foreground">Mapa da localização da chácara (integração com Google Maps)</p>
    </div>
  )
}

