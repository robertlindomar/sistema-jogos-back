import { PaginationParams, PaginationQuery } from '../interfaces/PaginationResponse';

/**
 * Processa os parâmetros de paginação da query string
 * @param query - Parâmetros da query (page, limit)
 * @returns Objeto com page, limit e skip calculado
 */
export function processPaginationParams(query: PaginationParams): PaginationQuery {
  const page = Math.max(1, parseInt(String(query.page)) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(String(query.limit)) || 10));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

/**
 * Calcula os metadados de paginação
 * @param total - Total de registros
 * @param page - Página atual
 * @param limit - Limite por página
 * @returns Metadados de paginação
 */
export function calculatePaginationMetadata(total: number, page: number, limit: number) {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext,
    hasPrev,
  };
}
