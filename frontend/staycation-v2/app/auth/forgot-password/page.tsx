import Link from "next/link"
import MainLayout from "@/components/layout/MainLayout"
import { Mail, ArrowLeft } from "lucide-react"

export default function ForgotPassword() {
  // Em uma aplicação real, você obteria os dados do usuário do seu contexto de autenticação
  const userRole = "visitor"
  const userName = "Visitante"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="mb-6">
              <Link href="/auth/login" className="text-primary hover:text-primary/80 flex items-center">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Voltar para login
              </Link>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Esqueceu sua senha?</h1>
              <p className="text-gray-600">Enviaremos um link para redefinir sua senha</p>
            </div>

            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Digite seu email"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Enviar link de redefinição
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Lembrou sua senha?{" "}
              <Link href="/auth/login" className="text-primary hover:text-primary/80 font-medium">
                Voltar para login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

