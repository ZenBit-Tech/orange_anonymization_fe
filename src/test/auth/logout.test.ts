import { describe, it, expect, beforeEach } from 'vitest';
import { store } from '@/store/store';
import { logout } from '@/store/auth';
import { AUTH_TOKEN_KEY } from '@/constants';

describe('logout', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('clears session', async () => {
    localStorage.setItem(AUTH_TOKEN_KEY, 'jwt');

    await store.dispatch(logout());

    expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBe(null);

    const state = store.getState();

    expect(state.auth.user).toBe(null);
  });
});
