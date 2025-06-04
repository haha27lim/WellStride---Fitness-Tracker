import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { ProgressDashboardDto } from "../../types";
import type { RootState } from "../../store";

const API_URL = "/api/progress/";

interface ProgressState {
  dashboardData: ProgressDashboardDto | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProgressState = {
  dashboardData: null,
  status: "idle",
  error: null,
};

const getToken = (getState: () => unknown): string | null => {
  const state = getState() as RootState;
  return state.auth.user?.token || null;
};

export const fetchProgressDashboard = createAsyncThunk(
  "progress/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<ProgressDashboardDto>(`${API_URL}dashboard`);
      return response.data;
    } catch (error: any) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchProgressDashboard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProgressDashboard.fulfilled, (state, action: PayloadAction<ProgressDashboardDto>) => {
        state.status = "succeeded";
        state.dashboardData = action.payload;
        state.error = null;
      })
      .addCase(fetchProgressDashboard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default progressSlice.reducer;