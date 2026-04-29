import { describe, it, expect, vi, beforeEach } from 'vitest';
import { store } from '@/store/store';
import { initializeAuth } from '@/store/auth';
import * as userApi from '@/services/user/user.api';
import type { UserResponse } from '@/services/user/user.types';
import { AUTH_TOKEN_KEY } from '@/constants';

vi.mock('@/services/user/user.api');

describe('initializeAuth', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('restores session from localStorage', async () => {
    localStorage.setItem(AUTH_TOKEN_KEY, 'token');

    const mockUser: UserResponse = {
      id: '1',
      email: 'test@test.com',
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    vi.spyOn(userApi, 'getCurrentUser').mockResolvedValue(mockUser);

    await store.dispatch(initializeAuth());

    const state = store.getState();

    expect(state.auth.user?.email).toBe('test@test.com');
  });
});
