import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  page: `falses`,
  homepage: false,
  navigation: false,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setHomepage: (state, action) => {
      state.homepage = action.payload;
    },
    setPageNav: (state, action) => {
      state.navigation = action.payload;
    },
  },
  extraReducers: (builder) => {
    // [HYDRATE]: (state, action) => {
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    // },
    builder.addCase(HYDRATE, (state, action) => {
      return { ...state, ...action.payload.page };
    });
  },
});

export const { setPage, setHomepage, setPageNav } = pageSlice.actions;
export const selectPage = {
  home: (state) => state.page.homepage,
  page: (state) => state.page.page,
  navigation: (state) => state.page.navigation,
};
export default pageSlice.reducer;
