import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    isLoading: false,
    isLogged: false,
    articles: [],
    user: {},
  },
  reducers: {
    addAllArticles: (state, action) => {
      state.articles = action.payload;
    },
    addLoginUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.isLogged = true;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.isLogged = true;
    },
    logoutUser: (state) => {
      state.user = {};
      state.isLogged = false;
    },
    isFavorite: (state, action) => {
      console.log(action);
      const indx = state.articles.findIndex((el) => el.slug === action.payload);
      const article = state.articles[indx];
      const count = article.favorited ? article.favoritesCount - 1 : article.favoritesCount + 1;
      article.favorited = !article.favorited;
      article.favoritesCount = count;
    },
  },
});

export const { addAllArticles, addLoginUser, updateUser, logoutUser, isFavorite } = mainSlice.actions;
export default mainSlice.reducer;
