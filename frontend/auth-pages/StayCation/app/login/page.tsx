import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Entrar no Sistema</h1>
        <LoginForm />
      </div>
    </div>
  )
}

