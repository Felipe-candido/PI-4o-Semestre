"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface LoginFormProps {
  onRegisterClick?: () => void
  isModal?: boolean
}

export function LoginForm({ onRegisterClick, isModal = false }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar lógica de login
    console.log("Login com:", { email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Senha</Label>
          <Button variant="link" className="p-0 h-auto" type="button">
            Esqueceu a senha?
          </Button>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Entrar
      </Button>
      {isModal ? (
        <div className="text-center text-sm">
          Não tem uma conta?{" "}
          <Button variant="link" className="p-0 h-auto" onClick={onRegisterClick} type="button">
            Cadastre-se
          </Button>
        </div>
      ) : (
        <div className="text-center text-sm">
          Não tem uma conta?{" "}
          <a href="/register" className="text-primary hover:underline">
            Cadastre-se
          </a>
        </div>
      )}
    </form>
  )
}

