import type { AxiosError } from 'axios';
import { ROUTES } from '@/constants';
import { API_ROUTES } from '@/constants/api-routes';
import { api } from '@/services/api';

type ResponseInterceptor = {
  handlers: Array<{
    rejected?: (error: AxiosError) => Promise<never>;
  }>;
};

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (k: string) => k }) }));

describe('API interceptor', () => {
  it('redirects to /inactivity on 401 responses', async () => {
    const handlers = (api.interceptors.response as unknown as ResponseInterceptor).handlers;
    const errHandler = handlers.find((handler) => handler.rejected)?.rejected;

    const location = { href: 'http://localhost' } as Location;
    Object.defineProperty(window, 'location', {
      value: location,
      writable: true,
    });

    const fakeError = {
      response: { status: 401, data: {} },
      config: { url: '/users/me' },
      message: 'Unauthorized',
    } as AxiosError;

    await expect(
      errHandler?.(fakeError) ?? Promise.reject(new Error('missing handler')),
    ).rejects.toThrow();
    expect(window.location.href).toBe(ROUTES.INACTIVITY);
  });

  it('does not redirect for verify requests containing AUTH_VERIFY', async () => {
    const handlers = (api.interceptors.response as unknown as ResponseInterceptor).handlers;
    const errHandler = handlers.find((handler) => handler.rejected)?.rejected;

    const location = { href: 'http://localhost' } as Location;
    Object.defineProperty(window, 'location', {
      value: location,
      writable: true,
    });

    const fakeError = {
      response: { status: 401, data: {} },
      config: { url: API_ROUTES.AUTH_VERIFY },
      message: 'Unauthorized',
    } as AxiosError;

    await expect(
      errHandler?.(fakeError) ?? Promise.reject(new Error('missing handler')),
    ).rejects.toThrow();
    expect(window.location.href).toBe('http://localhost');
  });
});
