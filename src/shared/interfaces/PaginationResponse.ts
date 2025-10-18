export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  tipo?: 'Inicial' | 'Parcial' | 'Final';
  status?: 'pendente' | 'entregue' | 'atrasado';
}

export interface PaginationQuery {
  page: number;
  limit: number;
  skip: number;
}
