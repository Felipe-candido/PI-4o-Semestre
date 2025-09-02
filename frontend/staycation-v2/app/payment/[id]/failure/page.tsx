'use client'

import { useParams, useRouter } from 'next/navigation'
import MainLayout from "@/components/layout/MainLayout"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { XCircle, RefreshCw } from "lucide-react"

export default function PaymentFailurePage() {
  const { id } = useParams()
  const router = useRouter()

  const handleRetry = () => {
    router.push(`/payment/${id}`)
  }

  const handleGoHome = () => {
    router.push('/')
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Pagamento Falhou
            </h1>
            <p className="text-gray-600">
              Ocorreu um problema ao processar seu pagamento. 
              Verifique os dados do cartão e tente novamente.
            </p>
          </div>

          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Erro no Pagamento</AlertTitle>
            <AlertDescription>
              Seu pagamento não foi processado. Isso pode acontecer por:
              <ul className="list-disc list-inside mt-2 text-sm">
                <li>Dados incorretos do cartão</li>
                <li>Saldo insuficiente</li>
                <li>Cartão bloqueado</li>
                <li>Problemas temporários do sistema</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Button 
              onClick={handleRetry} 
              className="w-full"
              size="lg"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar Novamente
            </Button>
            
            <Button 
              onClick={handleGoHome} 
              variant="outline" 
              className="w-full"
              size="lg"
            >
              Voltar ao Início
            </Button>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>Se o problema persistir, entre em contato conosco.</p>
            <p>Reserva ID: {id}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
