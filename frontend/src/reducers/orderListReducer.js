import { createSlice } from "@reduxjs/toolkit";
const initialorderListDetailsCreateState = {
  loading: false,
  orders: [],
  error: {},
};
const orderListDetailsSlice = createSlice({
  name: "orderListDetails",
  initialState: initialorderListDetailsCreateState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    success(state, action) {
      state.loading = false;
      state.orders = action.payload;
    },
    fail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    reset(state) {
      state.error = {};
      state.orders = [];
      state.loading = false;
    },
  },
});
export const orderListDetailsActions = orderListDetailsSlice.actions;
export default orderListDetailsSlice.reducer;
