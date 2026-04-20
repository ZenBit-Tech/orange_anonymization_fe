import { AUTH_TOKEN_KEY, AUTH_SESSION_STARTED_AT_KEY, ROUTES } from '@/constants';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TokenPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(AUTH_TOKEN_KEY, token!);
    localStorage.setItem(AUTH_SESSION_STARTED_AT_KEY, Date.now().toString());
    navigate(ROUTES.DASHBOARD);
  }, [navigate, token]);

  return null;
};

export default TokenPage;
