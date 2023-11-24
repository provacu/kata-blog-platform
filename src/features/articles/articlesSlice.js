/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetchArticles from '../../api/articlesAPI';
import fetchArticle from '../../api/articlePageAPI';

export const articleFetcher = createAsyncThunk(
  'articles/fetchArticle',
  async (slug, thunkAPI) => {
    try {
      const response = await fetchArticle(slug);
      return response.article;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const articlesFetcher = createAsyncThunk(
  'articles/fetchArticles',
  async ({ offset, pageSize }, thunkAPI) => {
    try {
      const response = await fetchArticles(offset, pageSize);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const articlesReducer = createSlice({
  name: 'articles',
  initialState: {
    items: [],
    loading: false,
    error: null,
    currentPage: 1,
    pageSize: 5,
    totalCount: 0,
    offset: 0,
    limit: 50,
    selectedArticle: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    updateArticle: (state, action) => {
      const index = state.items.findIndex(
        (article) => article.slug === action.payload.slug,
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(articlesFetcher.pending, (state) => {
        state.loading = true;
      })
      .addCase(articlesFetcher.fulfilled, (state, action) => {
        state.items = action.payload.articles;
        state.totalCount = action.payload.articlesCount;
        state.loading = false;
      })
      .addCase(articlesFetcher.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(articleFetcher.pending, (state) => {
        state.loading = true;
      })
      .addCase(articleFetcher.fulfilled, (state, action) => {
        state.selectedArticle = action.payload;
        state.loading = false;
      })
      .addCase(articleFetcher.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { setCurrentPage, updateArticle } = articlesReducer.actions;
export const { actions } = articlesReducer;
export default articlesReducer.reducer;
