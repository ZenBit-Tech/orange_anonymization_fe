import { api } from '../api';
import type {
  GenerateAcceptedResponse,
  GenerateSyntheticData,
  SyntheticDataSummary,
  SyntheticStatusResponse,
} from './types';

export const syntheticService = {
  generateSyntheticData: async (data: GenerateSyntheticData) => {
    const response = await api.post<GenerateAcceptedResponse>('/synthetic-data/generate', data);
    return response.data;
  },

  getGeneratedData: async (datasetId: string) => {
    const response = await api.get<SyntheticDataSummary | SyntheticStatusResponse>(
      `/synthetic-data/generated-data/${datasetId}`,
    );
    return response.data;
  },

  downloadSyntheticData: async (datasetId: string) => {
    const response = await api.get(`/synthetic-data/download/${datasetId}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};
