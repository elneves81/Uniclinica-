import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Verificar se estamos acessando uma rota que precisa de configuração
  const pathname = request.nextUrl.pathname

  // Permitir acesso às rotas de status e error sem verificação
  if (pathname.startsWith('/status') || 
      pathname.startsWith('/error') || 
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // Verificar variáveis críticas
  const hasDatabase = !!process.env.DATABASE_URL
  const hasNextAuth = !!process.env.NEXTAUTH_SECRET

  if (!hasDatabase || !hasNextAuth) {
    return NextResponse.redirect(new URL('/status', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
