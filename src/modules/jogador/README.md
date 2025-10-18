# Módulo Jogador

Este módulo gerencia os jogadores do sistema.

## Estrutura

```
jogador/
├── controllers/
│   └── JogadorController.ts
├── services/
│   └── JogadorService.ts
├── repositories/
│   └── JogadorRepository.ts
├── models/
│   └── JogadorModel.ts
├── dtos/
│   ├── JogadorRequestDTO.ts
│   ├── JogadorResponseDTO.ts
│   └── JogadorUpdateDTO.ts
├── validations/
│   └── jogadorValidations.ts
├── routes.ts
└── README.md
```

## Endpoints

### 1. Listar Jogadores (com paginação)
- **GET** `/jogador?page=1&limit=10&search=termo&curso_id=1`
- **Auth**: Requerida (JWT)
- **Query Params**:
  - `page` (opcional): Número da página (padrão: 1)
  - `limit` (opcional): Items por página (padrão: 10, máx: 100)
  - `search` (opcional): Termo de busca (nome ou RM)
  - `curso_id` (opcional): Filtrar por curso
- **Resposta**: Objeto com dados e paginação

### 2. Listar Jogadores por Curso
- **GET** `/jogador/curso/:curso_id`
- **Auth**: Requerida (JWT)
- **Resposta**: Array de jogadores do curso

### 3. Buscar Jogador por ID
- **GET** `/jogador/:id`
- **Auth**: Requerida (JWT)
- **Resposta**: Jogador encontrado (com dados do curso)

### 4. Criar Jogador
- **POST** `/jogador`
- **Auth**: Requerida (JWT)
- **Body**:
```json
{
  "nome": "Nome do Jogador",
  "rm": "123456",
  "curso_id": 1
}
```
- **Validações**:
  - Nome: obrigatório, mínimo 2, máximo 100 caracteres
  - RM: obrigatório, mínimo 3, máximo 20 caracteres, único
  - Curso ID: obrigatório, deve existir
- **Resposta**: Jogador criado (201)

### 5. Atualizar Jogador
- **PUT** `/jogador/:id`
- **Auth**: Requerida (JWT)
- **Body**:
```json
{
  "nome": "Novo Nome",
  "rm": "654321",
  "curso_id": 2
}
```
- **Validações**:
  - Nome: opcional, mínimo 2, máximo 100 caracteres
  - RM: opcional, mínimo 3, máximo 20 caracteres, único
  - Curso ID: opcional, deve existir
- **Resposta**: Jogador atualizado

### 6. Deletar Jogador
- **DELETE** `/jogador/:id`
- **Auth**: Requerida (JWT)
- **Regras**:
  - Não é possível excluir jogador vinculado a times
- **Resposta**: 204 (sem conteúdo)

## Regras de Negócio

1. RM deve ser único no sistema
2. Curso deve existir
3. Não é possível excluir um jogador vinculado a times
4. Ao atualizar o curso, o novo curso deve existir

## Códigos de Status

- **200**: Sucesso
- **201**: Criado com sucesso
- **204**: Deletado com sucesso
- **400**: Erro de validação ou regra de negócio
- **404**: Jogador ou Curso não encontrado
- **401**: Não autenticado

