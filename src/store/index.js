import { configureStore } from "@reduxjs/toolkit";
import { pageSlice } from "./pageSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      [pageSlice.name]: pageSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
