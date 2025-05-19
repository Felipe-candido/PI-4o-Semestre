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
  logo?: File
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
  const [erros, setErros] = useState<{ [key: string]: string }>({});

  const [comodidade, setComodidade] = useState("")
  const [comodidades, setComodidades] = useState<string[]>([])

  const [endereco, setEndereco] = useState<Endereco | null>(null)

  const [imagens, setImagens] = useState<File[]>([])

 
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const arquivos = Array.from(e.target.files)
      setImagens(prev => [...prev, ...arquivos])
    }
  }

  const handleSave = async () => {
    const errosTemp: { [key: string]: string } = {}
    
    // Validações
    if (!imovel?.titulo) errosTemp.titulo = "O nome da propriedade é obrigatório."
    if (!imovel?.descricao) errosTemp.descricao = "A descrição é obrigatória."
    if (!imovel?.numero_hospedes) errosTemp.numero_hospedes = "Número de hóspedes é obrigatório."
    if (!imovel?.regras) errosTemp.regras = "As regras são obrigatórias."
    if (!valorTotal || valorTotal <= 0) errosTemp.preco = "Informe um valor válido."
    if (!endereco?.rua) errosTemp.rua = "Rua é obrigatória."
    if (!endereco?.numero) errosTemp.numero = "Número é obrigatório."
    if (!endereco?.cidade) errosTemp.cidade = "Cidade é obrigatória."
    if (!endereco?.estado) errosTemp.estado = "Estado é obrigatório."
    if (!endereco?.cep) errosTemp.cep = "CEP é obrigatório."
    if (!endereco?.bairro) errosTemp.bairro = "Bairro é obrigatório."
    
    if (Object.keys(errosTemp).length > 0) {
      setErros(errosTemp)
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios antes de salvar.",
        variant: "destructive",
      })
      return
    }

    setErros({})

    try {
      const formData = new FormData()
      
      // Adiciona os dados do imóvel
      const dadosImovel = {
        titulo: imovel?.titulo,
        descricao: imovel?.descricao,
        preco: valorTotal,
        numero_hospedes: parseInt(imovel?.numero_hospedes || "0"),
        regras: imovel?.regras,
        comodidades: comodidades,
      }
      
      formData.append('imovel', JSON.stringify(dadosImovel))

      // Adiciona o logo se existir
      if (imovel?.logo) {
        formData.append('logo', imovel.logo)
      }

      // Adiciona os dados do endereço
      const dadosEndereco = {
        rua: endereco?.rua,
        numero: endereco?.numero,
        cidade: endereco?.cidade,
        estado: endereco?.estado,
        cep: endereco?.cep,
        bairro: endereco?.bairro
      }
      
      formData.append('endereco', JSON.stringify(dadosEndereco))

      // Adiciona as imagens
      imagens.forEach((imagem) => {
        formData.append('imagens', imagem)
      })

      const response = await apiFetch("/api/imoveis/registrar/", {
        method: "POST",
        body: formData
      })

      if (response?.mensagem) {     
        toast({
          title: "Sucesso",
          description: response.mensagem,
        });
        router.push('/profile/owner');
      }
    } catch (error: any) {
      console.error('Erro ao criar anúncio:', error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível criar o anúncio",
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
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite o nome da propriedade"
                    value={imovel?.titulo || ""}
                    onChange={(e) => setImovel({ ...imovel!, titulo: e.target.value })}
                  />
                  <p className="text-red-500 text-sm mt-1">{erros.titulo}</p>
                </div>

                <div>
                  <Label className="block text-sm font-medium mb-1">Número de Hóspedes</Label>
                  <Input
                    type="number"
                    required
                    min="1"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Ex: 8"
                    value={imovel?.numero_hospedes || ""}
                    onChange={(e) => setImovel({ ...imovel!, numero_hospedes: e.target.value })}
                  />
                  <p className="text-red-500 text-sm mt-1">{erros.numero_hospedes}</p>
                </div>

                <div>
                  <Label className="block text-sm font-medium mb-1">Logo da Propriedade</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImovel({ ...imovel!, logo: file });
                      }
                    }}
                  />
                  <p className="text-sm text-gray-500 mt-1">Faça upload de uma logo para sua propriedade</p>
                  <p className="text-red-500 text-sm mt-1">{erros.logo}</p>
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
                <p className="text-red-500 text-sm mt-1">{erros.descricao}</p>
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
                <p className="text-red-500 text-sm mt-1">{erros.regras}</p>
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
                    required
                    value={endereco?.rua || ""}
                    onChange={(e) => setEndereco({...endereco!, rua: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite a rua"
                  />
                  <p className="text-red-500 text-sm mt-1">{erros.rua}</p>
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Bairro</Label>
                  <Input
                    type="text"
                    required
                    value={endereco?.bairro || ""}
                    onChange={(e) => setEndereco({...endereco!, bairro: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite o bairro"
                  />
                  <p className="text-red-500 text-sm mt-1">{erros.bairro}</p>
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Número</Label>
                  <Input
                    type="text"
                    required
                    value={endereco?.numero || ""}
                    onChange={(e) => setEndereco({...endereco!, numero: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite o número"
                  />
                  <p className="text-red-500 text-sm mt-1">{erros.numero}</p>
                </div>
              </div>      

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="block text-sm font-medium mb-1">Cidade</Label>
                  <Input
                    type="text"
                    required
                    value={endereco?.cidade || ""}
                    onChange={(e) => setEndereco({...endereco!, cidade: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite a cidade"
                  />
                  <p className="text-red-500 text-sm mt-1">{erros.cidade}</p>
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Estado</Label>
                  <Input
                    type="text"
                    required
                    value={endereco?.estado || ""}
                    onChange={(e) => setEndereco({...endereco!, estado: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite o estado"
                  />
                  <p className="text-red-500 text-sm mt-1">{erros.estado}</p>
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Cep</Label>
                  <Input
                    type="text"
                    required
                    value={endereco?.cep || ""}
                    onChange={(e) => setEndereco({...endereco!, cep: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite o estado"
                  />
                  <p className="text-red-500 text-sm mt-1">{erros.cep}</p>
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
                      required
                      value={valorTotal}
                      onChange={handleValorTotalChange}
                      className="w-full px-3 py-2 text-gray-700 focus:outline-none bg-white"
                      placeholder=""
                      onFocus={(e) => e.target.select()}
                    />
                    <p className="text-red-500 text-sm mt-1">{erros.preco}</p>
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
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  id="file-upload"
                  onChange={(e) => handleFileChange(e)}
                />
                <Label
                  htmlFor="file-upload"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-700 transition"
                >
                  Escolher Fotos
                </Label>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              {imagens.map((img, index) => (
                <div key={index} className="w-24 h-24 overflow-hidden rounded border border-gray-300">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Imagem ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3">
              <Button onClick={handleSave}>Salvar</Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )  
}
