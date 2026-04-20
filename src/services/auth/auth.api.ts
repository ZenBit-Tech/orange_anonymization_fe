import api from '@/services/api';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY, AUTH_SESSION_STARTED_AT_KEY } from '@/constants';

interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
  };
}

export const login = async (email: string): Promise<void> => {
  const { data } = await api.post<AuthResponse>('/auth/login', { email });

  localStorage.setItem(AUTH_TOKEN_KEY, data.accessToken);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
  localStorage.setItem(AUTH_SESSION_STARTED_AT_KEY, Date.now().toString());
};

export const verify = async (token: string) => {
  return await api.get<AuthResponse>(`/auth/verify?token=${token}`);
};
