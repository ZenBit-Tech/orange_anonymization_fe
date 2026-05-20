import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDashboardData } from '@/store/slices/dashboardSlice';
import type { AppDispatch, RootState } from '@/store/store';

export const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, error } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const recentActivity = useMemo(() => data?.recentActivity ?? [], [data?.recentActivity]);

  return {
    metrics: data?.metrics ?? null,
    chartData: data?.chartData ?? [],
    recentActivity,
    isEmpty: data?.emptyState ?? true,
    loading,
    error,
  };
};
