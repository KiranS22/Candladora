import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoadimg: false,
  isError: false,
};

const Auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logOutUser: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { logInUser, logOutUser, updateUser } = Auth.actions;
export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export default Auth.reducer;
