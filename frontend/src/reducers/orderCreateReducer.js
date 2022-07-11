import { createSlice } from "@reduxjs/toolkit";
const initialorderCreateState = {
  order: {},
  loading: false,
  error: {},
  success: false,
};
const createorderDetailsSlice = createSlice({
  name: "createorderDetails",
  initialState: initialorderCreateState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    success(state, action) {
      state.loading = false;
      state.order = action.payload;
      state.success = true;
    },
    fail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    reset(state) {
      state.order = {};
      state.error = {};
      state.loading = false;
      state.success = false;
    },
  },
});
export const createorderDetailsActions = createorderDetailsSlice.actions;
export default createorderDetailsSlice.reducer;
