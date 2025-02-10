export interface ApiError {
  message?: string;
  error?: string;
  detail?: string;
  code?: string;
  status?: number;
  data?: unknown;
}
