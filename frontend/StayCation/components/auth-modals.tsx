"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"

export function AuthModals() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  // Função para alternar entre os modais
  const switchToRegister = () => {
    setIsLoginOpen(false)
    setIsRegisterOpen(true)
  }

  const switchToLogin = () => {
    setIsRegisterOpen(false)
    setIsLoginOpen(true)
  }

  const closeLoginModal = () => {
    setIsLoginOpen(false)
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
            <DialogDescription>Acesse sua conta para gerenciar suas chácaras ou fazer reservas.</DialogDescription>
          </DialogHeader>
          <LoginForm onRegisterClick={switchToRegister} isModal={true} onCloseModal={closeLoginModal} />
        </DialogContent>
      </Dialog>

      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogTrigger asChild>
          <Button>Cadastrar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Conta no StayCation</DialogTitle>
            <DialogDescription>Crie uma conta para alugar ou cadastrar chácaras.</DialogDescription>
          </DialogHeader>
          <RegisterForm onLoginClick={switchToLogin} isModal={true} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

