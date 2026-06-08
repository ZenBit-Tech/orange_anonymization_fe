import { describe, it, expect, vi, beforeEach } from 'vitest';
import { store } from '@/store/store';
import { initializeAuth, clearUser } from '@/store/auth';
import { AUTH_TOKEN_KEY, AUTH_SESSION_STARTED_AT_KEY } from '@/constants';
import * as userApi from '@/services/user/user.api';

vi.mock('@/services/user/user.api', () => ({
  getCurrentUser: vi.fn(),
}));

describe('initializeAuth', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    store.dispatch(clearUser());
  });

  it('restores session from localStorage', async () => {
    localStorage.setItem(AUTH_TOKEN_KEY, 'token');
    localStorage.setItem(AUTH_SESSION_STARTED_AT_KEY, Date.now().toString());

    vi.mocked(userApi.getCurrentUser).mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      createdAt: '2024-01-01T00:00:00.000Z',
    });

    await store.dispatch(initializeAuth());

    const state = store.getState();

    expect(state.auth.user).not.toBeNull();
    expect(state.auth.user?.email).toBe('test@test.com');
  });
});
