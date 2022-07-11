import { createSlice } from "@reduxjs/toolkit";
const initialuserInfoDetailsState = {
  userInfo: {},
  loading: false,
  error: {},
};
const userInfoDetailsSlice = createSlice({
  name: "userInfoDetails",
  initialState: initialuserInfoDetailsState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    success(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
    },
    fail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.userInfo = {};
      state.error = {};
    },
    resetfail(state) {
      state.error = {};
    },
  },
});
export const userInfoDetailsActions = userInfoDetailsSlice.actions;
export default userInfoDetailsSlice.reducer;
