import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AUTH_TOKEN_KEY, ROUTES } from '@/constants';
import { verify } from '@/services/auth/auth.api';
import { getCurrentUser } from '@/services/user/user.api';
import { useAppDispatch } from '@/store/store';
import { setUser } from '@/store/auth.slice';
import { PageLoader } from '@/components/common/PageLoader';

const TokenPage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        if (!token) {
          navigate(ROUTES.LOGIN, { replace: true });
          return;
        }

        const data = await verify(token);
        localStorage.setItem(AUTH_TOKEN_KEY, data.accessToken);

        const user = await getCurrentUser();

        dispatch(
          setUser({
            id: user.id,
            email: user.email,
          }),
        );

        navigate(ROUTES.DASHBOARD, { replace: true });
      } catch {
        navigate(ROUTES.LOGIN, { replace: true });
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [token, navigate, dispatch]);

  if (loading) {
    return <PageLoader />;
  }

  return null;
};

export default TokenPage;
