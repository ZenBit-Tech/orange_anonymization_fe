import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  logout as logoutAction,
  requestMagicLink,
  verifyMagicLink,
} from '@/store/slices/authSlice';
import { ROUTES } from '@/constants';

export function useAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const isLoading = useAppSelector((s) => s.auth.isLoading);
  const error = useAppSelector((s) => s.auth.error);
  const magicLinkSent = useAppSelector((s) => s.auth.magicLinkSent);
  const magicLinkEmail = useAppSelector((s) => s.auth.magicLinkEmail);

  const sendMagicLink = useCallback(
    async (email: string) => {
      await dispatch(requestMagicLink(email));
    },
    [dispatch],
  );

  const verifyToken = useCallback(
    async (token: string) => {
      const result = await dispatch(verifyMagicLink(token));
      if (verifyMagicLink.fulfilled.match(result)) {
        void navigate(ROUTES.DASHBOARD);
      }
    },
    [dispatch, navigate],
  );

  const logout = useCallback(() => {
    dispatch(logoutAction());
    void navigate(ROUTES.LANDING);
  }, [dispatch, navigate]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    magicLinkSent,
    magicLinkEmail,
    sendMagicLink,
    verifyToken,
    logout,
  };
}
