import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function StatusPage() {
  // Função para obter status das variáveis
  const getEnvStatus = () => {
    return {
      hasDatabase: !!process.env.DATABASE_URL,
      hasNextAuth: !!process.env.NEXTAUTH_SECRET,
      hasGoogleOAuth: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
      hasEmail: !!(process.env.EMAIL_SERVER_HOST && process.env.EMAIL_SERVER_USER),
    }
  }

  const envStatus = getEnvStatus()
  let dbStatus = false
  let dbError = null

  // Testar conexão com banco
  try {
    await prisma.$queryRaw`SELECT 1`
    dbStatus = true
  } catch (error) {
    dbError = error instanceof Error ? error.message : 'Erro desconhecido'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            🏥 Status do Sistema Uniclínica
          </h1>

          {/* Status das Variáveis de Ambiente */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              📋 Variáveis de Ambiente
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${envStatus.hasDatabase ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <div className="flex items-center">
                  <span className="text-lg mr-2">{envStatus.hasDatabase ? '✅' : '❌'}</span>
                  <span className="font-medium">DATABASE_URL</span>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${envStatus.hasNextAuth ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <div className="flex items-center">
                  <span className="text-lg mr-2">{envStatus.hasNextAuth ? '✅' : '❌'}</span>
                  <span className="font-medium">NEXTAUTH_SECRET</span>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${envStatus.hasGoogleOAuth ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                <div className="flex items-center">
                  <span className="text-lg mr-2">{envStatus.hasGoogleOAuth ? '✅' : '⚠️'}</span>
                  <span className="font-medium">Google OAuth (opcional)</span>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${envStatus.hasEmail ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                <div className="flex items-center">
                  <span className="text-lg mr-2">{envStatus.hasEmail ? '✅' : '⚠️'}</span>
                  <span className="font-medium">Email (opcional)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status do Banco de Dados */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              🗄️ Banco de Dados
            </h2>
            <div className={`p-4 rounded-lg ${dbStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <div className="flex items-center mb-2">
                <span className="text-lg mr-2">{dbStatus ? '✅' : '❌'}</span>
                <span className="font-medium">
                  {dbStatus ? 'Conexão com banco funcionando' : 'Erro na conexão com banco'}
                </span>
              </div>
              {dbError && (
                <div className="text-sm bg-red-50 p-3 rounded border mt-2">
                  <strong>Erro:</strong> {dbError}
                </div>
              )}
            </div>
          </div>

          {/* Instruções */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              📝 Instruções para Configuração
            </h3>
            <div className="space-y-2 text-blue-700">
              <p>• Configure as variáveis de ambiente no Netlify Dashboard</p>
              <p>• DATABASE_URL deve apontar para o Prisma Accelerate</p>
              <p>• NEXTAUTH_SECRET pode ser gerado em: https://generate-secret.vercel.app/32</p>
              <p>• NEXTAUTH_URL deve ser: https://seu-site.netlify.app</p>
            </div>
          </div>

          {/* Botão para voltar */}
          <div className="mt-8 text-center">
            <Link 
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              🏠 Voltar ao Sistema
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
