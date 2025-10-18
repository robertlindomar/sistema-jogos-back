# Módulo Curso

Este módulo gerencia os cursos do sistema.

## Estrutura

```
curso/
├── controllers/
│   └── CursoController.ts
├── services/
│   └── CursoService.ts
├── repositories/
│   └── CursoRepository.ts
├── models/
│   └── CursoModel.ts
├── dtos/
│   ├── CursoRequestDTO.ts
│   ├── CursoResponseDTO.ts
│   └── CursoUpdateDTO.ts
├── validations/
│   └── cursoValidations.ts
├── routes.ts
└── README.md
```

## Endpoints

### 1. Listar Todos os Cursos (sem paginação)
- **GET** `/curso/all`
- **Auth**: Requerida (JWT)
- **Resposta**: Array de cursos

### 2. Listar Cursos (com paginação)
- **GET** `/curso?page=1&limit=10&search=termo`
- **Auth**: Requerida (JWT)
- **Query Params**:
  - `page` (opcional): Número da página (padrão: 1)
  - `limit` (opcional): Items por página (padrão: 10, máx: 100)
  - `search` (opcional): Termo de busca
- **Resposta**: Objeto com dados e paginação

### 3. Buscar Curso por ID
- **GET** `/curso/:id`
- **Auth**: Requerida (JWT)
- **Resposta**: Curso encontrado

### 4. Criar Curso
- **POST** `/curso`
- **Auth**: Requerida (JWT)
- **Body**:
```json
{
  "nome": "Nome do Curso"
}
```
- **Validações**:
  - Nome: obrigatório, mínimo 2, máximo 100 caracteres
- **Resposta**: Curso criado (201)

### 5. Atualizar Curso
- **PUT** `/curso/:id`
- **Auth**: Requerida (JWT)
- **Body**:
```json
{
  "nome": "Novo Nome do Curso"
}
```
- **Validações**:
  - Nome: opcional, mínimo 2, máximo 100 caracteres
- **Resposta**: Curso atualizado

### 6. Deletar Curso
- **DELETE** `/curso/:id`
- **Auth**: Requerida (JWT)
- **Regras**:
  - Não é possível excluir curso com jogadores cadastrados
  - Não é possível excluir curso com times cadastrados
- **Resposta**: 204 (sem conteúdo)

## Regras de Negócio

1. Não pode haver dois cursos com o mesmo nome
2. Não é possível excluir um curso que possui jogadores
3. Não é possível excluir um curso que possui times

## Códigos de Status

- **200**: Sucesso
- **201**: Criado com sucesso
- **204**: Deletado com sucesso
- **400**: Erro de validação ou regra de negócio
- **404**: Curso não encontrado
- **401**: Não autenticado

