import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";
import loginReducer from "./logIn";

const store = configureStore({
  reducer: { user: userReducer, logIn: loginReducer },
  //middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export default store;
