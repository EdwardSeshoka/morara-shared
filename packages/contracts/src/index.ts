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

export * from "./discover.js";
export * from "./wines.js";
