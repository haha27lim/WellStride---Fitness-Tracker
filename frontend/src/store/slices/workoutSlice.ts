import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { WorkoutDto, WorkoutCreateDto } from "../../types";
import type { RootState } from "../../store";

const API_URL = "/api/workouts/";

interface WorkoutState {
  workouts: WorkoutDto[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WorkoutState = {
  workouts: [],
  status: "idle",
  error: null,
};

const getToken = (getState: () => unknown): string | null => {
  const state = getState() as RootState;
  return state.auth.user?.token || null;
};

export const fetchWorkouts = createAsyncThunk(
  "workouts/fetchWorkouts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<WorkoutDto[]>(API_URL);
      return response.data;
    } catch (error: any) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const createWorkout = createAsyncThunk(
  "workouts/createWorkout",
  async (workoutData: WorkoutCreateDto, { rejectWithValue }) => {
    try {
      const response = await api.post<WorkoutDto>(API_URL, workoutData);
      return response.data;
    } catch (error: any) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const deleteWorkout = createAsyncThunk(
  "workouts/deleteWorkout",
  async (workoutId: number, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}${workoutId}`);
      return workoutId;
    } catch (error: any) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

const workoutSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchWorkouts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkouts.fulfilled, (state, action: PayloadAction<WorkoutDto[]>) => {
        state.status = "succeeded";
        state.workouts = action.payload;
        state.error = null;
      })
      .addCase(fetchWorkouts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
  
      .addCase(createWorkout.fulfilled, (state, action: PayloadAction<WorkoutDto>) => {
        state.workouts.unshift(action.payload);
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(createWorkout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
     
      .addCase(deleteWorkout.fulfilled, (state, action: PayloadAction<number>) => {
        state.workouts = state.workouts.filter(workout => workout.id !== action.payload);
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default workoutSlice.reducer;