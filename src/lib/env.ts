// Validação de variáveis de ambiente
export function validateEnv() {
  const requiredEnvVars = {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  }

  const missing = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

  if (missing.length > 0) {
    console.error('❌ Variáveis de ambiente faltando:', missing.join(', '))
    return false
  }

  console.log('✅ Todas as variáveis de ambiente obrigatórias estão definidas')
  return true
}

export function getEnvStatus() {
  return {
    hasDatabase: !!process.env.DATABASE_URL,
    hasNextAuth: !!process.env.NEXTAUTH_SECRET,
    hasGoogleOAuth: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    hasEmail: !!(process.env.EMAIL_SERVER_HOST && process.env.EMAIL_SERVER_USER),
  }
}
