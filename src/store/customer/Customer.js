import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const initialState = {
  loading: false,
  userDetails: [],
  error: undefined,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setUserDetails: (state, { payload }) => {
      state.userDetails = payload;
    },
    clearUserDetails: (state) => {
      state.userDetails = [];
    },
  },
});

export const { setUserDetails, clearUserDetails } = customerSlice.actions;

export default customerSlice;
