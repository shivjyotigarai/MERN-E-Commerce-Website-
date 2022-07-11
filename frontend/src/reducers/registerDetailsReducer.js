import { createSlice } from "@reduxjs/toolkit";
const initialregisterInfoDetailsState = {
  registerInfo: {},
  loading: false,
  error: false,
};
const registerInfoDetailsSlice = createSlice({
  name: "registerDetails",
  initialState: initialregisterInfoDetailsState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    success(state, action) {
      state.loading = false;
      state.registerInfo = action.payload;
    },
    fail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const registerInfoDetailsActions = registerInfoDetailsSlice.actions;
export default registerInfoDetailsSlice.reducer;
