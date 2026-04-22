import { ROUTES } from '@/constants';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/store';
import { PageLoader } from '@/components/common/PageLoader';
import { selectAuthInitialized, selectIsAuthenticated } from '@/store/auth';

export function ProtectedRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const initialized = useAppSelector(selectAuthInitialized);

  if (!initialized) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}

export const PublicRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const initialized = useAppSelector(selectAuthInitialized);
  const location = useLocation();

  const isVerifyRoute = location.pathname.startsWith(ROUTES.VERIFY_BASE);

  if (!initialized) {
    return <PageLoader />;
  }

  if (isAuthenticated && !isVerifyRoute) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};
