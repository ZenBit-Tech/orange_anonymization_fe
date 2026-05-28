import type { SyntheticDataSummary } from '@/services/synthetic/types';
import { createSlice } from '@reduxjs/toolkit';

interface SyntheticResultState {
  data: SyntheticDataSummary | null;
}

const initialState: SyntheticResultState = {
  data: null,
};

const syntheticResultSlice = createSlice({
  name: 'syntheticResult',
  initialState,
  reducers: {
    setDataAC: (state, action: { payload: SyntheticDataSummary }) => {
      state.data = action.payload;
    },
  },
});

export const { setDataAC } = syntheticResultSlice.actions;
export default syntheticResultSlice.reducer;
