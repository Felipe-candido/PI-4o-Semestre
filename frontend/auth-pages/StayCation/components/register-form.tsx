"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"

interface RegisterFormProps {
  onLoginClick?: () => void
  isModal?: boolean
}

export function RegisterForm({ onLoginClick, isModal = false }: RegisterFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userType, setUserType] = useState("renter")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar lógica de registro
    console.log("Registro com:", { name, email, password, userType })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo</Label>
        <Input id="name" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
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
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar senha</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Tipo de usuário</Label>
        <RadioGroup value={userType} onValueChange={setUserType} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="renter" id="renter" />
            <Label htmlFor="renter" className="cursor-pointer">
              Locatário
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="owner" id="owner" />
            <Label htmlFor="owner" className="cursor-pointer">
              Proprietário
            </Label>
          </div>
        </RadioGroup>
      </div>
      <Button type="submit" className="w-full">
        Criar conta
      </Button>
      {isModal ? (
        <div className="text-center text-sm">
          Já tem uma conta?{" "}
          <Button variant="link" className="p-0 h-auto" onClick={onLoginClick} type="button">
            Faça login
          </Button>
        </div>
      ) : (
        <div className="text-center text-sm">
          Já tem uma conta?{" "}
          <a href="/login" className="text-primary hover:underline">
            Faça login
          </a>
        </div>
      )}
    </form>
  )
}

