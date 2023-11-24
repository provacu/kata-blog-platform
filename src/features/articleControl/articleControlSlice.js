/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  editArticleFetcher,
  deleteArticleFetcher,
} from '../../api/articleControlAPI';

export const editArticle = createAsyncThunk(
  'articleControl/editArticle',
  async ({ articleData, slug }, { rejectWithValue }) => {
    try {
      const data = await editArticleFetcher(articleData, slug);

      return data.article;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to edit article');
    }
  },
);

export const deleteArticle = createAsyncThunk(
  'articleControl/deleteArticle',
  async (slug, { rejectWithValue }) => {
    try {
      await deleteArticleFetcher(slug);
      return slug;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete article');
    }
  },
);

const articleControlSlice = createSlice({
  name: 'articleControl',
  initialState: {
    article: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.article = action.payload;
      })
      .addCase(editArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (state.articles) {
          state.articles = state.articles.filter(
            (article) => article.slug !== action.payload,
          );
        }
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { actions } = articleControlSlice;
export default articleControlSlice.reducer;
