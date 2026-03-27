import api from './api';
import type { DashboardData } from '@/pages/Dashboard/types';

export const dashboardService = {
  async getDashboardData(): Promise<DashboardData> {
    const { data } = await api.get<DashboardData>('/dashboard');
    return data;
  },
};
