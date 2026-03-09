export interface ApiResponse<TData> {
  data: TData;
  message?: string;
}

export interface PaginationDTO {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
