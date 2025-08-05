"use client"

import Link from "next/link"
import MainLayout from "@/components/layout/MainLayout"
import { z } from "zod"
import {zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"


const registerSchema = z
  .object({
    nome: z.string(),
    sobrenome: z.string(),
    email: z.string().email("Por favor digite um email válido"),
    password: z.string().min(3, "A senha deve ter no mínimo 8 dígitos"),
    confirmaSenha: z.string().min(3, "A senha deve ter no mínimo 8 dígitos"),
  })

type RegisterFormValues = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onLoginClick: () => void
  onRegistrationSuccess?: () => void;
}


export default function RegisterForm({ onLoginClick, onRegistrationSuccess }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const userRole = "visitor"
  const userName = "Guest"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  // INICIA O FORM
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nome: "",
      sobrenome: "",
      email: "",
      password: "",
      confirmaSenha: "",
    },
  })

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true)

    try {
      //URL DO BACKEND DJANGO
      const response = await fetch("http://localhost:8000/api/registrando/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok){
        // PRIMEIRA MUDANÇA: Verifica se o erro é específico do campo 'email'
        if (result.email && Array.isArray(result.email) && result.email.length > 0) {
            form.setError('email', {
                type: 'manual',
                message: result.email[0] // Pega a primeira mensagem do array
            });
        } 
        // SEGUNDA MUDANÇA: Verifica se o erro é um 'detail' genérico
        else if (result.detail) {
            toast({
                title: "Falha no registro",
                description: result.detail, // Usa a mensagem do 'detail'
                variant: "destructive"
            });
        } 
        // TERCEIRA MUDANÇA: Erros de validação do formulário DRF (ex: "password": ["This field is required."])
        // O `serializer.errors` do DRF pode retornar vários erros de campo.
        else if (Object.keys(result).length > 0) {
            // Itera sobre os erros retornados pelo backend e os define no formulário
            for (const fieldName in result) {
                if (form.getValues(fieldName as keyof RegisterFormValues) !== undefined) { // Verifica se o campo existe no nosso formulário
                    form.setError(fieldName as keyof RegisterFormValues, {
                        type: 'manual',
                        message: Array.isArray(result[fieldName]) ? result[fieldName][0] : result[fieldName]
                    });
                } else {
                    // Se for um campo que não mapeamos ou um erro inesperado, exibe um toast genérico
                    toast({
                        title: `Erro no campo: ${fieldName}`,
                        description: Array.isArray(result[fieldName]) ? result[fieldName][0] : result[fieldName],
                        variant: "destructive"
                    });
                }
            }
        }
        else {
            // Erro genérico se não for nenhum dos casos acima
            toast({
                title: "Falha no registro",
                description: "Algo deu errado e não foi possível identificar o erro.",
                variant: "destructive"
            });
        }
        return; // Importante para parar a execução após lidar com o erro
      } 
        

      toast({
        title: "Registrado com sucesso",
        description: "Sua conta foi criada"
      })
      
      // REDIRECIONAR PARA O LOGIN
      router.push('/auth/login'); 
       
      onRegistrationSuccess?.();
      if (onLoginClick) onLoginClick();
      
    } 
    
    catch (error) {
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
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Nova Conta</h1>
              <p className="text-gray-600">Faça parte da Staycation</p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-gray-700">Nome</FormLabel>
                        <FormControl>
                          <Input 
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:opacity-100 focus:ring-primary focus:border-primary"
                            placeholder="Digite seu nome" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="sobrenome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-gray-700">Sobrenome</FormLabel>
                        <FormControl>
                          <Input
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                            placeholder:text-gray-400 placeholder:opacity-100 focus:ring-primary focus:border-primary"
                            placeholder="Digite seu sobrenome"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:opacity-100 focus:ring-primary focus:border-primary"
                          placeholder="exemplo@mail.com"
                          {...field}
                        />
                      </FormControl>  
                      <FormMessage className="text-xs text-red-500" />                                              
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700">Senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:opacity-100 focus:ring-primary focus:border-primary"
                          placeholder="Crie uma senha"
                          {...field}
                        />
                      </FormControl>
                      <p className="mt-1 text-xs text-gray-500">
                        A senha precisa ter pelo menos 8 digitos
                      </p>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmaSenha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700">Confirme a senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:opacity-100 focus:ring-primary focus:border-primary"
                          placeholder="Crie uma senha"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Criar Conta
                  </button>
                </div>
              </form>
            </Form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">ou continue com</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.09.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.36 14.83c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
              Ja tem uma conta?{" "}
              <Link href="/auth/login" className="text-primary hover:text-primary/80 font-medium">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

