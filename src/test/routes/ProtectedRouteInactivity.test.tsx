import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { AUTH_TOKEN_KEY, AUTH_SESSION_STARTED_AT_KEY, ROUTES } from '@/constants';
import { screen } from '@testing-library/react';

const renderRoute = () =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<div>dashboard</div>} />
          </Route>

          <Route path={ROUTES.LOGIN} element={<div>login</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );

describe('ProtectedRoute - expired session', () => {
  it('redirects to login when session expired', () => {
    localStorage.setItem(AUTH_TOKEN_KEY, 'fake-token');

    const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
    localStorage.setItem(AUTH_SESSION_STARTED_AT_KEY, String(twoHoursAgo));

    renderRoute();

    expect(screen.getByText('login')).toBeInTheDocument();
  });
});
