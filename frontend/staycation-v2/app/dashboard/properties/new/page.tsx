"use client"

import { useEffect, useState } from "react"
import MainLayout from "@/components/layout/MainLayout"

export default function CreateListing() {
  const userRole = "owner"
  const userName = "John Doe"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  const taxa = 0.07

  const [valorTotalInput, setValorTotalInput] = useState("")
  const [valorTotal, setValorTotal] = useState(0)
  const [valorTaxa, setValorTaxa] = useState(0)
  const [valorLiquido, setValorLiquido] = useState(0)
  const [valorLiquidoInput, setValorLiquidoInput] = useState("")

  const [comodidade, setComodidade] = useState("")
  const [comodidades, setComodidades] = useState<string[]>([])

  const [rua, setRua] = useState("")
  const [bairro, setBairro] = useState("")
  const [numero, setNumero] = useState("")
  const [complemento, setComplemento] = useState("")
  const [complementoVisivel, setComplementoVisivel] = useState(false)
  const [cidade, setCidade] = useState("")
  const [estado, setEstado] = useState("")

  useEffect(() => {
    const taxaCalculada = valorTotal * taxa
    const liquido = valorTotal - taxaCalculada
    setValorTaxa(taxaCalculada)
    setValorLiquido(liquido)
    setValorLiquidoInput(valorTotal > 0 ? liquido.toFixed(2) : "")
  }, [valorTotal])

  const handleValorTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setValorTotalInput(input)

    const valor = parseFloat(input.replace(",", "."))
    if (!isNaN(valor)) {
      setValorTotal(valor)
    } else {
      setValorTotal(0)
    }
  }

  const handleValorLiquidoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValorLiquidoInput(e.target.value)
  }

  const handleValorLiquidoBlur = () => {
    const valor = parseFloat(valorLiquidoInput.replace(",", ".")) || 0
    setValorLiquido(valor)
    const novoTotal = valor / (1 - taxa)
    setValorTotal(novoTotal)
    setValorTotalInput(novoTotal.toFixed(2))
  }

  const handleAddComodidade = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const trimmed = comodidade.trim()
      if (trimmed && !comodidades.includes(trimmed)) {
        setComodidades([...comodidades, trimmed])
      }
      setComodidade("")
    }
  }

  const handleRemoveComodidade = (item: string) => {
    setComodidades(comodidades.filter((c) => c !== item))
  }

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Criar Novo Anúncio</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <form className="space-y-6">
            {/* Informações Básicas */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Informações Básicas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome da Propriedade</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite o nome da propriedade"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tipo de Propriedade</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Casa de Campo</option>
                    <option>Sítio</option>
                    <option>Chácara</option>
                    <option>Villa</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Localização */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Localização</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Rua</label>
                  <input
                    type="text"
                    value={rua}
                    onChange={(e) => setRua(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite a rua"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bairro</label>
                  <input
                    type="text"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite o bairro"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Número</label>
                  <input
                    type="text"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite o número"
                  />
                </div>
              </div>

              {/* Botão para complemento */}
              <div className="flex items-center mt-4">
                <button
                  type="button"
                  onClick={() => setComplementoVisivel(!complementoVisivel)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  {complementoVisivel ? "Cancelar complemento" : "Adicionar complemento"}
                </button>
              </div>

              {/* Campo de complemento */}
              {complementoVisivel && (
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Complemento</label>
                  <input
                    type="text"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite o complemento"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Cidade</label>
                  <input
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite a cidade"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Estado</label>
                  <input
                    type="text"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite o estado"
                  />
                </div>
              </div>
            </div>

            {/* Preços */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Preços</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Valor total</label>
                  <div className="flex items-center border border-violet-200 rounded-xl bg-white overflow-hidden">
                    <span className="px-4 py-2 bg-white text-gray-700 border-r border-violet-200">R$</span>
                    <input
                      type="text"
                      value={valorTotalInput}
                      onChange={handleValorTotalChange}
                      className="w-full px-3 py-2 text-gray-700 focus:outline-none bg-white"
                      placeholder=""
                      onFocus={(e) => e.target.select()}
                    />
                  </div>
                  <p className="text-xs italic text-gray-500 mt-1">
                    Este é o valor que o hóspede verá na proposta
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Taxa</label>
                  <div className="flex items-center border border-violet-200 rounded-xl px-3 py-2">
                    <span className="text-gray-700 font-semibold">R$ {valorTaxa.toFixed(2)}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Você vai receber</label>
                  <div className="flex items-center border border-violet-200 rounded-xl overflow-hidden bg-white">
                    <span className="px-4 py-2 bg-white text-gray-700 border-r border-violet-200">R$</span>
                    <input
                      type="text"
                      value={valorLiquidoInput}
                      onChange={handleValorLiquidoInputChange}
                      onBlur={handleValorLiquidoBlur}
                      className="w-full px-3 py-2 text-gray-700 focus:outline-none bg-white"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Comodidades */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Comodidades</h2>
              <input
                type="text"
                value={comodidade}
                onChange={(e) => setComodidade(e.target.value)}
                onKeyDown={handleAddComodidade}
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
                placeholder="Digite e pressione Enter para adicionar"
              />
              <div className="flex flex-wrap gap-2">
                {comodidades.map((item, idx) => (
                  <span
                    key={idx}
                    className="flex items-center bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => handleRemoveComodidade(item)}
                      className="ml-2 text-violet-500 hover:text-violet-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Fotos */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Fotos</h2>
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center hover:border-blue-500 transition-colors">
                <p className="text-gray-500 mb-4">Arraste e solte as fotos aqui ou clique para fazer upload</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  id="file-upload"
                  onChange={(e) => handleFileChange(e)}
                />
                <label
                  htmlFor="file-upload"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-700 transition"
                >
                  Escolher Fotos
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Publicar Anúncio
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}
