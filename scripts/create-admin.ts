import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Verificar se já existe um admin
    const existingAdmin = await prisma.user.findFirst({
      where: {
        role: 'ADMIN'
      }
    });

    if (existingAdmin) {
      console.log('✅ Administrador já existe:', existingAdmin.email);
      return;
    }

    // Criar usuário administrador
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const admin = await prisma.user.create({
      data: {
        name: 'Administrador',
        email: 'admin@uniclinica.com',
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: new Date()
      }
    });

    console.log('✅ Administrador criado com sucesso!');
    console.log('📧 Email: admin@uniclinica.com');
    console.log('🔑 Senha: admin123');
    console.log('⚠️  Lembre-se de alterar a senha após o primeiro login!');

  } catch (error) {
    console.error('❌ Erro ao criar administrador:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
