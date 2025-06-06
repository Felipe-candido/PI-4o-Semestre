import MainLayout from "@/components/layout/MainLayout"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function Contact() {
  // Em uma aplicação real, você obteria os dados do usuário do seu contexto de autenticação
  const userRole = "visitor" // Pode ser qualquer tipo de usuário
  const userName = "Visitante"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-8 text-center">Entre em Contato</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Informações de Contato */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Informações de Contato</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600 mb-1">Suporte ao Cliente:</p>
                    <a href="mailto:suporte@staycation.com" className="text-primary hover:underline">
                      suporte@staycation.com
                    </a>
                    <p className="text-gray-600 mt-2 mb-1">Parcerias Comerciais:</p>
                    <a href="mailto:parcerias@staycation.com" className="text-primary hover:underline">
                      parcerias@staycation.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefone</h3>
                    <p className="text-gray-600 mb-1">Central de Atendimento:</p>
                    <a href="tel:+551140028922" className="text-primary hover:underline">
                      (11) 4002-8922
                    </a>
                    <p className="text-gray-600 mt-2 mb-1">Suporte 24h:</p>
                    <a href="tel:+5508007778922" className="text-primary hover:underline">
                      0800 777 8922
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Endereço</h3>
                    <p className="text-gray-600">
                      Av. Paulista, 1000, 10º andar
                      <br />
                      Bela Vista, São Paulo - SP
                      <br />
                      CEP: 01310-100
                      <br />
                      Brasil
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-3">Horário de Atendimento</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Segunda a Sexta: 8h às 20h</p>
                  <p>Sábado: 9h às 15h</p>
                  <p>Domingo e Feriados: Fechado (Suporte online disponível 24/7)</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-3">Redes Sociais</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-primary/10 p-2 rounded-full hover:bg-primary/20">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a href="#" className="bg-primary/10 p-2 rounded-full hover:bg-primary/20">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a href="#" className="bg-primary/10 p-2 rounded-full hover:bg-primary/20">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Formulário de Contato */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Envie uma Mensagem</h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome Completo
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder="Digite seu nome"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder="Digite seu email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Assunto
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Digite o assunto"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Digite sua mensagem"
                    required
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    id="privacy-policy"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="privacy-policy" className="ml-2 block text-sm text-gray-700">
                    Concordo com a{" "}
                    <a href="/privacy" className="text-primary hover:underline">
                      Política de Privacidade
                    </a>
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Mapa */}
          <div className="mt-12 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-primary mb-4">Nossa Localização</h2>
            <div className="h-80 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>Mapa será carregado aqui</p>
                <p className="text-sm">Av. Paulista, 1000 - São Paulo, SP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

