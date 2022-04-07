import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";
import loginReducer from "./logIn";

const store = configureStore({
  reducer: { user: userReducer, logIn: loginReducer },
  
});

export default store;
