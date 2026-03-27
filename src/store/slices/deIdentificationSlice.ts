import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { deIdentificationService } from '@/services/deIdentificationService';
import type {
  PresidioEntity,
  AnonymizeResult,
  DeIdentificationSettings,
  Document,
} from '@/pages/DeIdentify/types';
import { HIPAA_ENTITIES } from '@/constants';

interface DeIdentificationState {
  currentStep: number;

  framework: DeIdentificationSettings['framework'];

  inputText: string;

  settings: Omit<DeIdentificationSettings, 'framework'>;

  analysisResult: PresidioEntity[] | null;
  anonymizeResult: AnonymizeResult | null;
  processingTimeMs: number | null;

  documents: Document[];
  totalDocuments: number;

  isAnalyzing: boolean;
  isAnonymizing: boolean;
  error: string | null;
}

const initialState: DeIdentificationState = {
  currentStep: 0,
  framework: 'hipaa',
  inputText: '',
  settings: {
    strategy: 'replace',
    entities: HIPAA_ENTITIES as unknown as string[],
    language: 'en',
    minScore: 0.5,
  },
  analysisResult: null,
  anonymizeResult: null,
  processingTimeMs: null,
  documents: [],
  totalDocuments: 0,
  isAnalyzing: false,
  isAnonymizing: false,
  error: null,
};

export const analyzeText = createAsyncThunk(
  'deIdentification/analyzeText',
  async (payload: { text: string; language: string; entities: string[] }, { rejectWithValue }) => {
    try {
      return await deIdentificationService.analyzeText(payload);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Analysis failed';
      return rejectWithValue(message);
    }
  },
);

export const anonymizeText = createAsyncThunk(
  'deIdentification/anonymizeText',
  async (
    payload: {
      text: string;
      analyzerResults: PresidioEntity[];
      strategy: string;
      language: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const start = Date.now();
      const result = await deIdentificationService.anonymizeText(payload);
      const elapsed = Date.now() - start;
      return { result, elapsed };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Anonymization failed';
      return rejectWithValue(message);
    }
  },
);

export const fetchDocuments = createAsyncThunk(
  'deIdentification/fetchDocuments',
  async (params: { page: number; limit: number } = { page: 1, limit: 20 }, { rejectWithValue }) => {
    try {
      return await deIdentificationService.getDocuments(params);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load documents';
      return rejectWithValue(message);
    }
  },
);

const deIdentificationSlice = createSlice({
  name: 'deIdentification',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    nextStep(state) {
      state.currentStep = Math.min(state.currentStep + 1, 3);
    },
    prevStep(state) {
      state.currentStep = Math.max(state.currentStep - 1, 0);
    },
    setFramework(state, action: PayloadAction<DeIdentificationSettings['framework']>) {
      state.framework = action.payload;
    },
    setInputText(state, action: PayloadAction<string>) {
      state.inputText = action.payload;
    },
    updateSettings(
      state,
      action: PayloadAction<Partial<Omit<DeIdentificationSettings, 'framework'>>>,
    ) {
      state.settings = { ...state.settings, ...action.payload };
    },
    resetWorkflow(state) {
      state.currentStep = 0;
      state.inputText = '';
      state.analysisResult = null;
      state.anonymizeResult = null;
      state.processingTimeMs = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeText.pending, (state) => {
        state.isAnalyzing = true;
        state.error = null;
      })
      .addCase(analyzeText.fulfilled, (state, action) => {
        state.isAnalyzing = false;
        state.analysisResult = action.payload;
      })
      .addCase(analyzeText.rejected, (state, action) => {
        state.isAnalyzing = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(anonymizeText.pending, (state) => {
        state.isAnonymizing = true;
        state.error = null;
      })
      .addCase(anonymizeText.fulfilled, (state, action) => {
        state.isAnonymizing = false;
        state.anonymizeResult = action.payload.result;
        state.processingTimeMs = action.payload.elapsed;
      })
      .addCase(anonymizeText.rejected, (state, action) => {
        state.isAnonymizing = false;
        state.error = action.payload as string;
      });

    builder.addCase(fetchDocuments.fulfilled, (state, action) => {
      state.documents = action.payload.data;
      state.totalDocuments = action.payload.total;
    });
  },
});

export const {
  setStep,
  nextStep,
  prevStep,
  setFramework,
  setInputText,
  updateSettings,
  resetWorkflow,
  clearError,
} = deIdentificationSlice.actions;
export default deIdentificationSlice.reducer;
