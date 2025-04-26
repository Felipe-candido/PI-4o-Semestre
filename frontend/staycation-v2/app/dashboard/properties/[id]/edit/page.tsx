import MainLayout from "@/components/layout/MainLayout"
import Link from "next/link"
import { Save, ArrowLeft, Trash2, Image, Plus, Minus } from "lucide-react"

export default function EditProperty({ params }: { params: { id: string } }) {
  const userRole = "owner"
  const userName = "Maria Oliveira"
  const userAvatar = "/images/owner-avatar.jpg"

  const property = {
    id: params.id,
    name: "Chalé na Montanha",
    type: "Chalé",
    description: "Um lindo chalé localizado na Serra da Mantiqueira, com vista panorâmica para as montanhas. Perfeito para casais e famílias que buscam tranquilidade e contato com a natureza.",
    address: "Estrada da Serra, km 15",
    city: "Serra da Mantiqueira",
    state: "SP",
    zipCode: "12345-678",
    country: "Brasil",
    price: 180,
    weekendPrice: 220,
    cleaningFee: 100,
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    amenities: [
      "Wi-Fi",
      "Cozinha completa",
      "Lareira",
      "Estacionamento",
      "Churrasqueira",
      "Vista para montanha",
      "Aquecimento",
      "TV",
      "Área externa"
    ],
    images: [
      "/images/property-1.jpg",
      "/images/property-2.jpg",
      "/images/property-3.jpg",
      "/images/property-4.jpg"
    ],
    rules: {
      checkIn: "15:00",
      checkOut: "11:00",
      petsAllowed: true,
      smokingAllowed: false,
      partiesAllowed: false,
      minNights: 2
    }
  }

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <Link href={`/dashboard/properties`} className="text-primary hover:text-primary/80 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar para Minhas Propriedades
          </Link>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center">
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-6 text-primary">Editar Propriedade</h1>
          
          <form className="space-y-8">
            {/* ... (suas seções anteriores) ... */}

            {/* Fotos */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Fotos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {property.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Imagem ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                      <button
                        type="button"
                        className="p-2 bg-white rounded-full hover:bg-red-100"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
                <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-40 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                  <input type="file" className="hidden" />
                  <Image className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-500 mt-2">Adicionar Foto</span>
                </label>
              </div>
            </div>

            {/* Regras */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Regras da Propriedade</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">
                    Horário de Check-in
                  </label>
                  <input
                    id="check-in"
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    defaultValue={property.rules.checkIn}
                  />
                </div>
                <div>
                  <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">
                    Horário de Check-out
                  </label>
                  <input
                    id="check-out"
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    defaultValue={property.rules.checkOut}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="pets-allowed"
                    type="checkbox"
                    className="rounded text-primary focus:ring-primary h-5 w-5"
                    defaultChecked={property.rules.petsAllowed}
                  />
                  <label htmlFor="pets-allowed" className="text-sm text-gray-700">Permitir animais de estimação</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="smoking-allowed"
                    type="checkbox"
                    className="rounded text-primary focus:ring-primary h-5 w-5"
                    defaultChecked={property.rules.smokingAllowed}
                  />
                  <label htmlFor="smoking-allowed" className="text-sm text-gray-700">Permitir fumar</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="parties-allowed"
                    type="checkbox"
                    className="rounded text-primary focus:ring-primary h-5 w-5"
                    defaultChecked={property.rules.partiesAllowed}
                  />
                  <label htmlFor="parties-allowed" className="text-sm text-gray-700">Permitir festas/eventos</label>
                </div>
                <div>
                  <label htmlFor="min-nights" className="block text-sm font-medium text-gray-700 mb-1">
                    Noites Mínimas
                  </label>
                  <input
                    id="min-nights"
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    defaultValue={property.rules.minNights}
                  />
                </div>
              </div>
            </div>

            {/* Botões Finais */}
            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}
