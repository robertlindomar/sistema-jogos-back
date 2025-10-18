# Deploy na Vercel - Backend

## Configuração para Deploy

### 1. Variáveis de Ambiente
Configure as seguintes variáveis de ambiente no painel da Vercel:

```bash
# Database URLs (Supabase)
DATABASE_URL="postgresql://username:password@host:port/database"
DIRECT_URL="postgresql://username:password@host:port/database"

# Frontend URLs
URL_APP="https://seu-frontend.vercel.app"
FRONTEND_URL="https://seu-frontend.vercel.app"

# Server Configuration
JWT_SECRET="seu_segredo_jwt_super_seguro"

# Admin User
NOME_ADMIN="Admin Sistema"
EMAIL_ADMIN="admin@sistema.com"
SENHA_ADMIN="123456"
```

### 2. Estrutura de Arquivos
- `src/server.ts` - Servidor principal da API
- `vercel.json` - Configuração do deploy
- `.vercelignore` - Arquivos ignorados no deploy

### 3. Comandos de Deploy

#### Deploy via CLI:
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login na Vercel
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

#### Deploy via GitHub:
1. Conecte o repositório GitHub à Vercel
2. Configure as variáveis de ambiente
3. Faça push para a branch principal

### 4. URLs da API
Após o deploy, a API estará disponível em:
- `https://seu-projeto.vercel.app/`

### 5. Endpoints Principais
- `POST /auth/login` - Login
- `GET /curso` - Listar cursos
- `GET /jogador` - Listar jogadores
- `GET /time` - Listar times
- `POST /convite/public/validar` - Validar convite

### 6. Troubleshooting

#### Erro de Prisma:
- Verifique se `DATABASE_URL` está configurada
- Execute `npx prisma generate` localmente

#### Erro de CORS:
- Verifique se `FRONTEND_URL` está configurada corretamente
- Ajuste as configurações de CORS no `server.ts`

#### Timeout:
- Aumente o `maxDuration` no `vercel.json` se necessário
