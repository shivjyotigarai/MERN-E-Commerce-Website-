import { createSlice } from "@reduxjs/toolkit";
const initialuserDetailsState = {
  loading: false,
  user: {},
  error: {},
};
const userDetailsSlice = createSlice({
  name: "userDetailsDetails",
  initialState: initialuserDetailsState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    success(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    fail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    reset(state) {
      state.user = {};
      state.loading = false;
      state.error = {};
    },
  },
});
export const userDetailsActions = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
