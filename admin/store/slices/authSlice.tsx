// store/slices/autSlices.tsx

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;  // Changed to string to match the API response
  name?: string;  // Optional if not provided by the API
  email?: string; // Optional if not provided by the API
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  adminId: string | null; // Updated to store adminId
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
  adminId: typeof window !== 'undefined' ? localStorage.getItem('adminId') : null, 
};

const BASE_URL = 'http://localhost:8000/';
const LOGIN_ENDPOINT = 'api/adminLogin';

// Async thunk for login
export const login = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${BASE_URL}${LOGIN_ENDPOINT}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      dispatch(setAdminId(data.admin._id));  // Dispatch the admin ID
      console.log('API Response Data:', data);
      return { id: data.admin._id };  // Return the admin ID as part of the user object
    } catch (error) {
      console.error('Error during login:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAdminId: (state, action: PayloadAction<string>) => {
      state.adminId = action.payload;
      localStorage.setItem('adminId', action.payload);  // Store the admin ID in localStorage
    },
    clearAdminId: (state) => {
      state.adminId = null;
      localStorage.removeItem('adminId');  // Remove admin ID from localStorage
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = { id: action.payload.id };  // Set the user with the returned ID
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Login failed';
    });
  },
});

// Export actions and reducer
export const { setAdminId, clearAdminId } = authSlice.actions;
export default authSlice.reducer;
