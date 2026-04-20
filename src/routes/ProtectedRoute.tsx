import {
  AUTH_SESSION_MAX_AGE_MS,
  AUTH_SESSION_STARTED_AT_KEY,
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  ROUTES,
} from '@/constants';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const [isSessionExpired, setIsSessionExpired] = useState<boolean | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const sessionStartedAt = localStorage.getItem(AUTH_SESSION_STARTED_AT_KEY);
      const parsedSessionStartedAt = sessionStartedAt ? Number(sessionStartedAt) : NaN;
      const hasValidSessionStart =
        Number.isFinite(parsedSessionStartedAt) && parsedSessionStartedAt > 0;
      const sessionAge = hasValidSessionStart
        ? Date.now() - parsedSessionStartedAt
        : Number.POSITIVE_INFINITY;
      const expired = !hasValidSessionStart || sessionAge >= AUTH_SESSION_MAX_AGE_MS;

      if (expired) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        localStorage.removeItem(AUTH_SESSION_STARTED_AT_KEY);
      }

      setIsSessionExpired(expired);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [token]);

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (isSessionExpired === null) {
    return null;
  }

  if (isSessionExpired) {
    return <Navigate to={ROUTES.SESSION_EXPIRED} replace />;
  }

  return <Outlet />;
}

export const PublicRoute = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) return <Navigate to={ROUTES.DASHBOARD} replace />;
  return <Outlet />;
};
