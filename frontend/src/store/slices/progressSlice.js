import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const API_URL = "/api/progress/";

const initialState = {
  dashboardData: null,
  status: "idle",
  error: null,
};


const getToken = (getState) => {
  const state = getState();
  return state.auth.user?.token || null;
};


export const fetchProgressDashboard = createAsyncThunk(
  "progress/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}dashboard`);
      return response.data;
    } catch (error) {
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
      .addCase(fetchProgressDashboard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dashboardData = action.payload;
        state.error = null;
      })
      .addCase(fetchProgressDashboard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default progressSlice.reducer;