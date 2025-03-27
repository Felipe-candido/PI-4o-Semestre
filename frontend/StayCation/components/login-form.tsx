'use client'

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "./ui/use-toast"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"

const loginSchema = z.object({
  email: z.string().email("O campo email é obrigatório"),
  password: z.string().min(1, "A senha é obrigatória"),
})

type LoginFormValues = z.infer<typeof loginSchema>

interface LoginFormProps {
  onRegisterClick?: () => void
  isModal?: boolean
  onCloseModal?: () => void
}

export function LoginForm({ onRegisterClick, isModal = false, onCloseModal }: LoginFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:8000/api/entrar/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(`Status: ${response.status}, Detalhes: ${JSON.stringify(result)}`)
      }

      localStorage.setItem("token", result.token)

      toast({
        title: "Conta conectada",
        description: "Conta conectada com sucesso.",
      })

      
      router.push("/dashboard")
      if (onCloseModal) {
        onCloseModal()
      }

    } catch (error) {
      console.error("Erro ao entrar:", error)
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Algo deu errado",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
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
    </FormProvider>
  )
}


