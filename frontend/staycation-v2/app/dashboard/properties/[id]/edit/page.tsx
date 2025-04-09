import MainLayout from "@/components/layout/MainLayout"
import Link from "next/link"
import { Save, ArrowLeft, Trash2, Image, Plus, Minus } from "lucide-react"

export default function EditProperty({ params }: { params: { id: string } }) {
  // Em uma aplicação real, você obteria os dados do usuário e da propriedade do seu contexto/API
  const userRole = "owner"
  const userName = "Maria Oliveira"
  const userAvatar = "/images/owner-avatar.jpg"

  // Dados simulados da propriedade
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
            {/* Informações Básicas */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Informações Básicas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="property-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome da Propriedade
                  </label>
                  <input
                    id="property-name"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    defaultValue={property.name}
                  />
                </div>
                <div>
                  <label htmlFor="property-type" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Propriedade
                  </label>
                  <select
                    id="property-type"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    defaultValue={property.type}
                  >
                    <option>Chalé</option>
                    <option>Casa de Campo</option>
                    <option>Fazenda</option>
                    <option>Cabana</option>
                    <option>Sítio</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    defaultValue={property.description}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Localização */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Localização</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço
                  </label>
                  <input
                    id="address"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    defaultValue={property.address}
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade
                  </label>
                  <input
                    id="city"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    defaultValue={property.city}
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <input
                    id="state"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    defaultValue={property.state}
                  />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                    CEP
                  </label>
                  <input
                    id="zip"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    defaultValue={property.zipCode}
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    País
                  </label>
                  <input
                    id="country"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    defaultValue={property.country}
                  />
                </div>
              </div>
            </div>

            {/* Preços */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Preços</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Preço por Noite (R$)
                  </label>
                  <input
                    id="price"
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    defaultValue={property.price}
                  />
                </div>
                <div>
                  <label htmlFor="weekend-price" className="block text-sm font-medium text-gray-700 mb-1">
                    Preço de Fim de Semana (R$)
                  </label>
                  <input
                    id="weekend-price"
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    defaultValue={property.weekendPrice}
                  />
                </div>
                <div>
                  <label htmlFor="cleaning-fee" className="block text-sm font-medium text-gray-700 mb-1">
                    Taxa de Limpeza (R$)
                  </label>
                  <input
                    id="cleaning-fee"
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    defaultValue={property.cleaningFee}
                  />
                </div>
              </div>
            </div>

            {/* Detalhes */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Detalhes da Propriedade</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label htmlFor="max-guests" className="block text-sm font-medium text-gray-700 mb-1">
                    Máximo de Hóspedes
                  </label>
                  <div className="flex">
                    <button
                      type="button"
                      className="px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      id="max-guests"
                      type="number"
                      className="w-full px-3 py-2 border-y border-gray-300 text-center focus:outline-none focus:ring-primary focus:border-primary"
                      defaultValue={property.maxGuests}
                    />
                    <button
                      type="button"
                      className="px-3 py-2 border border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                    Quartos
                  </label>
                  <div className="flex">
                    <button
                      type="button"
                      className="px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      id="bedrooms"
                      type="number"
                      className="w-full px-3 py-2 border-y border-gray-300 text-center focus:outline-none focus:ring-primary focus:border-primary"
                      defaultValue={property.bedrooms}
                    />
                    <button
                      type="button"
                      className="px-3 py-2 border border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="beds" className="block text-sm font-medium text-gray-700 mb-1">
                    Camas
                  </label>
                  <div className="flex">
                    <button
                      type="button"
                      className="px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      id="beds"
                      type="number"
                      className="w-full px-3 py-2 border-y border-gray-300 text-center focus:outline-none focus:ring-primary focus:border-primary"
                      defaultValue={property.beds}
                    />
                    <button
                      type="button"
                      className="px-3 py-2 border border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                    Banheiros
                  </label>
                  <div className="flex">
                    <button
                      type="button"
                      className="px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      id="bathrooms"
                      type="number"
                      className="w-full px-3 py-2 border-y border-gray-300 text-center focus:outline-none focus:ring-primary focus:border-primary"
                      defaultValue={property.bathrooms}
                    />
                    <button
                      type="button"
                      className="px-3 py-2 border border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comodidades */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Comodidades</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Wi-Fi",
                  "Cozinha completa",
                  "Lareira",
                  "Estacionamento",
                  "Churrasqueira",
                  "Vista para montanha",
                  "Aquecimento",
                  "TV",
                  "Área externa",
                  "Piscina",
                  "Ar condicionado",
                  "Máquina de lavar",
                  "Secadora",
                  "Ferro de passar",
                  "Berço",
                  "Cadeira alta",
                  "Detector de fumaça",
                  "Extintor de incêndio"
                ].map((amenity) => (
                  <label key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-primary focus:ring-primary h-4 w-4"
                      defaultChecked={property.amenities.includes(amenity)}
                    />
                    <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

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
                        className="p-1 bg-white rounded-full"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-40 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                  <Image className="w-8 h-8 text


```plaintext file="public/images/admin-avatar.jpg"


\

