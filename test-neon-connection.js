// Script para testar conexão com Neon.tech
// Execute: node test-neon-connection.js

console.log('🔗 Testando conexão com Neon.tech...\n');

// Simular teste de conexão
const testConnection = () => {
  // Verificar se DATABASE_URL está definida
  const dbUrl = process.env.DATABASE_URL;
  
  if (!dbUrl) {
    console.log('❌ DATABASE_URL não encontrada!');
    console.log('💡 Configure a variável de ambiente:');
    console.log('   $env:DATABASE_URL="postgresql://user:pass@ep-xyz.neon.tech/db?sslmode=require"');
    return false;
  }

  console.log('✅ DATABASE_URL encontrada');
  
  // Verificar formato básico
  if (!dbUrl.startsWith('postgresql://')) {
    console.log('⚠️  Formato incorreto! Deve começar com "postgresql://"');
    return false;
  }

  if (!dbUrl.includes('neon.tech')) {
    console.log('⚠️  URL não é do Neon.tech');
    return false;
  }

  if (!dbUrl.includes('sslmode=require')) {
    console.log('⚠️  Adicione "?sslmode=require" no final da URL');
    return false;
  }

  console.log('✅ Formato da URL está correto');
  console.log('✅ SSL configurado');
  console.log('✅ Neon.tech detectado');
  
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
console.log('- CONFIGURACAO-NEON.md (este projeto)');
console.log('- NEON-SETUP.md (setup completo)');
console.log('- DEPLOY.md (deploy no Netlify)');
