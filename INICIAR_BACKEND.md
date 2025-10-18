# 🚀 Como Iniciar o Backend

## 📋 **Pré-requisitos:**

1. **Node.js** instalado (versão 18 ou superior)
2. **npm** ou **yarn** instalado
3. **Banco de dados** configurado (MySQL/PostgreSQL)

## 🔧 **Passos para iniciar:**

### 1. **Instalar dependências:**

```bash
cd "Sistema Estagio - BackEnd"
npm install
```

### 2. **Configurar banco de dados:**

```bash
# Se usar Prisma
npx prisma generate
npx prisma db push

# Ou se usar SQL direto
# Importar o arquivo db.sql no seu banco
```

### 3. **Iniciar o servidor:**

```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Modo produção
npm run build
npm  start
```

## 🌐 **Endpoints disponíveis:**

### **Rotas Públicas (sem autenticação):**

```
GET /termo-estagio/estagio      → Lista de estágios
GET /termo-estagio/aluno        → Lista de alunos
GET /termo-estagio/empresa      → Lista de empresas
GET /termo-estagio/instituicao  → Lista de instituições
GET /termo-estagio/curso        → Lista de cursos
GET /termo-estagio/cidade       → Lista de cidades
GET /termo-estagio/seguradora   → Lista de seguradoras
```

### **Rotas Protegidas (com autenticação JWT):**

```
POST /auth/login                → Login de usuário
GET  /estagio                   → Lista de estágios (protegido)
GET  /aluno                     → Lista de alunos (protegido)
GET  /empresa                   → Lista de empresas (protegido)
# ... outras rotas protegidas
```

## ⚠️ **Importante:**

- **Porta padrão**: 3000 (não 3001!)
- **CORS**: Configurado para aceitar qualquer origem
- **Autenticação**: Rotas principais requerem token JWT
- **Termo de Estágio**: Rotas públicas para facilitar o uso

## 🔍 **Verificar se está funcionando:**

```bash
# Testar se o servidor está rodando
curl http://localhost:3000/termo-estagio/estagio

# Deve retornar uma lista de estágios ou erro de banco
```

## 🚨 **Problemas comuns:**

### **Porta já em uso:**

```bash
# Verificar portas em uso
netstat -ano | findstr :3000

# Matar processo na porta
taskkill /PID <PID> /F
```

### **Banco não conecta:**

- Verificar credenciais do banco
- Verificar se o banco está rodando
- Verificar se as tabelas existem

### **Dependências não instalam:**

```bash
# Limpar cache
npm cache clean --force

# Remover node_modules e reinstalar
rm -rf node_modules
npm install
```

## 💡 **Dicas:**

1. **Sempre inicie o backend primeiro**
2. **Use `npm run dev` para desenvolvimento**
3. **Monitore os logs no terminal**
4. **Verifique se o banco está acessível**
5. **Teste as rotas públicas primeiro**
