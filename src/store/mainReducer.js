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
  },
});

export const { addAllArticles, addLoginUser, updateUser, logoutUser } = mainSlice.actions;
export default mainSlice.reducer;
