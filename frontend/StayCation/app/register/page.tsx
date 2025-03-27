"use client"

import { RegisterForm } from "@/components/register-form"

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta</h1>
        <RegisterForm />
      </div>
    </div>
  )
}

