import { AUTH_TOKEN_KEY, ROUTES } from '@/constants';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/store';
import { setUser, clearUser } from '@/store/auth.slice';
import { getCurrentUser } from '@/services/user/user.api';
import { PageLoader } from '@/components/common/PageLoader';

export function ProtectedRoute() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const user = await getCurrentUser();

        dispatch(
          setUser({
            id: user.id,
            email: user.email,
          }),
        );
      } catch {
        dispatch(clearUser());
        localStorage.removeItem(AUTH_TOKEN_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [dispatch, token]);

  if (isLoading) {
    return <PageLoader />;
  }

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
