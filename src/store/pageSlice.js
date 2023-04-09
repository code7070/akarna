import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  page: `falses`,
  homepage: null,
  navigation: null,
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
  matchNav: (state, param2) => {
    let page = state?.page?.navigation;
    const finder = page?.find((i) => i.path === param2);
    if (finder) page = finder;
    return { page };
  },
};
export default pageSlice.reducer;
