'use client'

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"

export default function ConfirmacaoPagamento() {
  const router = useRouter()
  const params = useParams()
  const reservaId = params.id

  useEffect(() => {
    // Chama o backend para confirmar a reserva
    async function confirmarReserva() {
      try {
        await fetch(`http://localhost:8000/api/reservas/confirma/${reservaId}/confirmar/`, {
          method: "POST",
          credentials: "include",
        })
      } catch (e) {
        // Se quiser, trate o erro aqui
      }
    }
    confirmarReserva()

    // Aguarda 2 segundos e redireciona para as reservas
    const timer = setTimeout(() => {
      router.push("/dashboard/earnings")
    }, 2000)
    return () => clearTimeout(timer)
  }, [router, reservaId])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Pagamento aprovado!</h1>
      <p className="text-gray-600">Você será redirecionado para suas reservas em instantes...</p>
    </div>
  )
}