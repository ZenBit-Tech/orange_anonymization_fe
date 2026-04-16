import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AUTH_TOKEN_KEY, ROUTES } from '@/constants';
import { verify } from '@/services/auth/auth.api';

const TokenPage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async (): Promise<void> => {
      if (!token) {
        navigate(ROUTES.LOGIN);
        return;
      }

      try {
        const data = await verify(token);
        localStorage.setItem(AUTH_TOKEN_KEY, data.accessToken);
        navigate(ROUTES.DASHBOARD);
      } catch {
        navigate(ROUTES.LOGIN);
      }
    };

    verifyToken();
  }, [token, navigate]);

  return null;
};

export default TokenPage;
