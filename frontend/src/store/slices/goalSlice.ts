import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { GoalDto, GoalCreateDto, GoalUpdateDto } from "../../types";
import type { RootState } from "../../store";

const API_URL = "/api/goals/";

interface GoalState {
  goals: GoalDto[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: GoalState = {
  goals: [],
  status: "idle",
  error: null,
};


const getToken = (getState: () => unknown): string | null => {
  const state = getState() as RootState;
  return state.auth.user?.token || null;
};

export const fetchGoals = createAsyncThunk(
  "goals/fetchGoals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<GoalDto[]>(API_URL);
      return response.data;
    } catch (error: any) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const createGoal = createAsyncThunk(
  "goals/createGoal",
  async (goalData: GoalCreateDto, { rejectWithValue }) => {
    try {
      const response = await api.post<GoalDto>(API_URL, goalData);
      return response.data;
    } catch (error: any) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const updateGoal = createAsyncThunk(
  "goals/updateGoal",
  async ({ goalId, goalData }: { goalId: number; goalData: GoalUpdateDto }, { rejectWithValue }) => {
    try {
      const response = await api.put<GoalDto>(`${API_URL}${goalId}`, goalData);
      return response.data;
    } catch (error: any) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const deleteGoal = createAsyncThunk(
  "goals/deleteGoal",
  async (goalId: number, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}${goalId}`);
      return goalId;
    } catch (error: any) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchGoals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGoals.fulfilled, (state, action: PayloadAction<GoalDto[]>) => {
        state.status = "succeeded";
        state.goals = action.payload;
        state.error = null;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(createGoal.fulfilled, (state, action: PayloadAction<GoalDto>) => {
        state.goals.push(action.payload);
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(updateGoal.fulfilled, (state, action: PayloadAction<GoalDto>) => {
        const index = state.goals.findIndex(goal => goal.id === action.payload.id);
        if (index !== -1) {
          state.goals[index] = action.payload;
        }
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(deleteGoal.fulfilled, (state, action: PayloadAction<number>) => {
        state.goals = state.goals.filter(goal => goal.id !== action.payload);
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default goalSlice.reducer;