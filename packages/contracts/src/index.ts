export interface ApiResponse<TData> {
  data: TData;
  message?: string;
}

export interface PaginationContract {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
