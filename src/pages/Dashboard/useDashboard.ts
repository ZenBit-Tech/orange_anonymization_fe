import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MOCK_DASHBOARD_DATA } from './mocks';
import type { DashboardState } from './types';

import { fetchDashboardData } from '@/store/slices/dashboardSlice';
import type { AppDispatch, RootState } from '@/store/store';

const USE_DASHBOARD_MOCKS = true;

export const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, error } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    if (!USE_DASHBOARD_MOCKS) {
      dispatch(fetchDashboardData());
    }
  }, [dispatch]);

  const dashboardData = USE_DASHBOARD_MOCKS ? MOCK_DASHBOARD_DATA : data;
  const metrics = dashboardData?.metrics ?? null;
  const chartData = dashboardData?.chartData ?? [];
  const recentActivity = dashboardData?.recentActivity ?? [];
  const strategiesDistribution = dashboardData?.strategiesDistribution ?? [];
  const frameworksDistribution = dashboardData?.frameworksDistribution ?? [];
  const entitiesDistribution = dashboardData?.entitiesDistribution ?? [];
  const isEmpty = dashboardData?.emptyState ?? true;

  const state = useMemo<DashboardState>(() => {
    if (loading && !USE_DASHBOARD_MOCKS) {
      return 'loading';
    }

    if (error && !USE_DASHBOARD_MOCKS) {
      return 'error';
    }

    if (isEmpty) {
      return 'empty';
    }

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
