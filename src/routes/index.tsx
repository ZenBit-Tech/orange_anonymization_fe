import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { ProtectedRoute } from './ProtectedRoute';
import { ROUTES } from '@/constants';

const Landing = lazy(() => import('@/pages/Landing'));
const Auth = lazy(() => import('@/pages/Auth'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const DeIdentify = lazy(() => import('@/pages/DeIdentify'));
const SyntheticData = lazy(() => import('@/pages/SyntheticData'));

function PageLoader() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={ROUTES.LANDING} element={<Landing />} />
        <Route path="/auth/*" element={<Auth />} />

        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.DE_IDENTIFY} element={<DeIdentify />} />
          <Route path={ROUTES.SYNTHETIC_DATA} element={<SyntheticData />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
      </Routes>
    </Suspense>
  );
}
