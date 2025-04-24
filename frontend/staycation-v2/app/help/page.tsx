"use client"

import MainLayout from "@/components/layout/MainLayout"
import { Search, ChevronDown, ChevronRight, MessageSquare, Phone, Mail } from "lucide-react"
import { useState } from "react"

export default function Help() {
  // Em uma aplicação real, você obteria os dados do usuário do seu contexto de autenticação
  const userRole = "visitor" // Pode ser qualquer tipo de usuário
  const userName = "Visitante"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  // Estado para controlar quais FAQs estão expandidas
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({})

  // Função para alternar o estado de expansão de uma FAQ
  const toggleFaq = (id: string) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Categorias de FAQ
  const faqCategories = [
    {
      id: "reservations",
      title: "Reservas",
      faqs: [
        {
          id: "res1",
          question: "Como faço uma reserva?",
          answer:
            "Para fazer uma reserva, basta navegar até a página da propriedade desejada, selecionar as datas de check-in e check-out, informar o número de hóspedes e clicar em 'Reservar'. Você será direcionado para a página de pagamento para concluir a reserva.",
        },
        {
          id: "res2",
          question: "Posso cancelar minha reserva?",
          answer:
            "Sim, você pode cancelar sua reserva, mas as políticas de cancelamento variam de acordo com cada propriedade. Geralmente, cancelamentos feitos com mais de 5 dias de antecedência recebem reembolso total. Verifique a política específica da propriedade na página de detalhes.",
        },
        {
          id: "res3",
          question: "Como posso modificar minha reserva?",
          answer:
            "Para modificar uma reserva existente, acesse 'Minhas Reservas' no seu perfil, selecione a reserva que deseja alterar e clique em 'Modificar Reserva'. Você poderá alterar as datas ou o número de hóspedes, sujeito à disponibilidade e possíveis ajustes de preço.",
        },
      ],
    },
    {
      id: "payments",
      title: "Pagamentos",
      faqs: [
        {
          id: "pay1",
          question: "Quais métodos de pagamento são aceitos?",
          answer:
            "Aceitamos cartões de crédito e débito das principais bandeiras (Visa, Mastercard, American Express), além de PIX e transferência bancária para algumas propriedades.",
        },
        {
          id: "pay2",
          question: "Quando serei cobrado pela minha reserva?",
          answer:
            "O pagamento é processado imediatamente após a confirmação da reserva. Em alguns casos, pode ser solicitado um depósito inicial, com o restante a ser pago mais próximo da data de check-in.",
        },
        {
          id: "pay3",
          question: "Como funciona o depósito de segurança?",
          answer:
            "Algumas propriedades exigem um depósito de segurança, que é bloqueado no seu cartão no momento do check-in e liberado após o check-out, desde que não haja danos à propriedade.",
        },
      ],
    },
    {
      id: "hosting",
      title: "Para Anfitriões",
      faqs: [
        {
          id: "host1",
          question: "Como anuncio minha propriedade?",
          answer:
            "Para anunciar sua propriedade, crie uma conta como anfitrião, clique em 'Criar Anúncio' e siga o processo de cadastro. Você precisará fornecer detalhes sobre a propriedade, adicionar fotos e definir preços e disponibilidade.",
        },
        {
          id: "host2",
          question: "Quanto custa anunciar no StayCation?",
          answer:
            "Anunciar no StayCation é gratuito. Cobramos apenas uma taxa de serviço de 3% sobre cada reserva confirmada.",
        },
        {
          id: "host3",
          question: "Como recebo os pagamentos das reservas?",
          answer:
            "Os pagamentos são processados automaticamente e transferidos para sua conta bancária 24 horas após o check-in do hóspede. Você pode acompanhar todos os pagamentos na seção 'Ganhos' do seu painel de anfitrião.",
        },
      ],
    },
  ]

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-primary mb-4">Como podemos ajudar?</h1>
            <p className="text-gray-600 mb-6">
              Encontre respostas para suas dúvidas ou entre em contato com nossa equipe de suporte
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por tópicos de ajuda..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Perguntas Frequentes</h2>

            {faqCategories.map((category) => (
              <div key={category.id} className="mb-8">
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                <div className="space-y-4">
                  {category.faqs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        className="w-full flex justify-between items-center p-4 text-left font-medium hover:bg-gray-50 focus:outline-none"
                        onClick={() => toggleFaq(faq.id)}
                      >
                        <span>{faq.question}</span>
                        {expandedFaqs[faq.id] ? (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                      {expandedFaqs[faq.id] && (
                        <div className="p-4 bg-gray-50 border-t border-gray-200">
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">Ainda precisa de ajuda?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Chat ao Vivo</h3>
                <p className="text-gray-600 text-sm mb-4">Converse com nossa equipe de suporte em tempo real</p>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 w-full">
                  Iniciar Chat
                </button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Telefone</h3>
                <p className="text-gray-600 text-sm mb-4">Ligue para nossa central de atendimento</p>
                <a
                  href="tel:+551140028922"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 w-full inline-block"
                >
                  (11) 4002-8922
                </a>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-600 text-sm mb-4">Envie sua dúvida para nossa equipe</p>
                <a
                  href="mailto:suporte@staycation.com"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 w-full inline-block"
                >
                  suporte@staycation.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

