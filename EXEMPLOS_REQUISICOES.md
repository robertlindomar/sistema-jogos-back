# Exemplos de Requisições - API

Base URL: `http://localhost:3000`

## 🔐 Autenticação

Todas as rotas (exceto login) requerem token JWT no header:
```
Authorization: Bearer SEU_TOKEN_AQUI
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@sistema.com",
  "senha": "123456"
}
```

---

## 👤 Módulo Usuário

### 1. Listar Usuários
```http
GET /usuario
Authorization: Bearer SEU_TOKEN
```

### 2. Buscar Usuário por ID
```http
GET /usuario/1
Authorization: Bearer SEU_TOKEN
```

### 3. Buscar Usuário por Email
```http
GET /usuario/email/admin@sistema.com
Authorization: Bearer SEU_TOKEN
```

### 4. Atualizar Usuário
```http
PUT /usuario/1
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "nome": "Admin Atualizado",
  "email": "admin@sistema.com"
}
```

### 5. Trocar Senha
```http
PUT /usuario/senha/1
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "senha_atual": "123456",
  "nova_senha": "novaSenha123"
}
```

### 6. Deletar Usuário
```http
DELETE /usuario/1
Authorization: Bearer SEU_TOKEN
```

---

## 📚 Módulo Curso

### 1. Criar Curso
```http
POST /curso
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "nome": "Engenharia de Software"
}
```

**Resposta (201)**:
```json
{
  "id": 1,
  "nome": "Engenharia de Software",
  "createdAt": "2024-10-11T15:30:00.000Z",
  "updatedAt": "2024-10-11T15:30:00.000Z"
}
```

### 2. Listar Todos os Cursos
```http
GET /curso/all
Authorization: Bearer SEU_TOKEN
```

**Resposta (200)**:
```json
[
  {
    "id": 1,
    "nome": "Engenharia de Software",
    "createdAt": "2024-10-11T15:30:00.000Z",
    "updatedAt": "2024-10-11T15:30:00.000Z"
  }
]
```

### 3. Listar Cursos com Paginação
```http
GET /curso?page=1&limit=10&search=Software
Authorization: Bearer SEU_TOKEN
```

**Resposta (200)**:
```json
{
  "data": [
    {
      "id": 1,
      "nome": "Engenharia de Software",
      "createdAt": "2024-10-11T15:30:00.000Z",
      "updatedAt": "2024-10-11T15:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

### 4. Buscar Curso por ID
```http
GET /curso/1
Authorization: Bearer SEU_TOKEN
```

### 5. Atualizar Curso
```http
PUT /curso/1
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "nome": "Engenharia de Software Avançada"
}
```

### 6. Deletar Curso
```http
DELETE /curso/1
Authorization: Bearer SEU_TOKEN
```

**Resposta (204)**: Sem conteúdo

---

## 👤 Módulo Jogador

### 1. Criar Jogador
```http
POST /jogador
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "nome": "João Silva",
  "rm": "123456",
  "curso_id": 1
}
```

**Resposta (201)**:
```json
{
  "id": 1,
  "nome": "João Silva",
  "rm": "123456",
  "curso_id": 1,
  "curso": {
    "id": 1,
    "nome": "Engenharia de Software"
  },
  "createdAt": "2024-10-11T15:30:00.000Z",
  "updatedAt": "2024-10-11T15:30:00.000Z"
}
```

### 2. Listar Jogadores com Paginação
```http
GET /jogador?page=1&limit=10&search=João&curso_id=1
Authorization: Bearer SEU_TOKEN
```

**Resposta (200)**:
```json
{
  "data": [
    {
      "id": 1,
      "nome": "João Silva",
      "rm": "123456",
      "curso_id": 1,
      "curso": {
        "id": 1,
        "nome": "Engenharia de Software"
      },
      "createdAt": "2024-10-11T15:30:00.000Z",
      "updatedAt": "2024-10-11T15:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

### 3. Listar Jogadores por Curso
```http
GET /jogador/curso/1
Authorization: Bearer SEU_TOKEN
```

### 4. Buscar Jogador por ID
```http
GET /jogador/1
Authorization: Bearer SEU_TOKEN
```

### 5. Atualizar Jogador
```http
PUT /jogador/1
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "nome": "João da Silva",
  "rm": "123456",
  "curso_id": 1
}
```

### 6. Deletar Jogador
```http
DELETE /jogador/1
Authorization: Bearer SEU_TOKEN
```

---

## 🏆 Módulo Time

### 1. Criar Time
```http
POST /time
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "nome": "Team Rocket",
  "jogador1_id": 1,
  "jogador2_id": 2,
  "suporte_id": 3,
  "curso_id": 1,
  "cadastrado_por": "admin@example.com"
}
```

**Resposta (201)**:
```json
{
  "id": 1,
  "nome": "Team Rocket",
  "jogador1_id": 1,
  "jogador2_id": 2,
  "suporte_id": 3,
  "curso_id": 1,
  "cadastrado_por": "admin@example.com",
  "data_cadastro": "2024-10-11T15:30:00.000Z",
  "jogador1": {
    "id": 1,
    "nome": "João Silva",
    "rm": "123456"
  },
  "jogador2": {
    "id": 2,
    "nome": "Maria Santos",
    "rm": "654321"
  },
  "suporte": {
    "id": 3,
    "nome": "Pedro Oliveira",
    "rm": "789012"
  },
  "curso": {
    "id": 1,
    "nome": "Engenharia de Software"
  },
  "createdAt": "2024-10-11T15:30:00.000Z",
  "updatedAt": "2024-10-11T15:30:00.000Z"
}
```

### 2. Listar Times com Paginação
```http
GET /time?page=1&limit=10&search=Rocket&curso_id=1
Authorization: Bearer SEU_TOKEN
```

**Resposta (200)**:
```json
{
  "data": [
    {
      "id": 1,
      "nome": "Team Rocket",
      "jogador1_id": 1,
      "jogador2_id": 2,
      "suporte_id": 3,
      "curso_id": 1,
      "cadastrado_por": "admin@example.com",
      "data_cadastro": "2024-10-11T15:30:00.000Z",
      "jogador1": {
        "id": 1,
        "nome": "João Silva",
        "rm": "123456"
      },
      "jogador2": {
        "id": 2,
        "nome": "Maria Santos",
        "rm": "654321"
      },
      "suporte": {
        "id": 3,
        "nome": "Pedro Oliveira",
        "rm": "789012"
      },
      "curso": {
        "id": 1,
        "nome": "Engenharia de Software"
      },
      "createdAt": "2024-10-11T15:30:00.000Z",
      "updatedAt": "2024-10-11T15:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

### 3. Listar Times por Curso
```http
GET /time/curso/1
Authorization: Bearer SEU_TOKEN
```

### 4. Buscar Time por ID
```http
GET /time/1
Authorization: Bearer SEU_TOKEN
```

### 5. Atualizar Time
```http
PUT /time/1
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "nome": "Team Rocket Pro",
  "jogador1_id": 1,
  "jogador2_id": 2,
  "suporte_id": 3
}
```

### 6. Deletar Time
```http
DELETE /time/1
Authorization: Bearer SEU_TOKEN
```

---

## ❌ Exemplos de Erros

### Validação
```http
POST /curso
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "nome": "A"
}
```

**Resposta (400)**:
```json
{
  "message": "Nome deve ter pelo menos 2 caracteres",
  "statusCode": 400
}
```

### Não Encontrado
```http
GET /curso/999
Authorization: Bearer SEU_TOKEN
```

**Resposta (404)**:
```json
{
  "message": "Curso não encontrado",
  "statusCode": 404
}
```

### Regra de Negócio
```http
DELETE /curso/1
Authorization: Bearer SEU_TOKEN
```

**Resposta (400)**:
```json
{
  "message": "Não é possível excluir um curso que possui jogadores cadastrados",
  "statusCode": 400
}
```

### Não Autenticado
```http
GET /curso
```

**Resposta (401)**:
```json
{
  "message": "Token não fornecido",
  "statusCode": 401
}
```

---

## 🧪 Fluxo de Teste Completo

### 1. Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@sistema.com",
  "senha": "123456"
}
```

### 2. Criar Curso
```http
POST /curso
Authorization: Bearer TOKEN_DO_PASSO_1
Content-Type: application/json

{
  "nome": "Engenharia de Software"
}
```

### 3. Criar Jogadores
```http
POST /jogador
Authorization: Bearer TOKEN_DO_PASSO_1
Content-Type: application/json

{
  "nome": "João Silva",
  "rm": "123456",
  "curso_id": ID_DO_CURSO_CRIADO
}
```

Repetir para criar mais 2 jogadores (Maria e Pedro).

### 4. Criar Time
```http
POST /time
Authorization: Bearer TOKEN_DO_PASSO_1
Content-Type: application/json

{
  "nome": "Team Rocket",
  "jogador1_id": ID_JOAO,
  "jogador2_id": ID_MARIA,
  "suporte_id": ID_PEDRO,
  "curso_id": ID_DO_CURSO,
  "cadastrado_por": "admin@sistema.com"
}
```

### 5. Listar Times
```http
GET /time
Authorization: Bearer TOKEN_DO_PASSO_1
```

---

## 📝 Notas

- Substitua `SEU_TOKEN` pelo token JWT obtido no login
- Substitua os IDs pelos valores reais retornados nas criações
- Todas as datas são retornadas em formato ISO 8601
- Paginação padrão: page=1, limit=10
- Máximo de items por página: 100

