import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { Range } from '@/pages/Dashboard/components/ActivityChart/types';
import {
  FRAMEWORK_API_VALUES,
  type FrameworkValue,
} from '@/pages/Dashboard/components/DashboardFilters/types';
import { getDateRange } from '@/pages/Dashboard/utils/getDateRange';
import { fetchDashboardData } from '@/store/slices/dashboardSlice';
import type { AppDispatch, RootState } from '@/store/store';

import type { DashboardState } from './types';

interface UseDashboardProps {
  range: Range;
  framework: FrameworkValue;
}

export const useDashboard = ({ range, framework }: UseDashboardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.dashboard);
  const { startDate, endDate } = useMemo(() => getDateRange(range), [range]);

  useEffect(() => {
    dispatch(
      fetchDashboardData({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        framework: FRAMEWORK_API_VALUES[framework],
      }),
    );
  }, [dispatch, startDate, endDate, framework]);

  const state = useMemo<DashboardState>(() => {
    if (loading) return 'loading';
    if (error) return 'error';
    if (data?.emptyState) return 'empty';
    return 'content';
  }, [loading, error, data]);

  return {
    metrics: data?.metrics ?? null,
    chartData: data?.chartData ?? [],
    recentActivity: data?.recentActivity ?? [],
    strategiesDistribution: data?.strategiesDistribution ?? [],
    frameworksDistribution: data?.frameworksDistribution ?? [],
    entitiesDistribution: data?.entitiesDistribution ?? [],
    startDate,
    endDate,
    state,
    loading,
    error,
  };
};
