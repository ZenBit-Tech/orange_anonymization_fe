import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDashboardData } from '@/store/slices/dashboardSlice';
import type { AppDispatch, RootState } from '@/store/store';

export const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return {
    metrics: data?.metrics ?? null,
    recentActivity: data?.recentActivity ?? [],
    isEmpty: (data?.metrics.totalDocuments ?? 0) === 0,
    loading,
    error,
  };
};
