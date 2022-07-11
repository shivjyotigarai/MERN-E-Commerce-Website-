import { createSlice } from "@reduxjs/toolkit";
const initialuserUpdateProfileState = {
  success: false,
  loading: false,
  error: {},
};
const userUpdateProfileSlice = createSlice({
  name: "userUpdateProfileDetails",
  initialState: initialuserUpdateProfileState,
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
      state.loading = false;
      state.error = {};
      state.success = false;
    },
  },
});
export const userUpdateProfileActions = userUpdateProfileSlice.actions;
export default userUpdateProfileSlice.reducer;
