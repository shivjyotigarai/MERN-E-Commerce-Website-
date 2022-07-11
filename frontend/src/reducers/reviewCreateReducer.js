import { createSlice } from "@reduxjs/toolkit";
const initialreviewCreateState = {
  review: {},
  loading: false,
  error: {},
  success: false,
};
const createreviewDetailsSlice = createSlice({
  name: "createreviewDetails",
  initialState: initialreviewCreateState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    success(state, action) {
      state.review = action.payload;
      state.loading = false;
      state.success = true;
    },
    fail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    reset(state) {
      state.review = {};
      state.loading = false;
      state.error = {};
      state.success = false;
    },
  },
});
export const createreviewDetailsActions = createreviewDetailsSlice.actions;
export default createreviewDetailsSlice.reducer;
