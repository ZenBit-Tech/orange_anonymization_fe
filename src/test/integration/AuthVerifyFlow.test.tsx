import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { store } from '@/store/store';
import * as authApi from '@/services/auth/auth.api';
import * as userApi from '@/services/user/user.api';
import { TokenPage } from '@/pages/TokenPage';
import { AUTH_TOKEN_KEY } from '@/constants';

vi.mock('@/services/auth/auth.api');
vi.mock('@/services/user/user.api');

type RouterModule = typeof import('react-router-dom');

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<RouterModule>('react-router-dom');

  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('Auth verify flow', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('verifies magic link and redirects to dashboard', async () => {
    vi.spyOn(authApi, 'verify').mockResolvedValue({
      accessToken: 'jwt-token',
    });

    vi.spyOn(userApi, 'getCurrentUser').mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      createdAt: '2024-01-01',
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/verify/abc`]}>
          <Routes>
            <Route path="/verify/:token" element={<TokenPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    await new Promise((r) => setTimeout(r, 0));

    expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBe('jwt-token');

    const state = store.getState();
    expect(state.auth.user?.email).toBe('test@test.com');
  });
});
