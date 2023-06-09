import { configureStore } from "@reduxjs/toolkit";
import welcomeSlice from "../../components/welcomePage/welcomeSlice";
import messageSlice from "../../components/chatPage/messageSlice";

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = configureStore({
  reducer: { welcomeSlice, messageSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
