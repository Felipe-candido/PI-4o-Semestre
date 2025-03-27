"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { toast } from "./ui/use-toast"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useForm } from "react-hook-form"

// VALIDACAO DO FROMULARIO
const registerSchema = z
  .object({
    nome: z.string().min(3, "O nome deve ter no mínimo 3 letras"),
    email: z.string().email("Por favor digite um email válido"),
    password: z.string().min(3, "A senha deve ter no mínimo 3 dígitos"),
    confirmaSenha: z.string().min(3, "A senha deve ter no mínimo 3 dígitos"),
  })
  .refine((data) => data.password === data.confirmaSenha, {
    message: "As senhas nao coincidem",
    path: ["confirmaSenha"],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onLoginClick?: () => void
  isModal?: boolean
}

export function RegisterForm({ onLoginClick, isModal = false }: RegisterFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)


  // INICIA O FORM
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nome: "",
      email: "",
      password: "",
      confirmaSenha: "",
    },
  })


  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true)

    try {
      const { confirmaSenha, ...registerData} = data

      //URL DO BACKEND DJANGO
      const response = await fetch("http://localhost:8000/api/registrar/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData)
      })

      const result = await response.json()

      if (!response.ok){
        throw new Error (result.detail || "Falha no registro")
      }

      toast({
        title: "Registrado com sucesso",
        description: "Sua conta foi criada"
      })

      // REDIRECIONAR PARA O LOGIN
      if (onLoginClick) onLoginClick();
      
    } catch (error) {
        console.error("Erro no registro:", error)
        toast({
          title: "Falha no registro",
          description: error instanceof Error ? error.message : "Algo deu errado",
          variant: "destructive"
        })
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Digite seu email" {...field} />
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
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Crie uma senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="confirmaSenha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme sua senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirme sua senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Criar conta"}
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
    </Form>
  )
}

