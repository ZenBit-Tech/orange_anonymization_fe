import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getStats, type DashboardFiltersParams } from '@/services/dashboard/dashboardService';

import type { DashboardData } from '@/services/dashboard/types';

const DASHBOARD_FETCH_ERROR = 'errors.generic';

interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchDashboardData = createAsyncThunk<
  DashboardData,
  DashboardFiltersParams | undefined,
  { rejectValue: string }
>('dashboard/fetchData', async (params, { rejectWithValue }) => {
  try {
    return await getStats(params);
  } catch (error) {
    const message = error instanceof Error ? error.message : DASHBOARD_FETCH_ERROR;

    return rejectWithValue(message);
  }
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? DASHBOARD_FETCH_ERROR;
      });
  },
});

export default dashboardSlice.reducer;
