import api from './api';
import type { SyntheticRecord, SyntheticGenerationSettings } from '@/pages/SyntheticData/types';

export const syntheticDataService = {
  async generate(settings: SyntheticGenerationSettings): Promise<SyntheticRecord[]> {
    const { data } = await api.post<SyntheticRecord[]>('/synthetic-data/generate', settings);
    return data;
  },
};
