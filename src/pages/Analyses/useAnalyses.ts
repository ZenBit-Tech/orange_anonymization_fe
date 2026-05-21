import { MOCK_DASHBOARD_DATA } from '@/pages/Dashboard/mocks';

export const useAnalyses = () => {
  const isLoading = false;

  const error = null;

  return {
    rows: MOCK_DASHBOARD_DATA.recentActivity,
    isLoading,
    error,
  };
};
