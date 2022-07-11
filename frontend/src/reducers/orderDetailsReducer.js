import { createSlice } from "@reduxjs/toolkit";
const initialorderDetailsCreateState = {
  order: {},
  loading: false,
  error: {},
};
const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: initialorderDetailsCreateState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    success(state, action) {
      state.loading = false;
      state.order = action.payload;
    },
    fail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const orderDetailsActions = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
