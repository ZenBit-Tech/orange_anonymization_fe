import api from './api';
import type { PresidioEntity, AnonymizeResult, Document, PaginatedResponse } from '@/types';

export const deIdentificationService = {
  async analyzeText(payload: {
    text: string;
    language: string;
    entities: string[];
  }): Promise<PresidioEntity[]> {
    const { data } = await api.post<PresidioEntity[]>('/de-identification/analyze', payload);
    return data;
  },

  async anonymizeText(payload: {
    text: string;
    analyzerResults: PresidioEntity[];
    strategy: string;
    language: string;
  }): Promise<AnonymizeResult> {
    const { data } = await api.post<AnonymizeResult>('/de-identification/anonymize', payload);
    return data;
  },

  async getDocuments(params: {
    page: number;
    limit: number;
  }): Promise<PaginatedResponse<Document>> {
    const { data } = await api.get<PaginatedResponse<Document>>('/de-identification/documents', {
      params,
    });
    return data;
  },

  async getDocument(id: string): Promise<Document> {
    const { data } = await api.get<Document>(`/de-identification/documents/${id}`);
    return data;
  },
};
