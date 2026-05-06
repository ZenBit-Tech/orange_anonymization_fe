import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '@/store/slices/dashboardSlice';
import type { AppDispatch, RootState } from '@/store/store';
import { DEFAULT_EMPTY_STATE, DEFAULT_METRICS } from './Dashboard.const';

export const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return {
    metrics: data?.metrics ?? DEFAULT_METRICS,
    recentActivity: data?.recentActivity ?? [],
    isEmpty: data?.emptyState ?? DEFAULT_EMPTY_STATE,
  };
};
