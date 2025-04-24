import MainLayout from "@/components/layout/MainLayout"
import Link from "next/link"

export default function PrivacyPolicy() {
  // Em uma aplicação real, você obteria os dados do usuário do seu contexto de autenticação
  const userRole = "visitor"
  const userName = "Visitante"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-primary mb-6">Política de Privacidade</h1>
            <p className="text-gray-600 mb-8">Última atualização: 15 de Maio de 2023</p>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mt-8 mb-4">1. Introdução</h2>
              <p className="mb-4">
                A StayCation ("nós", "nosso" ou "nossa") está comprometida em proteger sua privacidade. Esta Política de
                Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você usa
                nosso site, aplicativo móvel e serviços relacionados (coletivamente, a "Plataforma").
              </p>
              <p className="mb-4">
                Ao usar nossa Plataforma, você concorda com a coleta e uso de informações de acordo com esta política.
                Se você não concordar com nossa política, por favor, não use nossa Plataforma.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">2. Informações que Coletamos</h2>
              <p className="mb-4">
                Coletamos vários tipos de informações para fornecer e melhorar nossos serviços para você:
              </p>
              <h3 className="text-lg font-medium mt-4 mb-2">2.1 Informações Pessoais</h3>
              <p className="mb-4">
                Quando você se registra em nossa Plataforma, podemos coletar as seguintes informações pessoais:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Número de telefone</li>
                <li>Endereço residencial</li>
                <li>Data de nascimento</li>
                <li>Informações de pagamento (como número de cartão de crédito)</li>
                <li>Foto de perfil</li>
                <li>Documentos de identificação (como CPF, RG ou passaporte)</li>
              </ul>

              <h3 className="text-lg font-medium mt-4 mb-2">2.2 Informações de Uso</h3>
              <p className="mb-4">
                Também coletamos informações sobre como você acessa e usa nossa Plataforma, incluindo:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Endereço IP</li>
                <li>Tipo de navegador</li>
                <li>Páginas visitadas</li>
                <li>Horário e data de acesso</li>
                <li>Tempo gasto na Plataforma</li>
                <li>Informações sobre o dispositivo</li>
                <li>Padrões de busca e reserva</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">3. Como Usamos Suas Informações</h2>
              <p className="mb-4">Usamos as informações que coletamos para os seguintes propósitos:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Fornecer, manter e melhorar nossa Plataforma</li>
                <li>Processar e gerenciar reservas e pagamentos</li>
                <li>Verificar sua identidade e prevenir fraudes</li>
                <li>Comunicar-se com você sobre sua conta, reservas e nossa Plataforma</li>
                <li>Enviar notificações, atualizações e informações de marketing</li>
                <li>Personalizar sua experiência na Plataforma</li>
                <li>Analisar como nossa Plataforma é usada para melhorar nossos serviços</li>
                <li>Cumprir obrigações legais</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">4. Compartilhamento de Informações</h2>
              <p className="mb-4">Podemos compartilhar suas informações nas seguintes circunstâncias:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Com anfitriões e hóspedes para facilitar reservas e comunicações</li>
                <li>Com prestadores de serviços que nos ajudam a operar nossa Plataforma</li>
                <li>Com parceiros de negócios para oferecer serviços complementares</li>
                <li>Para cumprir obrigações legais, como responder a intimações ou ordens judiciais</li>
                <li>Para proteger nossos direitos, propriedade ou segurança, ou a de nossos usuários</li>
                <li>Em conexão com uma fusão, aquisição ou venda de ativos</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">5. Segurança de Dados</h2>
              <p className="mb-4">
                A segurança de suas informações é importante para nós. Implementamos medidas técnicas, administrativas e
                físicas projetadas para proteger suas informações pessoais contra acesso não autorizado, uso indevido ou
                divulgação.
              </p>
              <p className="mb-4">
                No entanto, nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100%
                seguro. Portanto, não podemos garantir sua segurança absoluta.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">6. Seus Direitos</h2>
              <p className="mb-4">
                Dependendo da sua localização, você pode ter certos direitos em relação às suas informações pessoais,
                incluindo:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Direito de acessar suas informações pessoais</li>
                <li>Direito de corrigir informações imprecisas</li>
                <li>Direito de excluir suas informações pessoais</li>
                <li>Direito de restringir o processamento de suas informações</li>
                <li>Direito à portabilidade de dados</li>
                <li>Direito de se opor ao processamento de suas informações</li>
                <li>Direito de retirar o consentimento</li>
              </ul>
              <p className="mb-4">
                Para exercer qualquer um desses direitos, entre em contato conosco usando as informações fornecidas na
                seção "Contato" abaixo.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">7. Cookies e Tecnologias Semelhantes</h2>
              <p className="mb-4">
                Usamos cookies e tecnologias semelhantes para coletar informações sobre suas atividades em nossa
                Plataforma. Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo quando você
                visita um site.
              </p>
              <p className="mb-4">
                Você pode configurar seu navegador para recusar todos os cookies ou para indicar quando um cookie está
                sendo enviado. No entanto, algumas funcionalidades da nossa Plataforma podem não funcionar corretamente
                se você desabilitar os cookies.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">8. Alterações nesta Política de Privacidade</h2>
              <p className="mb-4">
                Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer
                alterações publicando a nova Política de Privacidade nesta página e atualizando a data da "Última
                atualização" no topo desta Política de Privacidade.
              </p>
              <p className="mb-4">
                Recomendamos que você revise esta Política de Privacidade periodicamente para quaisquer alterações.
                Alterações nesta Política de Privacidade são efetivas quando são publicadas nesta página.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">9. Contato</h2>
              <p className="mb-4">
                Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  Por e-mail:{" "}
                  <a href="mailto:privacidade@staycation.com" className="text-primary hover:underline">
                    privacidade@staycation.com
                  </a>
                </li>
                <li>Por telefone: (11) 4002-8922</li>
                <li>Por correio: StayCation, Av. Paulista, 1000, São Paulo, SP, 01310-100, Brasil</li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Ao usar nossa plataforma, você concorda com nossa{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Termos de Serviço
                </Link>{" "}
                e esta Política de Privacidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

