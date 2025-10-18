-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jogador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "rm" TEXT NOT NULL,
    "curso_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jogador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Time" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "jogador1_id" INTEGER NOT NULL,
    "jogador2_id" INTEGER NOT NULL,
    "suporte_id" INTEGER NOT NULL,
    "curso_id" INTEGER NOT NULL,
    "cadastrado_por" TEXT NOT NULL,
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Convite" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "curso_id" INTEGER NOT NULL,
    "criado_por" INTEGER NOT NULL,
    "expira_em" TIMESTAMP(3) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Convite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Jogador_rm_key" ON "Jogador"("rm");

-- CreateIndex
CREATE INDEX "Jogador_curso_id_idx" ON "Jogador"("curso_id");

-- CreateIndex
CREATE INDEX "Time_curso_id_idx" ON "Time"("curso_id");

-- CreateIndex
CREATE INDEX "Time_jogador1_id_idx" ON "Time"("jogador1_id");

-- CreateIndex
CREATE INDEX "Time_jogador2_id_idx" ON "Time"("jogador2_id");

-- CreateIndex
CREATE INDEX "Time_suporte_id_idx" ON "Time"("suporte_id");

-- CreateIndex
CREATE UNIQUE INDEX "Convite_token_key" ON "Convite"("token");

-- CreateIndex
CREATE INDEX "Convite_token_idx" ON "Convite"("token");

-- CreateIndex
CREATE INDEX "Convite_curso_id_idx" ON "Convite"("curso_id");

-- AddForeignKey
ALTER TABLE "Jogador" ADD CONSTRAINT "Jogador_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Time" ADD CONSTRAINT "Time_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Time" ADD CONSTRAINT "Time_jogador1_id_fkey" FOREIGN KEY ("jogador1_id") REFERENCES "Jogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Time" ADD CONSTRAINT "Time_jogador2_id_fkey" FOREIGN KEY ("jogador2_id") REFERENCES "Jogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Time" ADD CONSTRAINT "Time_suporte_id_fkey" FOREIGN KEY ("suporte_id") REFERENCES "Jogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Convite" ADD CONSTRAINT "Convite_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Convite" ADD CONSTRAINT "Convite_criado_por_fkey" FOREIGN KEY ("criado_por") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
