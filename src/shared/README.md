# Módulo Shared

## 📋 Descrição

Módulo que contém código compartilhado entre todos os outros módulos da aplicação. Inclui middlewares, utilitários, tratamento de erros e definições de tipos comuns.

## 🏗️ Estrutura

```
shared/
├── errors/
│   └── AppError.ts             # Classe de erro personalizada
├── middlewares/
│   ├── autenticarJWT.ts        # Middleware de autenticação JWT
│   └── errorHandler.ts         # Middleware de tratamento de erros
├── utils/
│   ├── gerarToken.ts           # Utilitário para gerar tokens JWT
│   └── hash.ts                 # Utilitário para criptografia
└── README.md                   # Este arquivo
```

## 🔧 Componentes

### Errors

#### AppError
Classe personalizada para tratamento de erros da aplicação.

```typescript
class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
}
```

**Características:**
- Herda da classe Error nativa
- Inclui código de status HTTP
- Flag para identificar erros operacionais
- Facilita o tratamento centralizado de erros

### Middlewares

#### autenticarJWT
Middleware para autenticação via JWT.

**Funcionalidades:**
- Validação de token JWT
- Extração de dados do usuário
- Adição de informações ao request
- Redirecionamento para erro em caso de falha

**Uso:**
```typescript
router.get("/rota-protegida", autenticarJWT, controller.method);
```

#### errorHandler
Middleware global para tratamento de erros.

**Funcionalidades:**
- Captura de erros não tratados
- Formatação padronizada de respostas de erro
- Log de erros para debugging
- Resposta adequada ao cliente

### Utils

#### gerarToken
Utilitário para geração de tokens JWT.

**Funcionalidades:**
- Geração de token com payload personalizado
- Configuração de tempo de expiração
- Assinatura com chave secreta
- Retorno de token formatado

**Uso:**
```typescript
const token = gerarToken({ userId: 1, email: "user@example.com" });
```

#### hash
Utilitário para criptografia de senhas.

**Funcionalidades:**
- Criptografia de senhas com bcrypt
- Comparação de senhas criptografadas
- Configuração de salt rounds
- Validação de hash

**Uso:**
```typescript
// Criptografar senha
const senhaCriptografada = await hash(senha);

// Verificar senha
const senhaValida = await verificarHash(senha, senhaCriptografada);
```

## 🔐 Autenticação

### Fluxo de Autenticação

1. **Login** - Usuário fornece credenciais
2. **Validação** - Sistema valida email e senha
3. **Geração de Token** - Sistema gera JWT com dados do usuário
4. **Retorno** - Token é retornado ao cliente
5. **Uso** - Cliente inclui token em requisições subsequentes

### Estrutura do Token JWT

```typescript
interface TokenPayload {
  userId: number;
  email: string;
  iat: number;  // Issued at
  exp: number;  // Expiration
}
```

### Configuração

O middleware de autenticação espera as seguintes variáveis de ambiente:

```env
JWT_SECRET=sua_chave_secreta_muito_segura
JWT_EXPIRES_IN=24h
```

## 🚨 Tratamento de Erros

### Tipos de Erro

- **AppError** - Erros operacionais da aplicação
- **ValidationError** - Erros de validação
- **AuthenticationError** - Erros de autenticação
- **DatabaseError** - Erros de banco de dados

### Estrutura de Resposta de Erro

```json
{
  "success": false,
  "error": "Mensagem de erro",
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Códigos de Status

- **400** - Bad Request (dados inválidos)
- **401** - Unauthorized (não autenticado)
- **403** - Forbidden (não autorizado)
- **404** - Not Found (recurso não encontrado)
- **500** - Internal Server Error (erro interno)

## 🔒 Segurança

### JWT (JSON Web Tokens)

- **Algoritmo**: HS256
- **Expiração**: Configurável via variável de ambiente
- **Payload**: Dados mínimos necessários
- **Assinatura**: Chave secreta forte

### Criptografia de Senhas

- **Algoritmo**: bcrypt
- **Salt Rounds**: 10 (configurável)
- **Comparação**: Segura contra timing attacks

### Headers de Segurança

```typescript
// Headers CORS configurados
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
```

## 📝 Exemplos de Uso

### Criando um Erro Personalizado

```typescript
import { AppError } from "../shared/errors/AppError";

throw new AppError("Usuário não encontrado", 404);
```

### Usando Middleware de Autenticação

```typescript
import { autenticarJWT } from "../shared/middlewares/autenticarJWT";

router.get("/perfil", autenticarJWT, (req, res) => {
  // req.user contém os dados do usuário autenticado
  res.json({ user: req.user });
});
```

### Gerando Token

```typescript
import { gerarToken } from "../shared/utils/gerarToken";

const token = gerarToken({
  userId: usuario.id,
  email: usuario.email
});
```

### Criptografando Senha

```typescript
import { hash } from "../shared/utils/hash";

const senhaCriptografada = await hash("senha123");
```

## ⚙️ Configuração

### Variáveis de Ambiente Necessárias

```env
# JWT
JWT_SECRET=sua_chave_secreta_muito_segura
JWT_EXPIRES_IN=24h

# Criptografia
BCRYPT_SALT_ROUNDS=10

# Servidor
PORT=3000
NODE_ENV=development
```

### Configuração do Middleware de Erro

O middleware de erro deve ser registrado **após** todas as rotas:

```typescript
// Rotas da aplicação
app.use(routes());

// Middleware de tratamento de erros (sempre no final)
app.use(errorHandler);
```

## 🧪 Testes

### Testando Middleware de Autenticação

```typescript
// Token válido
const token = gerarToken({ userId: 1, email: "test@example.com" });
req.headers.authorization = `Bearer ${token}`;

// Token inválido
req.headers.authorization = "Bearer token_invalido";
```

### Testando Tratamento de Erros

```typescript
// Erro operacional
throw new AppError("Erro de validação", 400);

// Erro não tratado
throw new Error("Erro inesperado");
```

## 🔄 Reutilização

Todos os componentes deste módulo são projetados para serem reutilizáveis em toda a aplicação:

- **AppError** - Use em qualquer lugar que precise lançar erros
- **autenticarJWT** - Use em qualquer rota que precise de autenticação
- **errorHandler** - Registre uma vez no servidor
- **gerarToken** - Use em qualquer lugar que precise gerar tokens
- **hash** - Use para qualquer operação de criptografia de senhas 