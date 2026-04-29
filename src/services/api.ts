import axios, { type AxiosError } from 'axios';
import { API_BASE_URL, AUTH_TOKEN_KEY, ROUTES } from '@/constants';
import type { ApiError } from '@/services/types';
import { API_TIMEOUT } from '@/constants/api-config';
import { HTTP_STATUS } from '@/constants/http-status';
import { API_ROUTES } from '@/constants/api-routes';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url;
    const isVerifyRequest = requestUrl?.includes(API_ROUTES.AUTH_VERIFY);

    if (status === HTTP_STATUS.UNAUTHORIZED && !isVerifyRequest) {
      window.location.href = ROUTES.INACTIVITY;
    }

    const serverMessage = error.response?.data?.message;

    const message = Array.isArray(serverMessage)
      ? serverMessage.join(', ')
      : (serverMessage ?? error.message ?? 'An unexpected error occurred');

    return Promise.reject(new Error(message));
  },
);
