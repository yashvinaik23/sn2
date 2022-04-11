import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  user: "",
  holiday: [],
  contact: [],
  result: [],
  isTeacher: false,
  position: "",
  token: "",
};
if (localStorage.getItem("user")) {
  initialUserState.user = JSON.parse(localStorage.getItem("user"));
}

if (localStorage.getItem("token")) {
  initialUserState.token = localStorage.getItem("token");
}

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    signIn(state, action) {
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      // state.user = action.payload;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logIn(state, action) {
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logOut() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    editUser(state, action) {
      console.log(action.payload);
      const profile = {
        ...JSON.parse(localStorage.getItem("user")),
        ...action.payload,
      };
      console.log(profile);
      localStorage.setItem("user", JSON.stringify(profile));
      state.user = action.payload;
    },
    storeHoliday(state, action) {
      state.holiday = action.payload;
    },
    storeContact(state, action) {
      state.contact = action.payload;
    },
    storeResult(state, action) {
      state.result = action.payload;
    },
    addHoliday(state, action) {
      state.holiday = state.holiday.concat(action.payload);
    },
    addContact(state, action) {
      state.contact = state.contact.concat(action.payload);
    },
    teacher(state) {
      state.isTeacher = true;
    },
    deleteHoliday(state, action) {
      state.holiday = state.holiday.filter(
        (arrow) => arrow._id !== action.payload._id
      );
    },
    deleteContact(state, action) {
      state.contact = state.contact.filter(
        (arrow) => arrow._id !== action.payload._id
      );
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;
