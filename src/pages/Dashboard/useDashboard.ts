import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDashboardData } from '@/store/slices/dashboardSlice';
import type { AppDispatch, RootState } from '@/store/store';

export const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return {
    metrics: data?.metrics ?? {
      totalDocuments: 0,
      entitiesDetected: 0,
      anonymizationRate: 0,
      syntheticRecords: 0,
    },
    recentActivity: data?.recentActivity ?? [],
    isEmpty: data?.emptyState ?? true,
  };
};
