"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface User {
  id: number;
  email: string;
  nome: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// Função genérica para chamadas API
async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro na requisição');
  }

  return response.json();
}

export function AuthModals() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  

  // Função para verificar autenticação
  const checkAuth = async () => {
    try {
      const userData = await apiFetch('/api/me/')
      setUser(userData)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // Efeito para verificar autenticação ao carregar
  useEffect(() => {
    checkAuth()
  }, [])

  // Função de logout
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

  // Funções simplificadas para alternar entre modais
  const switchToRegister = () => {
    setIsLoginOpen(false)
    setIsRegisterOpen(true)
  }

  const switchToLogin = () => {
    setIsRegisterOpen(false)
    setIsLoginOpen(true)
  }
  
  const handleLoginSuccess = (userData: User) => {
    setIsLoginOpen(false);
    setUser(userData); // Atualiza o estado do usuário diretamente
  };


  if (loading) {
    return <div className="h-10 w-20 animate-pulse bg-gray-200 rounded-md"></div>
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 p-1">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {user.nome ? user.nome.charAt(0).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">{user.nome || user.email.split('@')[0]}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push('/perfil')}>
              Meu Perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/reservas')}>
              Minhas Reservas
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600"
            >
              Desconectar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost">Entrar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Entrar no StayCation</DialogTitle>
            <DialogDescription>
              Acesse sua conta para gerenciar suas chácaras ou fazer reservas.
            </DialogDescription>
          </DialogHeader>
          <LoginForm 
            onRegisterClick={switchToRegister} 
            isModal={true}
            onSuccess={() => {
              setIsLoginOpen(false)
              checkAuth() // Verifica autenticação após login bem-sucedido
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogTrigger asChild>
          <Button>Cadastrar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Conta</DialogTitle>
          </DialogHeader>
          <RegisterForm
            onLoginClick={switchToLogin}
            isModal={true}
            onRegistrationSuccess={() => setIsRegisterOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}