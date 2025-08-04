import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = [
    '/auth/signin',
    '/auth/register', 
    '/status',
    '/error',
    '/_next',
    '/api/auth',
    '/favicon.ico'
  ]

  // Verificar se a rota é pública
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Verificar variáveis críticas do ambiente
  const hasDatabase = !!process.env.DATABASE_URL
  const hasNextAuth = !!process.env.NEXTAUTH_SECRET

  if (!hasDatabase || !hasNextAuth) {
    return NextResponse.redirect(new URL('/status', request.url))
  }

  // Verificar autenticação para rotas protegidas
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })

  // Se não tem token e não é rota pública, redirecionar para login
  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signInUrl)
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
