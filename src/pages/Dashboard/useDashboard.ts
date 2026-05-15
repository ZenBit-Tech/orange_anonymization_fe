import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDashboardData } from '@/store/slices/dashboardSlice';
import type { AppDispatch, RootState } from '@/store/store';
import type { DashboardState } from './types';

export const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const metrics = data?.metrics ?? null;
  const chartData = data?.chartData ?? [];
  const recentActivity = data?.recentActivity ?? [];
  const strategiesDistribution = data?.strategiesDistribution ?? [];
  const frameworksDistribution = data?.frameworksDistribution ?? [];
  const entitiesDistribution = data?.entitiesDistribution ?? [];

  const isEmpty =
    !metrics &&
    chartData.length === 0 &&
    recentActivity.length === 0 &&
    strategiesDistribution.length === 0 &&
    frameworksDistribution.length === 0 &&
    entitiesDistribution.length === 0;

  const state = useMemo<DashboardState>(() => {
    if (loading) return 'loading';
    if (error) return 'error';
    if (isEmpty) return 'empty';
    return 'content';
  }, [loading, error, isEmpty]);

  return {
    metrics,
    chartData,
    recentActivity,
    strategiesDistribution,
    frameworksDistribution,
    entitiesDistribution,
    isEmpty,
    state,
    loading,
    error,
  };
};
