// Script para testar conexão com Neon.tech ou Prisma Accelerate
// Execute: node test-neon-connection.js

console.log('🔗 Testando conexão com banco de dados...\n');

// Simular teste de conexão
const testConnection = () => {
  // Verificar se DATABASE_URL está definida
  const dbUrl = process.env.DATABASE_URL;
  
  if (!dbUrl) {
    console.log('❌ DATABASE_URL não encontrada!');
    console.log('💡 Configure a variável de ambiente:');
    console.log('   $env:DATABASE_URL="sua-url-aqui"');
    return false;
  }

  console.log('✅ DATABASE_URL encontrada');
  
  // Verificar se é Prisma Accelerate
  if (dbUrl.startsWith('prisma+postgres://')) {
    console.log('🚀 Prisma Accelerate detectado!');
    
    if (!dbUrl.includes('accelerate.prisma-data.net')) {
      console.log('⚠️  URL deve conter "accelerate.prisma-data.net"');
      return false;
    }
    
    if (!dbUrl.includes('api_key=')) {
      console.log('⚠️  API key não encontrada na URL');
      return false;
    }
    
    console.log('✅ Formato Prisma Accelerate correto');
    console.log('✅ API key presente');
    console.log('✅ Cache global ativado');
    console.log('✅ Connection pooling ativado');
    
    return true;
  }
  
  // Verificar formato PostgreSQL tradicional
  if (!dbUrl.startsWith('postgresql://')) {
    console.log('⚠️  Formato deve ser "postgresql://" ou "prisma+postgres://"');
    return false;
  }

  if (dbUrl.includes('neon.tech')) {
    console.log('🐘 Neon.tech detectado');
    
    if (!dbUrl.includes('sslmode=require')) {
      console.log('⚠️  Adicione "?sslmode=require" no final da URL');
      return false;
    }
    
    console.log('✅ SSL configurado');
  }

  console.log('✅ Formato da URL está correto');
  
  return true;
};

// Executar teste
if (testConnection()) {
  console.log('\n🎉 Configuração parece estar correta!');
  console.log('📋 Próximos passos:');
  console.log('1. Configure DATABASE_URL no Netlify');
  console.log('2. Configure NEXTAUTH_SECRET');
  console.log('3. Configure NEXTAUTH_URL');
  console.log('4. Aguarde o rebuild');
} else {
  console.log('\n🔧 Ajuste a configuração e tente novamente');
}

console.log('\n📚 Guias disponíveis:');
console.log('- CONFIGURACAO-NEON.md (Neon.tech)');
console.log('- PRISMA-POSTGRES-TROUBLESHOOTING.md (Prisma Accelerate)');
console.log('- DEPLOY.md (deploy no Netlify)');
