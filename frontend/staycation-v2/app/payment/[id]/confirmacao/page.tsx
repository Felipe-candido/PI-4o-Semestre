import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const PaymentConfirmationPage = () => {
  // Next.js app router não permite hooks diretamente, então usamos params do arquivo
  // O id será passado via props pelo arquivo [id]/conformacao/page.tsx
  // Para SSR/SSG, usar props: { params }
  // Aqui, exemplo com params
  // const params = useParams();
  // const { id } = params;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">Reserva Confirmada!</h1>
        <p className="text-gray-700 mb-6 text-center">
          Sua reserva e pagamento foram processados com sucesso.<br />
          Abaixo estão os detalhes da sua reserva:
        </p>
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-2">Detalhes da Reserva</h2>
          <ul className="text-gray-600 text-sm space-y-1">
            <li><span className="font-medium">ID da Reserva:</span> #123456</li>
            <li><span className="font-medium">Nome do Hóspede:</span> João da Silva</li>
            <li><span className="font-medium">Propriedade:</span> Apartamento Central</li>
            <li><span className="font-medium">Check-in:</span> 10/07/2024</li>
            <li><span className="font-medium">Check-out:</span> 15/07/2024</li>
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Detalhes do Pagamento</h2>
          <ul className="text-gray-600 text-sm space-y-1">
            <li><span className="font-medium">Valor Total:</span> R$ 2.500,00</li>
            <li><span className="font-medium">Método de Pagamento:</span> Cartão de Crédito</li>
            <li><span className="font-medium">Status:</span> Pago</li>
          </ul>
        </div>
        <Link href="/" className="block w-full text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Voltar para a Home</Link>
      </div>
    </main>
  );
};

export default PaymentConfirmationPage; 