import axios, { AxiosError, AxiosInstance } from 'axios';

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BASE) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not set');
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public path: string,
    public code?: string,
  ) {
    super(`${status} ${statusText}${code ? ` [${code}]` : ''} (${path})`);
    this.name = 'ApiError';
  }
}

type Envelope<T> = { code?: string; msg?: string; data?: T };

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE,
  headers: { Accept: 'application/json' },
  timeout: 15000,
});

apiClient.interceptors.response.use(
  (response) => {
    const body = response.data as Envelope<unknown> | undefined;
    if (body && typeof body === 'object' && 'code' in body) {
      if (body.code && body.code !== '00000') {
        const path = response.config?.url ?? '';
        throw new ApiError(response.status, body.msg ?? '业务错误', path, body.code);
      }
      response.data = body.data;
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 404) {
      return Promise.resolve({ data: null } as never);
    }
    const path = error.config?.url ?? '';
    const status = error.response?.status ?? 0;
    const statusText = error.response?.statusText ?? error.message;
    throw new ApiError(status, statusText, path);
  },
);
