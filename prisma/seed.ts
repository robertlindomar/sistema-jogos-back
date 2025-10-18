import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes (em ordem reversa devido às foreign keys)
  console.log('🧹 Limpando dados existentes...');

  await prisma.usuario.deleteMany();

  // Criar usuários
  console.log('👤 Criando usuários...');
  const nome = `${process.env.NOME_ADMIN}`;
  const email = `${process.env.EMAIL_ADMIN}`;
  const senha = `${process.env.SENHA_ADMIN}`;


  const usuario1 = await prisma.usuario.create({
    data: {
      nome: nome,
      email: email,
      role: "ADMIN",
      senha: await bcrypt.hash(senha, 10),
    },
  });

  // // Criar 6 jogadores vinculados aos cursos 1 ou 2
  // console.log('👥 Criando jogadores...');
  // const jogadores = await prisma.$transaction([
  //   prisma.jogador.create({
  //     data: {
  //       nome: 'Jogador 1',
  //       rm: 'RM101',
  //       curso_id: 1,
  //     },
  //   }),
  //   prisma.jogador.create({
  //     data: {
  //       nome: 'Jogador 2',
  //       rm: 'RM102',
  //       curso_id: 1,
  //     },
  //   }),
  //   prisma.jogador.create({
  //     data: {
  //       nome: 'Jogador 3',
  //       rm: 'RM103',
  //       curso_id: 2,
  //     },
  //   }),
  //   prisma.jogador.create({
  //     data: {
  //       nome: 'Jogador 4',
  //       rm: 'RM104',
  //       curso_id: 2,
  //     },
  //   }),
  //   prisma.jogador.create({
  //     data: {
  //       nome: 'Jogador 5',
  //       rm: 'RM105',
  //       curso_id: 1,
  //     },
  //   }),
  //   prisma.jogador.create({
  //     data: {
  //       nome: 'Jogador 6',
  //       rm: 'RM106',
  //       curso_id: 2,
  //     },
  //   }),
  // ]);

  // // Criar 2 times usando os jogadores criados
  // console.log('🏆 Criando times...');
  // // Time 1: Jogador1, Jogador2, Jogador3 (Jogador1=capitão; Jogador2=vice; Jogador3=suporte)
  // await prisma.time.create({
  //   data: {
  //     nome: 'Time Alpha',
  //     jogador1_id: jogadores[0].id,
  //     jogador2_id: jogadores[1].id,
  //     suporte_id: jogadores[2].id,
  //     curso_id: 1,
  //     cadastrado_por: usuario1.email,
  //     data_cadastro: new Date(),
  //   },
  // });

  // // Time 2: Jogador4, Jogador5, Jogador6
  // await prisma.time.create({
  //   data: {
  //     nome: 'Time Beta',
  //     jogador1_id: jogadores[3].id,
  //     jogador2_id: jogadores[4].id,
  //     suporte_id: jogadores[5].id,
  //     curso_id: 2,
  //     cadastrado_por: usuario1.email,
  //     data_cadastro: new Date(),
  //   },
  // });
  // console.log('✅ Seed concluído!');

}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
