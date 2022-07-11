import { createSlice } from "@reduxjs/toolkit";
const initialuserListState = {
  loading: false,
  users: [],
  error: {},
};
const userListSlice = createSlice({
  name: "userListList",
  initialState: initialuserListState,
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
      state.users = [];
      state.loading = false;
      state.error = {};
    },
  },
});
export const userListActions = userListSlice.actions;
export default userListSlice.reducer;
