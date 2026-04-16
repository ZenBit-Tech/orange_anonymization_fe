import { AUTH_TOKEN_KEY, ROUTES } from '@/constants';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function ProtectedRoute() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}

export const PublicRoute = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const location = useLocation();

  const isVerifyRoute = location.pathname.startsWith(ROUTES.VERIFY_BASE);

  if (token && !isVerifyRoute) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};
