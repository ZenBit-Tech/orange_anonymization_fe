import { API_ROUTES } from '@/constants/api-routes';
import { api } from '@/services/api';

import type { DashboardData } from './types';

export const getStats = async (): Promise<DashboardData> => {
  const { data } = await api.get<DashboardData>(API_ROUTES.DASHBOARD);
  return data;
};
