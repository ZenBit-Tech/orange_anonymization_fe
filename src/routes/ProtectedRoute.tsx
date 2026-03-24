import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/store';
import { ROUTES } from '@/constants';

export function ProtectedRoute() {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
}
