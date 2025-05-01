'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  Search,
  User,
  LogIn,
  Calendar,
  Settings,
  PlusCircle,
  DollarSign,
  Users,
  CheckSquare,
  Menu,
  X,
  LogOut,
  FileText,
} from "lucide-react"

import { apiFetch } from '@/lib/api'



interface UserData {
  id: string
  nome: string
  email: string
  tipo: string
  avatar?: string
}


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const [user, setUser] = useState<UserData | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchUser() {
      const response = await apiFetch("/api/me")
      const user = response.user
      console.log("Usuário logado:", user)
      setUser(user)
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    try {
      await apiFetch('/api/logout/', {
        method: 'POST'
      })
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Erro no logout:', error)
    }
  }

  const userRole = user?.tipo || "visitante"
  const userName = user?.nome || "Visitante"
  const userAvatar = user?.avatar || "/placeholder.svg"

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  // Navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { name: "Início", path: "/", icon: <Home size={20} /> },
      { name: "Buscar Propriedades", path: "/search", icon: <Search size={20} /> },
    ]

    if (userRole === "visitante") {
      return commonItems
    }

    if (userRole === "locatario") {
      return [
        ...commonItems,
        { name: "Minhas Reservas", path: "/dashboard/bookings", icon: <Calendar size={20} /> },
        { name: "Perfil", path: "/profile/tenant", icon: <User size={20} /> },
      ]
    }

    if (userRole === "proprietario") {
      return [
        { name: "Painel", path: "/dashboard", icon: <Settings size={20} /> },
        { name: "Meus Imóveis", path: "/dashboard/properties", icon: <Home size={20} /> },
        { name: "Criar Anúncio", path: "/dashboard/properties/new", icon: <PlusCircle size={20} /> },
        {
          name: "Reservas",
          path: "/dashboard/bookings",
          icon: <Calendar size={20} />,
        },
        { name: "Ganhos", path: "/dashboard/earnings", icon: <DollarSign size={20} /> },
        { name: "Perfil", path: "/profile/owner", icon: <User size={20} /> },
      ]
    }

    if (userRole === "admin") {
      return [
        { name: "Painel Admin", path: "/admin", icon: <Settings size={20} /> },
        { name: "Gerenciar Imóveis", path: "/admin/approvals", icon: <CheckSquare size={20} /> },
        { name: "Gerenciar Usuários", path: "/admin/users", icon: <Users size={20} /> },
        { name: "Relatórios", path: "/admin/reports", icon: <FileText size={20} /> },
        { name: "Cadastro Admin", path: "/admin/register", icon: <User size={20} /> },
        { name: "Perfil", path: "/profile/admin", icon: <User size={20} /> },
      ]
    }

    return commonItems
  }

  return (
    <header className="bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-bold text-xl text-primary">StayCation</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {getNavItems().map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center text-sm font-medium ${
                  isActive(item.path)
                    ? "text-secondary"
                    : "text-gray-700 hover:text-secondary dark:text-gray-300 dark:hover:text-secondary"
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Profile or Login/Register */}
          <div className="hidden md:flex items-center">
            {userRole !== "visitante" ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <img src={userAvatar || "/placeholder.svg"} alt={userName} className="w-8 h-8 rounded-full mr-2" />
                  <span className="font-medium text-gray-900 dark:text-white">{userName}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout()
                  }}
                  className="text-gray-700 dark:text-gray-300 hover:text-secondary dark:hover:text-secondary"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-secondary dark:hover:text-secondary"
                >
                  Entrar
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-secondary hover:bg-secondary/90 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              {getNavItems().map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={closeMenu}
                  className={`flex items-center p-2 rounded-md ${
                    isActive(item.path)
                      ? "bg-gray-100 dark:bg-gray-700 text-secondary"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}

              {/* Add login/register links for visitors on mobile */}
              {userRole === "visitante" && (
                <>
                  <Link
                    href="/auth/login"
                    onClick={closeMenu}
                    className="flex items-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogIn size={20} className="mr-3" />
                    Entrar
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={closeMenu}
                    className="flex items-center p-2 rounded-md bg-secondary text-white"
                  >
                    <User size={20} className="mr-3" />
                    Cadastrar
                  </Link>
                </>
              )}

              {/* Add logout for logged in users on mobile */}
              {userRole !== "visitante" && (
                <button
                  onClick={() => {
                    handleLogout()
                    closeMenu()
                  }}
                  className="flex items-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut size={20} className="mr-3" />
                  Sair
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

