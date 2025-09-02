'use client'

import { useParams, useRouter } from 'next/navigation'
import MainLayout from "@/components/layout/MainLayout"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, RefreshCw } from "lucide-react"

export default function PaymentPendingPage() {
  const { id } = useParams()
  const router = useRouter()

  const handleCheckStatus = () => {
    // Aqui você pode implementar uma verificação do status do pagamento
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
            <Clock className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Pagamento em Processamento
            </h1>
            <p className="text-gray-600">
              Seu pagamento está sendo processado. 
              Isso pode levar alguns minutos.
            </p>
          </div>

          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <AlertTitle>Status: Pendente</AlertTitle>
            <AlertDescription>
              <div className="text-sm text-yellow-800">
                <p className="mb-2">O que isso significa:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Seu pagamento foi recebido</li>
                  <li>Está sendo analisado pelo sistema</li>
                  <li>Você receberá uma confirmação em breve</li>
                  <li>Verifique seu email para atualizações</li>
                </ul>
              </div>
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Button 
              onClick={handleCheckStatus} 
              className="w-full"
              size="lg"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Verificar Status
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

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-800">
                Dica Importante
              </span>
            </div>
            <p className="text-sm text-blue-700">
              Em caso de pagamentos com cartão de crédito, o valor pode aparecer 
              como "reserva" no seu extrato até a confirmação final.
            </p>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>Reserva ID: {id}</p>
            <p>Se tiver dúvidas, entre em contato conosco.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
