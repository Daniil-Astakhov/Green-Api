import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const welcomeAdapter = createEntityAdapter();

const initialState = welcomeAdapter.getInitialState({
  apiTokenInstance: "",
  idInstance: "",
});

const welcomeSlice = createSlice({
  name: "welcome",
  initialState,
  reducers: {
    tokenChanged: (state, action) => {
      state.apiTokenInstance = action.payload;
    },
    idChanged: (state, action) => {
      state.idInstance = action.payload;
    },
  },
});

const { actions, reducer } = welcomeSlice;

export default reducer;

export const { selectAll } = welcomeAdapter.getSelectors(
  (state) => state.welcome
);

export const { tokenChanged, idChanged } = actions;
