import { createSlice } from "@reduxjs/toolkit";
const initialuserUpdateState = {
  success: false,
  loading: false,
  error: {},
};
const userUpdateSlice = createSlice({
  name: "userUpdateDetails",
  initialState: initialuserUpdateState,
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
  },
});
export const userUpdateActions = userUpdateSlice.actions;
export default userUpdateSlice.reducer;
