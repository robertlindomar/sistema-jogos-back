# Módulo Usuário

## 📋 Descrição

Módulo responsável pela gestão de usuários do sistema, incluindo autenticação, criação, atualização e exclusão de contas de usuário.

## 🏗️ Estrutura

```
usuario/
├── controllers/
│   └── UsuarioController.ts    # Controlador principal
├── dtos/
│   ├── LoginDTO.ts             # DTO para login
│   ├── TrocarSenhaDTO.ts       # DTO para troca de senha
│   ├── UsuarioRequestDTO.ts    # DTO para requisições
│   └── UsuarioResponseDTO.ts   # DTO para respostas
├── models/
│   └── UsuarioModel.ts         # Modelo de dados
├── repositories/
│   └── UsuarioRepository.ts    # Camada de acesso a dados
├── services/
│   └── UsuarioService.ts       # Lógica de negócio
├── routes.ts                   # Definição das rotas
└── README.md                   # Este arquivo
```

## 📡 Endpoints

### Autenticação
- `POST /auth/login` - Realizar login no sistema

### CRUD de Usuários
- `GET /usuario` - Listar todos os usuários
- `GET /usuario/:id` - Buscar usuário por ID
- `POST /usuario` - Criar novo usuário
- `PUT /usuario/:id` - Atualizar usuário
- `DELETE /usuario/:id` - Excluir usuário

### Operações Específicas
- `PUT /usuario/senha/:id` - Trocar senha do usuário
- `GET /usuario/email/:email` - Buscar usuário por email

## 🔐 Autenticação

Todos os endpoints (exceto login) requerem autenticação JWT através do header:
```
Authorization: Bearer <token>
```

## 📊 Modelo de Dados

```typescript
interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  createdAt: Date;
}
```

## 🛠️ Funcionalidades

### Login
- Validação de credenciais
- Geração de token JWT
- Retorno de dados do usuário (sem senha)

### Criação de Usuário
- Validação de dados obrigatórios
- Verificação de email único
- Criptografia de senha com bcrypt
- Criação de registro no banco

### Atualização
- Validação de dados
- Atualização seletiva de campos
- Manutenção de integridade dos dados

### Troca de Senha
- Validação da senha atual
- Criptografia da nova senha
- Atualização segura

## 🔒 Segurança

- Senhas criptografadas com bcrypt
- Autenticação JWT
- Validação de dados de entrada
- Tratamento de erros seguro

## 📝 Exemplos de Uso

### Login
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "senha": "senha123"
}
```

### Criar Usuário
```bash
POST /usuario
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "senha": "senha123"
}
```

### Trocar Senha
```bash
PUT /usuario/senha/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "senhaAtual": "senha123",
  "novaSenha": "novaSenha456"
}
```

## ⚠️ Validações

- Email deve ser único no sistema
- Senha deve ter pelo menos 6 caracteres
- Nome é obrigatório
- Email deve ter formato válido

## 🚨 Tratamento de Erros

- Email já cadastrado
- Credenciais inválidas
- Usuário não encontrado
- Senha atual incorreta
- Dados obrigatórios ausentes 