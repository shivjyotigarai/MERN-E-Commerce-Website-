import { createSlice } from "@reduxjs/toolkit";
const initialProductListState = {
  loading: false,
  products: [
    {
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
  ],
  error: false,
};
const productListSlice = createSlice({
  name: "productsList",
  initialState: initialProductListState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    success(state, action) {
      state.loading = false;
      state.products = action.payload;
    },
    fail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const productListActions = productListSlice.actions;
export default productListSlice.reducer;
