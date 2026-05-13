import { api } from './api';

interface GeneratePayload {
  datasetType: string;
  useDeidentified: boolean;
  records: number;
  framework: string;
  outputFormat: string;
}

export const syntheticDataService = {
  async generate(payload: GeneratePayload, file?: File) {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('datasetType', payload.datasetType);
      formData.append('useDeidentified', String(payload.useDeidentified));
      formData.append('records', String(payload.records));
      formData.append('framework', payload.framework);
      formData.append('outputFormat', payload.outputFormat);

      const resp = await api.post('/synthetic-data/generate', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });
      return resp.data;
    }

    const resp = await api.post('/synthetic-data/generate', payload, { responseType: 'blob' });
    return resp.data;
  },
};
