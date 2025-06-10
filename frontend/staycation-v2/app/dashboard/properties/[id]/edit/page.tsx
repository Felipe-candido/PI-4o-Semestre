"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import MainLayout from "@/components/layout/MainLayout"

export default function EditImovelPage() {
  const { id } = useParams()
  const router = useRouter()
  const [imovel, setImovel] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<any>({})
  const [comodidade, setComodidade] = useState("")
  const [imagens, setImagens] = useState<File[]>([])
  const [deleting, setDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    async function fetchImovel() {
      try {
        const res = await fetch(`http://localhost:8000/api/imoveis/propriedade/?id=${id}`, {
          credentials: "include",
        })
        if (!res.ok) throw new Error("Erro ao buscar imóvel")
        const data = await res.json()
        setImovel(data)
        setForm({
          titulo: data.titulo,
          descricao: data.descricao,
          preco: data.preco,
          numero_hospedes: data.numero_hospedes,
          regras: data.regras,
          comodidades: data.comodidades || [],
          logo: data.logo || null,
        })
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchImovel()
  }, [id])

  function handleChange(e: any) {
    const { name, value } = e.target
    setForm((prev: any) => ({ ...prev, [name]: value }))
  }

  function handleAddComodidade(e: any) {
    if (e.key === "Enter") {
      e.preventDefault()
      const trimmed = comodidade.trim()
      if (trimmed && !form.comodidades.includes(trimmed)) {
        setForm((prev: any) => ({ ...prev, comodidades: [...prev.comodidades, trimmed] }))
      }
      setComodidade("")
    }
  }

  function handleRemoveComodidade(item: string) {
    setForm((prev: any) => ({ ...prev, comodidades: prev.comodidades.filter((c: string) => c !== item) }))
  }

  function handleFileChange(e: any) {
    if (e.target.files) {
      const arquivos = Array.from(e.target.files)
      setImagens((prev: File[]) => [...prev, ...arquivos as File[]])
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault()
    setSaving(true)
    setError("")
    try {
      const formData = new FormData()
      
      // Cria um objeto com os dados do imóvel
      const imovelData = {
        titulo: form.titulo,
        descricao: form.descricao,
        preco: form.preco,
        numero_hospedes: form.numero_hospedes,
        regras: form.regras,
        comodidades: form.comodidades
      }
      
      // Adiciona os dados do imóvel como JSON
      formData.append("imovel", JSON.stringify(imovelData))
      
      // Adiciona o logo se existir
      if (form.logo && typeof form.logo !== "string") {
        formData.append("logo", form.logo)
      }
      
      // Adiciona as imagens
      imagens.forEach((imagem) => {
        formData.append("imagens", imagem)
      })

      const res = await fetch(`http://localhost:8000/api/imoveis/editar/${id}/`, {
        method: "PATCH",
        credentials: "include",
        body: formData
      })
      
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.erro || "Erro ao salvar alterações")
      }
      
      router.push("/dashboard/properties")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true)
      return
    }

    setDeleting(true)
    setError("")
    try {
      const res = await fetch(`http://localhost:8000/api/imoveis/editar/${id}/`, {
        method: "DELETE",
        credentials: "include"
      })
      
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.erro || "Erro ao excluir imóvel")
      }
      
      router.push("/dashboard/properties")
    } catch (err: any) {
      setError(err.message)
      setShowDeleteConfirm(false)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <MainLayout><div className="container mx-auto px-4 py-8 text-center">Carregando imóvel...</div></MainLayout>
  if (error) return <MainLayout><div className="container mx-auto px-4 py-8 text-center text-red-500">Erro: {error}</div></MainLayout>

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Editar Imóvel</h1>
          <button
            type="button"
            onClick={handleDelete}
            className={`px-4 py-2 rounded ${
              showDeleteConfirm 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-red-500 hover:bg-red-600'
            } text-white transition-colors`}
            disabled={deleting}
          >
            {deleting 
              ? "Excluindo..." 
              : showDeleteConfirm 
                ? "Confirmar exclusão" 
                : "Excluir imóvel"}
          </button>
        </div>
        {showDeleteConfirm && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
            Tem certeza que deseja excluir este imóvel? Esta ação não pode ser desfeita.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Título</label>
            <input name="titulo" value={form.titulo || ""} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium">Descrição</label>
            <textarea name="descricao" value={form.descricao || ""} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium">Preço</label>
            <input name="preco" type="number" value={form.preco || ""} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium">Número de hóspedes</label>
            <input name="numero_hospedes" type="number" value={form.numero_hospedes || ""} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium">Regras</label>
            <textarea name="regras" value={form.regras || ""} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium">Comodidades</label>
            <input
              type="text"
              value={comodidade}
              onChange={e => setComodidade(e.target.value)}
              onKeyDown={handleAddComodidade}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              placeholder="Digite e pressione Enter para adicionar"
            />
            <div className="flex flex-wrap gap-2">
              {form.comodidades?.map((item: string, idx: number) => (
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
          <div>
            <label className="block font-medium">Logo da Propriedade</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) setForm((prev: any) => ({ ...prev, logo: file }));
              }}
            />

          </div>
          <div>
            <label className="block font-medium">Fotos</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={handleFileChange}
            />
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
          </div>
          <button type="submit" className="bg-primary text-white px-6 py-2 rounded" disabled={saving}>{saving ? "Salvando..." : "Salvar alterações"}</button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
      </div>
    </MainLayout>
  )
} 