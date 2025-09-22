"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { apiFetch } from "@/lib/api"

// Componentes de UI
import MainLayout from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Ícones
import { Check, ChevronLeft, ChevronRight, Circle, DollarSign, Home, ImageIcon, List, MapPin, Sparkles, UploadCloud, X } from "lucide-react"

// --- Interfaces de Tipos ---
interface UserData {
  id: string
  nome: string
  avatar: string
}

interface FormData {
  titulo: string
  descricao: string
  numero_hospedes: number
  regras: string
  rua: string
  numero: string
  bairro: string
  cidade: string
  estado: string
  cep: string
  preco: number
  comodidades: string[]
  logo: File | null
  imagens: File[]
}

// --- Componente Principal ---
export default function CreateListingPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<FormData>({
    titulo: "",
    descricao: "",
    numero_hospedes: 1,
    regras: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    preco: 0,
    comodidades: [],
    logo: null,
    imagens: []
  });

  const [comodidadeInput, setComodidadeInput] = useState("")
  
  const router = useRouter()

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const response = await apiFetch("/api/me/", { credentials: 'include' })
        setUser(response.user)
      } catch (error) {
        router.push('/auth/login')
        toast({
          title: "Sessão Expirada",
          description: "Por favor, faça login para continuar.",
          variant: "destructive",
        })
      }
    }
    fetchUsuario()
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'logo' | 'imagens') => {
    const files = e.target.files;
    if (files) {
      if (fieldName === 'logo') {
        setFormData(prev => ({ ...prev, logo: files[0] }));
      } else {
        setFormData(prev => ({ ...prev, imagens: [...prev.imagens, ...Array.from(files)] }));
      }
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
        ...prev,
        imagens: prev.imagens.filter((_, i) => i !== index)
    }));
  }

  const steps = [
    { id: 1, title: "Descrição", icon: <Home className="h-5 w-5" />, fields: ['titulo', 'descricao', 'numero_hospedes', 'regras'] },
    { id: 2, title: "Localização", icon: <MapPin className="h-5 w-5" />, fields: ['rua', 'numero', 'bairro', 'cidade', 'estado', 'cep'] },
    { id: 3, title: "Detalhes", icon: <Sparkles className="h-5 w-5" />, fields: ['comodidades'] },
    { id: 4, title: "Mídia e Preço", icon: <ImageIcon className="h-5 w-5" />, fields: ['logo', 'imagens', 'preco'] },
  ];

  const validateStep = (currentStep: number) => {
    const newErrors: { [key: string]: string } = {};
    const stepFields = steps.find(s => s.id === currentStep)?.fields || [];
    
    stepFields.forEach(field => {
      const value = formData[field as keyof FormData];
      if (typeof value === 'string' && !value.trim()) {
        newErrors[field] = "Este campo é obrigatório.";
      } else if (typeof value === 'number' && value <= 0) {
        newErrors[field] = "O valor deve ser maior que zero.";
      } else if (Array.isArray(value) && value.length === 0 && field === 'imagens') {
        newErrors[field] = "Adicione pelo menos uma imagem.";
      } else if (value === null && (field === 'logo')) {
          newErrors[field] = "O logo é obrigatório.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const nextStep = () => {
    if (validateStep(step)) {
      if (step < steps.length) {
        setStep(step + 1);
      }
    } else {
       toast({ title: "Campos Incompletos", description: "Por favor, preencha todos os campos obrigatórios.", variant: "destructive" });
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSave = async () => {
     if (!validateStep(4)) {
        toast({ title: "Revisão Necessária", description: "Verifique os campos da última etapa.", variant: "destructive" });
        return;
     }

    setIsSubmitting(true);
    const data = new FormData();

    // Organiza os dados para a API
    const imovelData = {
        titulo: formData.titulo,
        descricao: formData.descricao,
        preco: formData.preco,
        numero_hospedes: Number(formData.numero_hospedes),
        regras: formData.regras,
        comodidades: formData.comodidades,
    };
    const enderecoData = {
        rua: formData.rua,
        numero: formData.numero,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
        cep: formData.cep,
    };

    data.append('imovel', JSON.stringify(imovelData));
    data.append('endereco', JSON.stringify(enderecoData));

    if (formData.logo) {
      data.append('logo', formData.logo);
    }
    formData.imagens.forEach(img => {
      data.append('imagens', img);
    });

    try {
        const response = await apiFetch("/api/imoveis/registrar/", {
            method: "POST",
            body: data
        });
        toast({
            title: "Sucesso!",
            description: "Seu anúncio foi criado e está aguardando aprovação.",
        });
        router.push('/profile/owner');
    } catch (error: any) {
        console.error('Erro ao criar anúncio:', error);
        toast({
            title: "Erro Inesperado",
            description: error.message || "Não foi possível criar o anúncio. Tente novamente.",
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <MainLayout userName={user?.nome || "..."} userAvatar={user?.avatar || ""}>
      <div className="bg-slate-50/50 min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
           <h1 className="text-3xl font-bold text-slate-800 mb-2">Criar Novo Anúncio</h1>
           <p className="text-slate-500 mb-8">Siga as etapas para cadastrar sua propriedade na plataforma.</p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Barra de Navegação das Etapas */}
            <aside className="lg:col-span-1">
              <nav className="space-y-2">
                {steps.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                        // Permite navegar para etapas já concluídas
                        if (s.id < step) setStep(s.id);
                    }}
                    disabled={s.id > step}
                    className={`w-full flex items-center gap-3 p-3 rounded-md text-left transition-colors text-sm font-medium ${
                      step === s.id
                        ? 'bg-sky-100 text-sky-700'
                        : step > s.id
                        ? 'bg-green-50 text-green-700 hover:bg-green-100'
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {step > s.id ? <Check className="h-5 w-5" /> : s.icon}
                    <span>{s.title}</span>
                  </button>
                ))}
              </nav>
            </aside>

            {/* Conteúdo da Etapa Atual */}
            <main className="lg:col-span-3">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>{steps.find(s => s.id === step)?.title}</CardTitle>
                  <CardDescription>
                    {
                      step === 1 ? "Forneça os detalhes básicos da sua propriedade." :
                      step === 2 ? "Onde seus hóspedes podem encontrar o local?" :
                      step === 3 ? "Liste as comodidades que sua propriedade oferece." :
                      "Adicione fotos e defina o preço por noite."
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Renderiza o conteúdo da etapa atual */}
                    {step === 1 && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="titulo">Nome da Propriedade</Label>
                          <Input id="titulo" name="titulo" value={formData.titulo} onChange={handleInputChange} placeholder="Ex: Chácara Recanto do Sol" className={errors.titulo ? 'border-red-500' : ''}/>
                           {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>}
                        </div>
                        <div>
                            <Label htmlFor="descricao">Descrição</Label>
                            <Textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleInputChange} placeholder="Descreva o espaço, os destaques e o que o torna único." rows={4} className={errors.descricao ? 'border-red-500' : ''}/>
                            {errors.descricao && <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="numero_hospedes">Máximo de Hóspedes</Label>
                                <Input id="numero_hospedes" name="numero_hospedes" type="number" min="1" value={formData.numero_hospedes} onChange={handleInputChange} className={errors.numero_hospedes ? 'border-red-500' : ''}/>
                                {errors.numero_hospedes && <p className="text-red-500 text-sm mt-1">{errors.numero_hospedes}</p>}
                            </div>
                        </div>
                        <div>
                          <Label htmlFor="regras">Regras da Casa</Label>
                          <Textarea id="regras" name="regras" value={formData.regras} onChange={handleInputChange} placeholder="Ex: Não são permitidas festas. Proibido fumar dentro de casa." rows={3} className={errors.regras ? 'border-red-500' : ''}/>
                          {errors.regras && <p className="text-red-500 text-sm mt-1">{errors.regras}</p>}
                        </div>
                      </div>
                    )}
                     {step === 2 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="md:col-span-2">
                             <Label htmlFor="rua">Rua</Label>
                             <Input id="rua" name="rua" value={formData.rua} onChange={handleInputChange} className={errors.rua ? 'border-red-500' : ''} />
                             {errors.rua && <p className="text-red-500 text-sm mt-1">{errors.rua}</p>}
                           </div>
                           <div>
                             <Label htmlFor="numero">Número</Label>
                             <Input id="numero" name="numero" value={formData.numero} onChange={handleInputChange} className={errors.numero ? 'border-red-500' : ''}/>
                             {errors.numero && <p className="text-red-500 text-sm mt-1">{errors.numero}</p>}
                           </div>
                           <div>
                             <Label htmlFor="bairro">Bairro</Label>
                             <Input id="bairro" name="bairro" value={formData.bairro} onChange={handleInputChange} className={errors.bairro ? 'border-red-500' : ''}/>
                              {errors.bairro && <p className="text-red-500 text-sm mt-1">{errors.bairro}</p>}
                           </div>
                           <div>
                             <Label htmlFor="cidade">Cidade</Label>
                             <Input id="cidade" name="cidade" value={formData.cidade} onChange={handleInputChange} className={errors.cidade ? 'border-red-500' : ''}/>
                             {errors.cidade && <p className="text-red-500 text-sm mt-1">{errors.cidade}</p>}
                           </div>
                           <div>
                             <Label htmlFor="estado">Estado</Label>
                             <Input id="estado" name="estado" value={formData.estado} onChange={handleInputChange} className={errors.estado ? 'border-red-500' : ''}/>
                             {errors.estado && <p className="text-red-500 text-sm mt-1">{errors.estado}</p>}
                           </div>
                           <div>
                             <Label htmlFor="cep">CEP</Label>
                             <Input id="cep" name="cep" value={formData.cep} onChange={handleInputChange} className={errors.cep ? 'border-red-500' : ''}/>
                             {errors.cep && <p className="text-red-500 text-sm mt-1">{errors.cep}</p>}
                           </div>
                        </div>
                     )}
                     {step === 3 && (
                        <div>
                            <Label htmlFor="comodidadeInput">Comodidades</Label>
                            <Input 
                                id="comodidadeInput"
                                value={comodidadeInput}
                                onChange={(e) => setComodidadeInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        const trimmed = comodidadeInput.trim();
                                        if (trimmed && !formData.comodidades.includes(trimmed)) {
                                            setFormData(prev => ({ ...prev, comodidades: [...prev.comodidades, trimmed]}));
                                        }
                                        setComodidadeInput("");
                                    }
                                }}
                                placeholder="Digite uma comodidade (ex: Wi-Fi, Piscina) e pressione Enter"
                            />
                            <div className="flex flex-wrap gap-2 mt-4">
                                {formData.comodidades.map((item, index) => (
                                    <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                                        {item}
                                        <button onClick={() => setFormData(prev => ({...prev, comodidades: prev.comodidades.filter(c => c !== item)}))} className="ml-2 rounded-full hover:bg-slate-300 p-0.5">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        </div>
                     )}
                     {step === 4 && (
                        <div className="space-y-6">
                            <div>
                               <Label>Logo da Propriedade</Label>
                                <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${errors.logo ? 'border-red-500' : 'border-slate-300'} border-dashed rounded-md`}>
                                <div className="space-y-1 text-center">
                                    <Home className="mx-auto h-12 w-12 text-slate-400" />
                                    <div className="flex text-sm text-slate-600">
                                    <Label htmlFor="logo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-sky-600 hover:text-sky-500 focus-within:outline-none">
                                        <span>{formData.logo ? "Trocar logo" : "Carregar um arquivo"}</span>
                                        <Input id="logo-upload" name="logo" type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileChange(e, 'logo')} />
                                    </Label>
                                    </div>
                                    <p className="text-xs text-slate-500">{formData.logo ? formData.logo.name : "PNG, JPG, GIF até 10MB"}</p>
                                </div>
                                </div>
                                {errors.logo && <p className="text-red-500 text-sm mt-1">{errors.logo}</p>}
                            </div>

                            <div>
                                <Label>Galeria de Imagens</Label>
                                <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${errors.imagens ? 'border-red-500' : 'border-slate-300'} border-dashed rounded-md`}>
                                    <div className="space-y-1 text-center">
                                        <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                                        <Label htmlFor="image-upload" className="cursor-pointer font-medium text-sky-600 hover:text-sky-500">
                                        Clique para carregar
                                        <Input id="image-upload" name="imagens" type="file" multiple className="sr-only" accept="image/*" onChange={(e) => handleFileChange(e, 'imagens')} />
                                        </Label>
                                    </div>
                                </div>
                                {errors.imagens && <p className="text-red-500 text-sm mt-1">{errors.imagens}</p>}

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                                {formData.imagens.map((file, index) => (
                                    <div key={index} className="relative group aspect-square">
                                    <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} className="w-full h-full object-cover rounded-md" />
                                    <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X className="h-4 w-4" />
                                    </button>
                                    </div>
                                ))}
                                </div>
                            </div>
                            
                            <div>
                                <Label htmlFor="preco">Preço por Noite</Label>
                                <div className="relative">
                                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                  <Input id="preco" name="preco" type="number" value={formData.preco || ''} onChange={handleInputChange} placeholder="0,00" className={`pl-10 ${errors.preco ? 'border-red-500' : ''}`} />
                                </div>
                                {errors.preco && <p className="text-red-500 text-sm mt-1">{errors.preco}</p>}
                            </div>
                        </div>
                     )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={prevStep} disabled={step === 1}>
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Voltar
                    </Button>
                    {step < steps.length ? (
                        <Button onClick={nextStep} className="bg-sky-600 hover:bg-sky-700">
                            Próximo
                            <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                    ) : (
                        <Button onClick={handleSave} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
                            {isSubmitting ? "Salvando..." : "Salvar Anúncio"}
                        </Button>
                    )}
                </CardFooter>
              </Card>
            </main>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}