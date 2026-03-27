import api from './api';
import type { AuthTokenPayload } from '@/pages/Auth/types';

export const authService = {
  async requestMagicLink(email: string): Promise<void> {
    await api.post('/auth/magic-link', { email });
  },

  async verifyMagicLink(token: string): Promise<AuthTokenPayload> {
    const { data } = await api.post<AuthTokenPayload>('/auth/verify', { token });
    return data;
  },

  async getMe(): Promise<AuthTokenPayload['user']> {
    const { data } = await api.get<AuthTokenPayload['user']>('/auth/me');
    return data;
  },
};
