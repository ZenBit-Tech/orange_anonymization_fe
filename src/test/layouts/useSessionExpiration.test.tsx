import { afterEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AUTH_SESSION_STARTED_AT_KEY, AUTH_TOKEN_KEY, ROUTES } from '@/constants';
import { useSessionExpiration } from '@/components/layouts/useSessionExpiration';

const SessionExpirationProbe = () => {
  useSessionExpiration(true);

  return <div>dashboard</div>;
};

afterEach(() => {
  localStorage.clear();
});

describe('useSessionExpiration', () => {
  it('navigates to inactivity when the session is already expired', async () => {
    localStorage.setItem(AUTH_TOKEN_KEY, 'fake-token');
    localStorage.setItem(AUTH_SESSION_STARTED_AT_KEY, String(Date.now() - 2 * 60 * 60 * 1000));

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/dashboard" element={<SessionExpirationProbe />} />
          <Route path={ROUTES.INACTIVITY} element={<div>inactivity</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText('inactivity')).toBeInTheDocument();
  });
});
