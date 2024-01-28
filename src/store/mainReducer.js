import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    isLoading: false,
    articles: [],
  },
  reducers: {
    addAllArticles: (state, action) => {
      state.articles = action.payload;
    },
  },
});

export const { addAllArticles } = mainSlice.actions;
export default mainSlice.reducer;
