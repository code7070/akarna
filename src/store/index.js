import { persistReducer, persistStore } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { pageSlice } from "./pageSlice";
import { createWrapper } from "next-redux-wrapper";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  [pageSlice.name]: pageSlice.reducer,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
  });

const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) return makeConfiguredStore();
  else {
    const persistConfig = {
      key: "nextjs",
      whitelist: ["auth"], // make sure it does not clash with server keys
      storage,
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== "production",
    });
    store.__persistor = persistStore(store); // Nasty hack
    return store;
  }
};

export const wrapper = createWrapper(makeStore);
