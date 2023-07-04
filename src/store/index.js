import { combineReducers, configureStore } from "@reduxjs/toolkit";

import customerSlice from "./customer/Customer";

export const combinedReducers = combineReducers({
  customer: customerSlice.reducer,
});

const rootReducer = (state, action) => {
  return combinedReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});
