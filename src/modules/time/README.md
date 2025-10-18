# Módulo Time

Este módulo gerencia os times do sistema.

## Estrutura

```
time/
├── controllers/
│   └── TimeController.ts
├── services/
│   └── TimeService.ts
├── repositories/
│   └── TimeRepository.ts
├── models/
│   └── TimeModel.ts
├── dtos/
│   ├── TimeRequestDTO.ts
│   ├── TimeResponseDTO.ts
│   └── TimeUpdateDTO.ts
├── validations/
│   └── timeValidations.ts
├── routes.ts
└── README.md
```

## Endpoints

### 1. Listar Times (com paginação)
- **GET** `/time?page=1&limit=10&search=termo&curso_id=1`
- **Auth**: Requerida (JWT)
- **Query Params**:
  - `page` (opcional): Número da página (padrão: 1)
  - `limit` (opcional): Items por página (padrão: 10, máx: 100)
  - `search` (opcional): Termo de busca (nome)
  - `curso_id` (opcional): Filtrar por curso
- **Resposta**: Objeto com dados e paginação

### 2. Listar Times por Curso
- **GET** `/time/curso/:curso_id`
- **Auth**: Requerida (JWT)
- **Resposta**: Array de times do curso

### 3. Buscar Time por ID
- **GET** `/time/:id`
- **Auth**: Requerida (JWT)
- **Resposta**: Time encontrado (com dados completos)

### 4. Criar Time
- **POST** `/time`
- **Auth**: Requerida (JWT)
- **Body**:
```json
{
  "nome": "Nome do Time",
  "jogador1_id": 1,
  "jogador2_id": 2,
  "suporte_id": 3,
  "curso_id": 1,
  "cadastrado_por": "admin@example.com"
}
```
- **Validações**:
  - Nome: obrigatório, mínimo 2, máximo 100 caracteres, único
  - Jogador 1 ID: obrigatório, deve existir
  - Jogador 2 ID: obrigatório, deve existir
  - Suporte ID: obrigatório, deve existir
  - Curso ID: obrigatório, deve existir
  - Cadastrado por: obrigatório, mínimo 2 caracteres
  - Jogadores não podem ser duplicados
  - Todos jogadores devem pertencer ao mesmo curso
- **Resposta**: Time criado (201)

### 5. Atualizar Time
- **PUT** `/time/:id`
- **Auth**: Requerida (JWT)
- **Body**:
```json
{
  "nome": "Novo Nome",
  "jogador1_id": 4,
  "jogador2_id": 5,
  "suporte_id": 6,
  "curso_id": 1
}
```
- **Validações**:
  - Nome: opcional, mínimo 2, máximo 100 caracteres, único
  - Jogador IDs: opcionais, devem existir
  - Curso ID: opcional, deve existir
  - Jogadores não podem ser duplicados
  - Jogadores devem pertencer ao curso do time
- **Resposta**: Time atualizado

### 6. Deletar Time
- **DELETE** `/time/:id`
- **Auth**: Requerida (JWT)
- **Resposta**: 204 (sem conteúdo)

## Regras de Negócio

1. Nome do time deve ser único
2. Todos os jogadores devem existir
3. Curso deve existir
4. Jogador 1, Jogador 2 e Suporte devem ser diferentes
5. Todos os jogadores devem pertencer ao mesmo curso do time
6. Ao atualizar, se mudar o curso, validar se os jogadores pertencem ao novo curso

## Relacionamentos

- Time pertence a um Curso
- Time tem um Jogador 1 (principal)
- Time tem um Jogador 2 (principal)
- Time tem um Suporte

## Códigos de Status

- **200**: Sucesso
- **201**: Criado com sucesso
- **204**: Deletado com sucesso
- **400**: Erro de validação ou regra de negócio
- **404**: Time, Jogador ou Curso não encontrado
- **401**: Não autenticado

