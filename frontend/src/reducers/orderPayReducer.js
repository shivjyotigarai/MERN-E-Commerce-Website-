import { createSlice } from "@reduxjs/toolkit";
const initialorderPayDetailsCreateState = {
  loading: false,
  success: false,
  error: {},
};
const orderPayDetailsSlice = createSlice({
  name: "orderPayDetails",
  initialState: initialorderPayDetailsCreateState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    success(state, action) {
      state.loading = false;
      state.success = true;
    },
    fail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    reset(state) {
      state.error = {};
      state.success = false;
      state.loading = false;
    },
  },
});
export const orderPayDetailsActions = orderPayDetailsSlice.actions;
export default orderPayDetailsSlice.reducer;
