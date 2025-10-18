# Módulo Prisma

## 📋 Descrição

Módulo responsável pela configuração e gerenciamento do banco de dados através do Prisma ORM. Inclui a configuração do cliente Prisma, conexão com o banco de dados MySQL e gerenciamento de migrações.

## 🏗️ Estrutura

```
prisma/
├── migrations/                 # Migrações do banco de dados
│   ├── 20250626131138_init/   # Migração inicial
│   ├── 20250630165650_init/   # Migração de atualização
│   └── migration_lock.toml    # Lock de migrações
├── schema.prisma              # Schema do banco de dados
└── README.md                  # Este arquivo
```

## 📊 Schema do Banco de Dados

### Modelos Principais

#### Usuario
```prisma
model Usuario {
    id        Int      @id @default(autoincrement()) @map("id_usuario")
    nome      String   @map("nome_usuario") @db.VarChar(100)
    email     String   @unique @map("email_usuario") @db.VarChar(100)
    senha     String   @map("senha_usuario") @db.VarChar(255)
    createdAt DateTime @default(now()) @map("data_criacao")
}
```

#### Cidade
```prisma
model Cidade {
    id   Int    @id @default(autoincrement()) @map("id_cidade")
    nome String @map("nome_cidade") @db.VarChar(100)
    uf   String @map("uf_cidade") @db.Char(2)

    instituicoes Instituicao[]
    alunos       Aluno[]
    empresas     Empresa[]

    @@map("cidade")
}
```

#### Instituicao
```prisma
model Instituicao {
    id           Int     @id @default(autoincrement()) @map("id_instituicao")
    nome         String  @map("nome_insti") @db.VarChar(100)
    nomeFantasia String  @map("nome_fantasia_insti") @db.VarChar(100)
    cnpj         String? @map("cnpj_insti") @db.Char(18)
    endereco     String? @map("endereco_insti") @db.VarChar(150)
    cidadeId     Int     @map("cidade_id")
    telefone     String? @map("telefone_insti") @db.VarChar(20)
    email        String? @map("email_insti") @db.VarChar(100)
    nomeDiretor  String? @map("diretor_nome") @db.VarChar(100)
    cpfDiretor   String? @map("diretor_cpf") @db.Char(14)

    cidade   Cidade    @relation(fields: [cidadeId], references: [id])
    estagios Estagio[]

    @@map("instituicao")
}
```

### Modelos de Estágio

#### Estagio
```prisma
model Estagio {
    id                     Int           @id @default(autoincrement()) @map("id_estagio")
    alunoId                Int           @map("aluno_id")
    empresaId              Int           @map("empresa_id")
    cursoId                Int           @map("curso_id")
    instituicaoId          Int           @map("instituicao_id")
    tipo                   TipoEstagio   @map("tipo_estagio")
    remunerado             Boolean       @default(false) @map("remunerado")
    origemInstituicao      String?       @map("origem_instituicao") @db.VarChar(100)
    dataInicio             DateTime      @map("data_inicio")
    dataTermino            DateTime      @map("data_termino")
    cargaHorariaSemanal    Int?          @map("carga_horaria_semanal")
    bolsaAuxilio           Decimal?      @map("bolsa_auxilio") @db.Decimal(10, 2)
    seguroApolice          String?       @map("seguro_apolice") @db.VarChar(50)
    seguradoraId           Int?          @map("seguradora_id")
    status                 StatusEstagio @default(Ativo) @map("status")
    dataAssinatura         DateTime?     @map("data_assinatura")
    dataCancelamento       DateTime?     @map("data_cancelamento")
    motivoCancelamento     String?       @map("motivo_cancelamento") @db.VarChar(100)
    possuiResponsavelMenor Boolean       @default(false) @map("possui_responsavel_menor")

    aluno       Aluno       @relation(fields: [alunoId], references: [id])
    empresa     Empresa     @relation(fields: [empresaId], references: [id])
    curso       Curso       @relation(fields: [cursoId], references: [id])
    instituicao Instituicao @relation(fields: [instituicaoId], references: [id])
    seguradora  Seguradora? @relation(fields: [seguradoraId], references: [id])

    horarios   EstagioHorario[]
    relatorios RelatorioEstagio[]

    @@map("estagio")
}
```

### Enums

#### TipoEstagio
```prisma
enum TipoEstagio {
    Obrigatorio    @map("Obrigatório")
    NaoObrigatorio @map("Não Obrigatório")

    @@map("tipo_estagio")
}
```

#### StatusEstagio
```prisma
enum StatusEstagio {
    Ativo     @map("Ativo")
    Cancelado @map("Cancelado")
    Concluido @map("Concluído")

    @@map("status")
}
```

## 🔧 Configuração

### Variáveis de Ambiente

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/sistema_estagio"
```

### Configuração do Schema

```prisma
generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider = "mysql"
    url      = env("DATABASE_URL")
}
```

## 🛠️ Comandos do Prisma

### Desenvolvimento

```bash
# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev

# Reset do banco de dados
npx prisma migrate reset

# Visualizar banco de dados
npx prisma studio
```

### Produção

```bash
# Aplicar migrações em produção
npx prisma migrate deploy

# Gerar cliente para produção
npx prisma generate
```

### Manutenção

```bash
# Verificar status das migrações
npx prisma migrate status

# Criar nova migração
npx prisma migrate dev --name nome_da_migracao

# Formatar schema
npx prisma format

# Validar schema
npx prisma validate
```

## 📊 Relacionamentos

### Relacionamentos Principais

1. **Cidade** ↔ **Instituicao** (1:N)
2. **Cidade** ↔ **Aluno** (1:N)
3. **Cidade** ↔ **Empresa** (1:N)
4. **Instituicao** ↔ **Estagio** (1:N)
5. **Aluno** ↔ **Estagio** (1:N)
6. **Empresa** ↔ **Estagio** (1:N)
7. **Curso** ↔ **Estagio** (1:N)
8. **Seguradora** ↔ **Estagio** (1:N)

### Relacionamentos de Estágio

- **Estagio** ↔ **EstagioHorario** (1:N)
- **Estagio** ↔ **RelatorioEstagio** (1:N)

## 🔍 Consultas Comuns

### Buscar Instituição com Cidade
```typescript
const instituicao = await prisma.instituicao.findUnique({
  where: { id: 1 },
  include: {
    cidade: true
  }
});
```

### Listar Estágios com Relacionamentos
```typescript
const estagios = await prisma.estagio.findMany({
  include: {
    aluno: true,
    empresa: true,
    curso: true,
    instituicao: true,
    seguradora: true,
    horarios: true,
    relatorios: true
  }
});
```

### Buscar Cidades com Contadores
```typescript
const cidades = await prisma.cidade.findMany({
  include: {
    _count: {
      select: {
        instituicoes: true,
        alunos: true,
        empresas: true
      }
    }
  }
});
```

## 🚨 Tratamento de Erros

### Erros Comuns

- **P2002** - Violação de chave única
- **P2003** - Violação de chave estrangeira
- **P2025** - Registro não encontrado
- **P2014** - Violação de restrição de exclusão

### Tratamento no Código

```typescript
try {
  const result = await prisma.usuario.create({
    data: userData
  });
} catch (error) {
  if (error.code === 'P2002') {
    throw new AppError('Email já cadastrado', 400);
  }
  throw error;
}
```

## 📈 Migrações

### Estrutura de Migrações

```
migrations/
├── 20250626131138_init/
│   └── migration.sql
├── 20250630165650_init/
│   └── migration.sql
└── migration_lock.toml
```

### Criando Nova Migração

```bash
# Após alterar o schema
npx prisma migrate dev --name adicionar_campo_novo
```

### Aplicando Migrações

```bash
# Desenvolvimento
npx prisma migrate dev

# Produção
npx prisma migrate deploy
```

## 🔒 Segurança

### Boas Práticas

- Sempre use variáveis de ambiente para DATABASE_URL
- Nunca commite credenciais no código
- Use migrations para alterações no schema
- Valide dados antes de inserir no banco
- Use transações para operações complexas

### Configuração de Segurança

```prisma
// Exemplo de configuração segura
datasource db {
    provider = "mysql"
    url      = env("DATABASE_URL")
    // Configurações adicionais de segurança
}
```

## 📊 Monitoramento

### Prisma Studio

```bash
# Abrir interface visual do banco
npx prisma studio
```

### Logs de Consulta

```typescript
// Habilitar logs em desenvolvimento
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

## 🔄 Backup e Restauração

### Backup

```bash
# Backup do schema
npx prisma db pull

# Backup dos dados (MySQL)
mysqldump -u usuario -p sistema_estagio > backup.sql
```

### Restauração

```bash
# Restaurar schema
npx prisma db push

# Restaurar dados (MySQL)
mysql -u usuario -p sistema_estagio < backup.sql
``` 