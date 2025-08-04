// Validação de variáveis de ambiente
export function validateEnv() {
  // Verificar apenas a variável essencial do banco de dados
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL não está configurada')
    return false
  }

  console.log('✅ Variáveis de ambiente essenciais estão definidas')
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
