import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RecentActivity } from '@/services/dashboard/types';
import { getAnalyses, type AnalysesFiltersParams } from '@/services/dashboard/analysesService';

interface AnalysesState {
  rows: RecentActivity[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  error: string | null;
}

const initialState: AnalysesState = {
  rows: [],
  total: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: null,
};

type AnalysesResponse = Awaited<ReturnType<typeof getAnalyses>>;

export const fetchAnalyses = createAsyncThunk<
  AnalysesResponse,
  AnalysesFiltersParams | undefined,
  {
    rejectValue: string;
  }
>('analyses/fetchAnalyses', async (params, { rejectWithValue, signal }) => {
  try {
    return await getAnalyses(params, signal);
  } catch (error: unknown) {
    if (signal.aborted) {
      return rejectWithValue('aborted');
    }

    const message = error instanceof Error ? error.message : 'Failed to load analyses';

    return rejectWithValue(message);
  }
});

const analysesSlice = createSlice({
  name: 'analyses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyses.fulfilled, (state, action) => {
        state.loading = false;

        state.rows = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchAnalyses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to load analyses';
      });
  },
});

export default analysesSlice.reducer;
