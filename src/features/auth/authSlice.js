/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from '../../api/authAPI';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: {},
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      await authAPI.register(username, email, password);
      return { username, email };
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await authAPI.login(email, password);
      return user;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      const dataToSend = {
        email: userData.email,
        username: userData.username,
        image: userData.image,
        password: userData.password,
      };
      const updatedUser = await authAPI.updateUser(dataToSend, token);
      return updatedUser;
    } catch (error) {
      return rejectWithValue(
        { message: error.message } || 'Failed to update user',
      );
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (token, { rejectWithValue }) => {
    try {
      const user = await authAPI.getCurrentUser(token);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
