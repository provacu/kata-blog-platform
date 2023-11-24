/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { likeArticleFetch, unlikeArticleFetch } from '../../api/likesAPI';
import { updateArticle } from '../../features/articles/articlesSlice';

export const likeArticle = createAsyncThunk(
  'articleInfo/likeArticle',
  async (slug, { dispatch, rejectWithValue }) => {
    try {
      const data = await likeArticleFetch(slug);
      dispatch(updateArticle(data.article));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const unlikeArticle = createAsyncThunk(
  'articleInfo/unlikeArticle',
  async (slug, { dispatch, rejectWithValue }) => {
    try {
      const data = await unlikeArticleFetch(slug);
      dispatch(updateArticle(data.article));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
const likesSlice = createSlice({
  name: 'likes',
  initialState: {
    articles: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likeArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.articles.findIndex(
          (article) => article.slug === action.payload.article.slug,
        );
        if (index !== -1) {
          state.articles[index] = action.payload.article;
        }
      })
      .addCase(likeArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(unlikeArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unlikeArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.articles.findIndex(
          (article) => article.slug === action.payload.article.slug,
        );
        if (index !== -1) {
          state.articles[index] = action.payload.article;
        }
      })
      .addCase(unlikeArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions } = likesSlice;
export default likesSlice.reducer;
