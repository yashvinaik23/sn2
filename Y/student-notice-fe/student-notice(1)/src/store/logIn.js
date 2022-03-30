import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLoggedIn: "",
  notification: false,
  open: "",
};
if (localStorage.getItem("logIn")) {
  initialAuthState.isLoggedIn = localStorage.getItem("logIn");
}

const loginSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      localStorage.setItem("logIn", true);
      state.isLoggedIn = localStorage.getItem("logIn"); //true;
    },
    logout(state) {
      localStorage.removeItem("logIn");
      state.isLoggedIn = localStorage.getItem("logIn"); //false;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        message: action.payload.message,
      };
      state.open = true;
    },
    openN(state) {
      state.open = false;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
