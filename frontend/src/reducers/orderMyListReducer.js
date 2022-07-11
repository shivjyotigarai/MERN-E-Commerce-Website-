import { createSlice } from "@reduxjs/toolkit";
const initialorderMyListDetailsCreateState = {
  loading: false,
  orders: [],
  error: {},
};
const orderMyListDetailsSlice = createSlice({
  name: "orderMyListDetails",
  initialState: initialorderMyListDetailsCreateState,
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
export const orderMyListDetailsActions = orderMyListDetailsSlice.actions;
export default orderMyListDetailsSlice.reducer;
