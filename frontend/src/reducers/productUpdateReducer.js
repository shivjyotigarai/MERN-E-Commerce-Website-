import { createSlice } from "@reduxjs/toolkit";
const initialproductUpdateState = {
  success: false,
  loading: false,
  error: {},
};
const productUpdateSlice = createSlice({
  name: "productUpdateDetails",
  initialState: initialproductUpdateState,
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
      state.success = false;
      state.loading = false;
      state.error = {};
    },
  },
});
export const productUpdateActions = productUpdateSlice.actions;
export default productUpdateSlice.reducer;
