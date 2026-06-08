import { describe, it, expect, vi, beforeEach } from 'vitest';
import { store } from '@/store/store';
import { verifyMagicLink } from '@/store/auth';
import * as authApi from '@/services/auth/auth.api';
import * as userApi from '@/services/user/user.api';
import type { UserResponse } from '@/services/user/user.types';
import { AUTH_TOKEN_KEY } from '@/constants';

vi.mock('@/services/auth/auth.api');
vi.mock('@/services/user/user.api');

describe('verifyMagicLink', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('stores JWT and loads user', async () => {
    vi.spyOn(authApi, 'verify').mockResolvedValue({
      accessToken: 'jwt-token',
    });

    const mockUser: UserResponse = {
      id: '1',
      email: 'user@test.com',
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    vi.spyOn(userApi, 'getCurrentUser').mockResolvedValue(mockUser);

    await store.dispatch(verifyMagicLink('token'));

    expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBe('jwt-token');

    const state = store.getState();

    expect(state.auth.user?.email).toBe('user@test.com');
  });
});
