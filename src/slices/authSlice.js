import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  loading: false,
  signUpData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, value) {
      state.token = value.payload;
    },

    setSignUpData(state, action) {
      state.signUpData = action.payload;
    },

    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setToken, setLoading, setSignUpData } = authSlice.actions;
export default authSlice.reducer;
