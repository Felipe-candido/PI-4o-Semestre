"use client"

import { useEffect, useState } from "react"
import MainLayout from "@/components/layout/MainLayout"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// CRIA A ESTRUTURA DO FORM E SUAS VALIDACOES

interface Imovel {
  proprietario: UserData
  titulo: string
  descricao: string
  preco: string
  numero_hospedes: string
  regras: string
  comodidades: string[] 
  endereco: Endereco
}

interface Endereco {
  rua?: string
  numero?: string
  cidade?: string
  estado?: string
  cep?: string
  bairro?: string
}

interface UserData {
  id: string
  nome: string
  sobrenome: string
  email: string
  telefone: string
  dataNascimento: string
  cpf: string
  tipo : string
  avatar: string
}

export default function CreateListing() {
  const [user, setUser] = useState<UserData | null>(null)
  const [imovel, setImovel] = useState<Imovel | null>(null)
  const router = useRouter()
  const taxa = 0.07
  const [valorTotalInput, setValorTotalInput] = useState("")
  const [valorTotal, setValorTotal] = useState(0)
  const [valorTaxa, setValorTaxa] = useState(0)
  const [valorLiquido, setValorLiquido] = useState(0)
  const [valorLiquidoInput, setValorLiquidoInput] = useState("")

  const [comodidade, setComodidade] = useState("")
  const [comodidades, setComodidades] = useState<string[]>([])

  const [endereco, setEndereco] = useState<Endereco | null>(null)

 
  const userName = user?.nome || "Visitante"
  const userId = user?.id || "Visitante"
  const userAvatar = user?. avatar || ""


  useEffect(() => {
    // FUNCAO PARA CARREGAR OS DADOS DO USUARIO AUTENTICADO
    async function fetchUsuario() {
      try {
        const response = await apiFetch("/api/me", {
          credentials: 'include'
        })
        // CRIA UMA INSTANCIA PARA EXIBICAO
        setUser(response.user)
      
      } catch (error) {
        router.push('/auth/login')
         
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do usuário",
          variant: "destructive",
        })
      }
    }
    fetchUsuario()
  }, [])

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

  const handleSave = async () => {
    try {

      const payload = {
        imovel: {
          titulo: imovel?.titulo,
          descricao: imovel?.descricao,
          preco: valorTotal,
          numero_hospedes: imovel?.numero_hospedes,
          regras: imovel?.regras
        },
        endereco: {
          rua: endereco?.rua,
          numero: endereco?.numero,
          cidade: endereco?.cidade,
          estado: endereco?.estado,
          cep: endereco?.cep,
          bairro: endereco?.bairro
        }
      };

      const response = await apiFetch("/api/imoveis/registrar/", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      })

      if (response?.success) {     
        toast({
          title: "Sucesso",
          description: "Anuncio criado com sucesso",
        });
      }
      
      router.push('/profile/owner');
  
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível criar o anuncio",
        variant: "destructive",
      })
    }
  }

  return (
    <MainLayout userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Criar Novo Anúncio</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Informações Básicas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium mb-1">Nome da Propriedade</Label>
                  <Input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite o nome da propriedade"
                    value={imovel?.titulo || ""}
                    onChange={(e) => setImovel({ ...imovel!, titulo: e.target.value })}
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium mb-1">Número de Hóspedes</Label>
                  <Input
                    type="number"
                    min="1"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Ex: 8"
                    value={imovel?.numero_hospedes || ""}
                    onChange={(e) => setImovel({ ...imovel!, numero_hospedes: e.target.value })}
                  />
                </div>

              </div>

              {/* Descrição do imóvel */}
              <div className="mt-4">
                <Label className="block text-sm font-medium mb-1">Descrição do Imóvel</Label>
                <Textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Descreva os detalhes do imóvel"
                  rows={4}
                  value={imovel?.descricao || ""}
                  onChange={(e) => setImovel({ ...imovel!, descricao: e.target.value })}
                />
              </div>

              {/* Regras da propriedade */}
              <div className="mt-4">
                <Label className="block text-sm font-medium mb-1">Regras da Propriedade</Label>
                <Textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Informe as regras que os hóspedes devem seguir"
                  rows={3}
                  value={imovel?.regras || ""}
                  onChange={(e) => setImovel({ ...imovel!, regras: e.target.value })}
                />
              </div>
            </div>

            {/* Localização */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Localização</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="block text-sm font-medium mb-1">Rua</Label>
                  <Input
                    type="text"
                    value={endereco?.rua || ""}
                    onChange={(e) => setEndereco({...endereco!, rua: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite a rua"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Bairro</Label>
                  <Input
                    type="text"
                    value={endereco?.bairro || ""}
                    onChange={(e) => setEndereco({...endereco!, bairro: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite o bairro"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Número</Label>
                  <Input
                    type="text"
                    value={endereco?.numero || ""}
                    onChange={(e) => setEndereco({...endereco!, numero: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite o número"
                  />
                </div>
              </div>      

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="block text-sm font-medium mb-1">Cidade</Label>
                  <Input
                    type="text"
                    value={endereco?.cidade || ""}
                    onChange={(e) => setEndereco({...endereco!, cidade: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite a cidade"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Estado</Label>
                  <Input
                    type="text"
                    value={endereco?.estado || ""}
                    onChange={(e) => setEndereco({...endereco!, estado: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite o estado"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Cep</Label>
                  <Input
                    type="text"
                    value={endereco?.cep || ""}
                    onChange={(e) => setEndereco({...endereco!, cep: e.target.value})}
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
                      value={valorTotal}
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
            {/* <div>
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
            </div> */}

            <div className="flex justify-end space-x-3">
              <Button onClick={handleSave}>Salvar</Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )  
}
