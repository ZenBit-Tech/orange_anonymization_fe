// import { useEffect, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { fetchDashboardData } from '@/store/slices/dashboardSlice';
// import type { AppDispatch, RootState } from '@/store/store';

// import type { DashboardState } from './types';

// export const useDashboard = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const { data, loading, error } = useSelector((state: RootState) => state.dashboard);

//   useEffect(() => {
//     dispatch(fetchDashboardData());
//   }, [dispatch]);

//   const metrics = data?.metrics ?? null;
//   const chartData = data?.chartData ?? [];
//   const recentActivity = data?.recentActivity ?? [];
//   const strategiesDistribution = data?.strategiesDistribution ?? [];
//   const frameworksDistribution = data?.frameworksDistribution ?? [];
//   const entitiesDistribution = data?.entitiesDistribution ?? [];

//   const isEmpty = data?.emptyState ?? true;

//   const state = useMemo<DashboardState>(() => {
//     if (loading) return 'loading';
//     if (error) return 'error';
//     if (isEmpty) return 'empty';

//     return 'content';
//   }, [loading, error, isEmpty]);

//   return {
//     metrics,
//     chartData,
//     recentActivity,
//     strategiesDistribution,
//     frameworksDistribution,
//     entitiesDistribution,
//     isEmpty,
//     state,
//     loading,
//     error,
//   };
// };

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { DashboardState } from './types';

import { MOCK_ANALYSES } from '@/pages/Analyses/useAnalyses';

import { fetchDashboardData } from '@/store/slices/dashboardSlice';
import type { AppDispatch, RootState } from '@/store/store';

const USE_MOCK_RECENT_ACTIVITY = true;

export const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, error } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const metrics = data?.metrics ?? null;

  const chartData = data?.chartData ?? [];

  const recentActivity = useMemo(() => {
    if (USE_MOCK_RECENT_ACTIVITY) {
      return MOCK_ANALYSES;
    }

    return data?.recentActivity ?? [];
  }, [data?.recentActivity]);

  const strategiesDistribution = data?.strategiesDistribution ?? [];

  const frameworksDistribution = data?.frameworksDistribution ?? [];

  const entitiesDistribution = data?.entitiesDistribution ?? [];

  const isEmpty = useMemo(() => {
    if (USE_MOCK_RECENT_ACTIVITY) {
      return MOCK_ANALYSES.length === 0;
    }

    return data?.emptyState ?? true;
  }, [data?.emptyState]);

  const state = useMemo<DashboardState>(() => {
    if (loading && !USE_MOCK_RECENT_ACTIVITY) {
      return 'loading';
    }

    if (error && !USE_MOCK_RECENT_ACTIVITY) {
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
