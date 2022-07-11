import { createSlice } from "@reduxjs/toolkit";
const initialuserDeleteState = {
  success: false,
  loading: false,
  error: {},
};
const userDeleteSlice = createSlice({
  name: "userDeleteDetails",
  initialState: initialuserDeleteState,
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
export const userDeleteActions = userDeleteSlice.actions;
export default userDeleteSlice.reducer;
