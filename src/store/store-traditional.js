import { configureStore } from "@reduxjs/toolkit";
import { pageSlice } from "./pageSlice";
import { createWrapper } from "next-redux-wrapper";

const store = configureStore({
  reducer: {
    [pageSlice.name]: pageSlice.reducer,
  },
  devTools: true,
});

const makeStore = () => store;

const wrapper = createWrapper(makeStore);

export { store, wrapper };
