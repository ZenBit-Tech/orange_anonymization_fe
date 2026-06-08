import { API_ROUTES } from '@/constants/api-routes';
import { api } from '@/services/api';

import type { AnalysesResponse, RecentActivity } from '@/services/dashboard/types';

export interface AnalysesFiltersParams {
  page?: number;
  limit?: number;
  search?: string;
  framework?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export const getAnalyses = async (
  params?: AnalysesFiltersParams,
  signal?: AbortSignal,
): Promise<AnalysesResponse> => {
  const { data } = await api.get<AnalysesResponse>(API_ROUTES.ANALYSES, {
    params,
    signal,
  });

  return data;
};

export const getAllAnalyses = async (
  params?: Omit<AnalysesFiltersParams, 'page' | 'limit'>,
): Promise<RecentActivity[]> => {
  const { data } = await api.get<RecentActivity[]>(`${API_ROUTES.ANALYSES}/export`, {
    params,
  });

  return data;
};
