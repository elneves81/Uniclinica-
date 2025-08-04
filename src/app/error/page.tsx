import Link from 'next/link'

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Sistema em Configuração
        </h1>
        <p className="text-gray-600 mb-6">
          O sistema Uniclínica está sendo configurado. 
          Algumas variáveis de ambiente podem estar faltando.
        </p>
        <div className="space-y-3">
          <Link 
            href="/status"
            className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            🔍 Verificar Status do Sistema
          </Link>
          <Link 
            href="/auth/signin"
            className="block w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            🔑 Tentar Login
          </Link>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left">
          <h3 className="font-medium text-yellow-800 mb-2">Para Administradores:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Configure DATABASE_URL no Netlify</li>
            <li>• Configure NEXTAUTH_SECRET</li>
            <li>• Configure NEXTAUTH_URL</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
