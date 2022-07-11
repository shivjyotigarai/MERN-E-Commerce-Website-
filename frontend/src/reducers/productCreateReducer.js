import { createSlice } from "@reduxjs/toolkit";
const initialProductCreateDetailsState = {
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
  success: false,
};
const productCreateDetailsSlice = createSlice({
  name: "productCreateDetails",
  initialState: initialProductCreateDetailsState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    success(state, action) {
      state.loading = false;
      state.success = true;
      state.product = action.payload;
    },
    fail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    reset(state) {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.product = {
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
      };
    },
  },
});
export const productCreateDetailsActions = productCreateDetailsSlice.actions;
export default productCreateDetailsSlice.reducer;
