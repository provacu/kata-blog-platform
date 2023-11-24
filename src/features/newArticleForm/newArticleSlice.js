/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import newArticleUpload from '../../api/newArticleAPI';

export const createArticle = createAsyncThunk(
  'newArticle/createArticle',
  async (articleData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      const response = await newArticleUpload(articleData.article, token);

      return response.article;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  },
);

const newArticleSlice = createSlice({
  name: 'newArticle',
  initialState: {
    article: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.article = action.payload;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions } = newArticleSlice;
export default newArticleSlice.reducer;
