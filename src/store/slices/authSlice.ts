import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/services/authService';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '@/constants';
import type { User } from '@/pages/Auth/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  magicLinkSent: boolean;
  magicLinkEmail: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  magicLinkSent: false,
  magicLinkEmail: null,
};

export const requestMagicLink = createAsyncThunk(
  'auth/requestMagicLink',
  async (email: string, { rejectWithValue }) => {
    try {
      await authService.requestMagicLink(email);
      return email;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to send magic link';
      return rejectWithValue(message);
    }
  },
);

export const verifyMagicLink = createAsyncThunk(
  'auth/verifyMagicLink',
  async (token: string, { rejectWithValue }) => {
    try {
      const result = await authService.verifyMagicLink(token);
      localStorage.setItem(AUTH_TOKEN_KEY, result.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(result.user));
      return result;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Verification failed';
      return rejectWithValue(message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadFromStorage(state) {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      const userRaw = localStorage.getItem(AUTH_USER_KEY);
      if (token && userRaw) {
        state.token = token;
        state.user = JSON.parse(userRaw) as User;
        state.isAuthenticated = true;
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.magicLinkSent = false;
      state.magicLinkEmail = null;
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    },
    clearError(state) {
      state.error = null;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestMagicLink.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestMagicLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.magicLinkSent = true;
        state.magicLinkEmail = action.payload;
      })
      .addCase(requestMagicLink.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(verifyMagicLink.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyMagicLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(verifyMagicLink.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { loadFromStorage, logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
