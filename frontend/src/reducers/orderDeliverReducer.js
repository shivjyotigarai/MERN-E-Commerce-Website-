import { createSlice } from "@reduxjs/toolkit";
const initialorderDeliverDetailsCreateState = {
  loading: false,
  success: false,
  error: {},
};
const orderDeliverDetailsSlice = createSlice({
  name: "orderDeliverDetails",
  initialState: initialorderDeliverDetailsCreateState,
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
export const orderDeliverDetailsActions = orderDeliverDetailsSlice.actions;
export default orderDeliverDetailsSlice.reducer;
