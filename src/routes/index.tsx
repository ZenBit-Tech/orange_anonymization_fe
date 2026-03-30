import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { ROUTES } from '@/constants';
import Auth from '@/pages/Auth';
import { ProtectedRoute } from './ProtectedRoute';
import Dashboard from '@/pages/Dashboard';

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
        <Route path="/auth/*" element={<Auth />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<></>}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
