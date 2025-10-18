export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  tipo?: 'Inicial' | 'Parcial' | 'Final';
  status?: 'pendente' | 'entregue' | 'atrasado';
}
