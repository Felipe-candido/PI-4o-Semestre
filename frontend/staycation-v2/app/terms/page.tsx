import MainLayout from "@/components/layout/MainLayout"
import Link from "next/link"

export default function TermsOfService() {
  // Em uma aplicação real, você obteria os dados do usuário do seu contexto de autenticação
  const userRole = "visitor"
  const userName = "Visitante"
  const userAvatar = "/placeholder.svg?height=32&width=32"

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-primary mb-6">Termos de Serviço</h1>
            <p className="text-gray-600 mb-8">Última atualização: 15 de Maio de 2023</p>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mt-8 mb-4">1. Introdução</h2>
              <p className="mb-4">
                Bem-vindo ao StayCation. Estes Termos de Serviço ("Termos") regem seu acesso e uso do site StayCation,
                aplicativos, APIs e widgets (coletivamente, "Plataforma StayCation").
              </p>
              <p className="mb-4">
                Ao acessar ou usar a Plataforma StayCation, você concorda em cumprir e estar vinculado a estes Termos.
                Se você não concordar com estes Termos, não acesse nem use a Plataforma StayCation.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">2. Definições</h2>
              <p className="mb-4">
                "Conteúdo" significa texto, gráficos, imagens, música, software, áudio, vídeo, informações ou outros
                materiais.
              </p>
              <p className="mb-4">
                "Conteúdo do StayCation" significa todo o Conteúdo que o StayCation disponibiliza através da Plataforma
                StayCation, incluindo qualquer Conteúdo licenciado de terceiros.
              </p>
              <p className="mb-4">
                "Conteúdo do Usuário" significa todo o Conteúdo que um usuário envia, publica, carrega, fornece ou
                disponibiliza para a Plataforma StayCation.
              </p>
              <p className="mb-4">
                "Conteúdo Coletivo" significa, coletivamente, Conteúdo do StayCation e Conteúdo do Usuário.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">3. Elegibilidade</h2>
              <p className="mb-4">
                O uso da Plataforma StayCation é restrito a pessoas com 18 anos de idade ou mais. Ao acessar ou usar a
                Plataforma StayCation, você declara e garante que tem 18 anos de idade ou mais e que tem o direito,
                autoridade e capacidade legal para celebrar um contrato vinculativo com o StayCation.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">4. Contas de Usuário</h2>
              <p className="mb-4">
                Para acessar e usar determinados recursos da Plataforma StayCation, você deve registrar-se e manter uma
                conta de usuário ativa ("Conta StayCation"). O registro da conta requer que você forneça determinadas
                informações pessoais ao StayCation, como seu nome, endereço, número de telefone e endereço de e-mail,
                bem como pelo menos uma forma de pagamento válida.
              </p>
              <p className="mb-4">
                Você concorda em manter informações precisas, completas e atualizadas em sua Conta StayCation. Deixar de
                manter informações precisas, completas e atualizadas da conta, incluindo ter um método de pagamento
                inválido ou expirado, pode resultar em sua incapacidade de acessar e usar a Plataforma StayCation ou na
                rescisão destes Termos pelo StayCation.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">5. Conteúdo e Conduta do Usuário</h2>
              <p className="mb-4">
                Você é o único responsável por todo o Conteúdo do Usuário que fornecer. Você declara e garante que:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  Você é o criador e proprietário do Conteúdo do Usuário ou tem as licenças, direitos, consentimentos e
                  permissões necessários para autorizar o StayCation e os usuários da Plataforma StayCation a usar e
                  distribuir seu Conteúdo do Usuário conforme necessário para o funcionamento normal da Plataforma
                  StayCation e conforme contemplado por estes Termos.
                </li>
                <li>
                  Seu Conteúdo do Usuário não violará os direitos de privacidade, direitos de publicidade, direitos
                  autorais, direitos contratuais ou quaisquer outros direitos de qualquer pessoa ou entidade.
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">6. Reservas e Pagamentos</h2>
              <p className="mb-4">
                A Plataforma StayCation permite que os usuários listem, ofereçam, pesquisem e reservem propriedades. Ao
                listar ou reservar uma propriedade, você concorda em cumprir as políticas de reserva e cancelamento
                específicas da propriedade.
              </p>
              <p className="mb-4">
                O StayCation cobra taxas de serviço para o uso da Plataforma StayCation. O StayCation se reserva o
                direito de alterar as taxas de serviço a qualquer momento, e fornecerá aos usuários notificação adequada
                de quaisquer alterações de taxa antes que tais alterações se tornem efetivas.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">7. Limitação de Responsabilidade</h2>
              <p className="mb-4">
                Em nenhuma circunstância o StayCation será responsável por quaisquer danos indiretos, incidentais,
                especiais, punitivos ou consequentes decorrentes de ou relacionados ao uso da Plataforma StayCation,
                incluindo, sem limitação, perda de lucros, perda de dados, lesão pessoal ou danos à propriedade, mesmo
                que o StayCation tenha sido avisado da possibilidade de tais danos.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">8. Alterações nos Termos</h2>
              <p className="mb-4">
                O StayCation se reserva o direito de modificar estes Termos a qualquer momento de acordo com esta
                disposição. Se fizermos alterações nestes Termos, publicaremos os Termos revisados na Plataforma
                StayCation e atualizaremos a data da "Última atualização" no topo destes Termos.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">9. Lei Aplicável</h2>
              <p className="mb-4">
                Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar suas
                disposições sobre conflitos de leis.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">10. Contato</h2>
              <p className="mb-4">
                Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco em{" "}
                <a href="mailto:termos@staycation.com" className="text-primary hover:underline">
                  termos@staycation.com
                </a>
                .
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Ao usar nossa plataforma, você concorda com estes Termos de Serviço e nossa{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

