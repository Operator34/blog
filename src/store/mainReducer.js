import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    isLoading: false,
    isLogged: false,
    user: {},
  },
  reducers: {
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

export const { addLoginUser, updateUser, logoutUser } = mainSlice.actions;
export default mainSlice.reducer;
