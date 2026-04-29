import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useAppDispatch } from '@/store/store';
import { verifyMagicLink } from '@/store/auth';
import { PageLoader } from '@/components/common/PageLoader';

const TokenPage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    if (!token) {
      navigate(ROUTES.LOGIN, { replace: true });
      return;
    }

    dispatch(verifyMagicLink(token))
      .unwrap()
      .then(() => {
        navigate(ROUTES.DASHBOARD, { replace: true });
      })
      .catch(() => {
        navigate(ROUTES.LOGIN, { replace: true });
      });
  }, [token, dispatch, navigate]);

  return <PageLoader />;
};

export default TokenPage;
