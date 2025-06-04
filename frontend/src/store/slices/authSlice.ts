import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api"
import type { JwtResponse, LoginRequest, SignupRequest } from "../../types";
import { toast } from 'sonner';

const API_URL = "/api/auth/";

interface AuthState {
  user: JwtResponse | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const storedUser = localStorage.getItem("user");
const user: JwtResponse | null = storedUser ? JSON.parse(storedUser) : null;

const initialState: AuthState = {
  user: user,
  isAuthenticated: !!user,
  status: "idle",
  error: null,
};


export const login = createAsyncThunk(
  "auth/login",
  async (loginData: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post<JwtResponse>(API_URL + "signin", loginData);
      if (response.data && response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error: any) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (signupData: SignupRequest, { rejectWithValue }) => {
    try {
      const response = await api.post(API_URL + "signup", signupData);

      return response.data;
    } catch (error: any) {
      const message =
        (error.response?.data?.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
  toast.success('Logged out successfully');

});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<JwtResponse>) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string;
      })

      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.status = "idle";
        state.error = null;
      })

      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
  
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;