import { createSlice } from "@reduxjs/toolkit";
const initialProductDetailsState = {
  product: {
    brand: "",
    category: "",
    countInStock: 0,
    createdAt: "",
    description: "",
    image: "",
    name: "",
    numsReviews: 0,
    price: 0.0,
    rating: 0.0,
    reviews: [],
    updatedAt: "",
    user: "",
    _id: "",
  },
  loading: false,
  error: false,
};
const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: initialProductDetailsState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    success(state, action) {
      state.loading = false;
      state.product = action.payload;
    },
    fail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const productDetailsActions = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
