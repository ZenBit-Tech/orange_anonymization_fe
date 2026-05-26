import { API_ROUTES } from '@/constants/api-routes';
import { api } from '@/services/api';

import type { DashboardData } from './types';

export interface DashboardFiltersParams {
  startDate?: string;
  endDate?: string;
  framework?: string;
}

export const getStats = async (params?: DashboardFiltersParams): Promise<DashboardData> => {
  const { data } = await api.get<DashboardData>(API_ROUTES.DASHBOARD, {
    params,
  });

  return data;
};
