'use client'

import Link from "next/link"
import MainLayout from "@/components/layout/MainLayout"
import { Search, Filter, Calendar } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Reserva {
  id: number
  usuario: {
    id: number
    nome: string
    email: string
  }
  Imovel: {
    id: number
    titulo: string
  }
  data_inicio: string
  data_fim: string
  numero_hospedes: number
  valor_total: number
  status: string
}

export default function Bookings() {
  const router = useRouter()
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    completed: 0
  })

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/reservas/proprietario/', {
          credentials: 'include',
        })

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/auth/login')
            return
          }
          throw new Error('Erro ao buscar reservas')
        }

        const data = await response.json()
        
        // Garantir que data é um array
        const reservasArray = Array.isArray(data) ? data : []
        setReservas(reservasArray)

        // Calcular estatísticas
        const hoje = new Date()
        const upcoming = reservasArray.filter((reserva: Reserva) => 
          new Date(reserva.data_inicio) > hoje && reserva.status === 'CONFIRMADA'
        ).length

        const completed = reservasArray.filter((reserva: Reserva) => 
          new Date(reserva.data_fim) < hoje && reserva.status === 'CONFIRMADA'
        ).length

        setStats({
          total: reservasArray.length,
          upcoming,
          completed
        })

      } catch (error) {
        console.error('Erro ao buscar reservas:', error)
        setError('Erro ao carregar reservas')
      } finally {
        setLoading(false)
      }
    }

    fetchReservas()
  }, [])

  const handleStatusChange = async (reservaId: number, newStatus: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/reservas/${reservaId}/${newStatus.toLowerCase()}/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        }
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar status')
      }

      // Atualizar a lista de reservas
      setReservas(reservas.map(reserva => 
        reserva.id === reservaId 
          ? { ...reserva, status: newStatus }
          : reserva
      ))

    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      setError('Erro ao atualizar status da reserva')
    }
  }

  function getCSRFToken() {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];
    return cookieValue || '';
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Reservas</h1>
            <p className="text-gray-600">Gerencie as reservas dos seus imóveis</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <Calendar className="mr-2 text-primary" />
            <span className="text-gray-600">Hoje: {format(new Date(), 'dd/MM/yyyy', { locale: ptBR })}</span>
          </div>
        </div>


        {/* Booking Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-500 text-sm mb-2">Total de Reservas</h3>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-500 text-sm mb-2">Próximas Reservas</h3>
            <p className="text-3xl font-bold">{stats.upcoming}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-500 text-sm mb-2">Reservas Concluídas</h3>
            <p className="text-3xl font-bold">{stats.completed}</p>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">Todas as Reservas</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hóspede
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Imóvel
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check In
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hóspedes
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center">
                      Carregando reservas...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-red-600">
                      {error}
                    </td>
                  </tr>
                ) : reservas.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                      Nenhuma reserva encontrada
                    </td>
                  </tr>
                ) : (
                  reservas.map((reserva) => (
                    <tr key={reserva.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={`/placeholder.svg?height=40&width=40&text=${reserva.usuario.nome.charAt(0)}`}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{reserva.usuario.nome}</div>
                            <div className="text-sm text-gray-500">{reserva.usuario.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{reserva.Imovel.titulo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {format(new Date(reserva.data_inicio), 'dd/MM/yyyy', { locale: ptBR })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {format(new Date(reserva.data_fim), 'dd/MM/yyyy', { locale: ptBR })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{reserva.numero_hospedes}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          R$ {Number(reserva.valor_total).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            reserva.status === "CONFIRMADA"
                              ? "bg-green-100 text-green-800"
                              : reserva.status === "PENDENTE"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {reserva.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

