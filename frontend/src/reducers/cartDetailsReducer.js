import { createSlice } from "@reduxjs/toolkit";
const initialCartDetailsState = {
  items: [],
  user: null,
  totalQuantity: 0,
  changed: false,
  image: "",
  loading: false,
  shippingAddress: {
    address: "",
    city: "",
    postalCode: "",
    country: "",
  },
  paymentMethod: {},
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartDetailsState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
      state.shippingAddress = action.payload.shippingAddress;
      state.paymentMethod = action.payload.paymentMethod;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem._id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem._id,
          title: newItem.name,
          quantity: 1,
          price: newItem.price,
          total: newItem.price,
          image: newItem.image,
          countInStock: newItem.countInStock,
        });
        console.log("new item added");
      } else {
        existingItem.quantity++;
        existingItem.total = existingItem.total + newItem.price;
        console.log("existing item updated");
      }
    },
    addItemToCartFromCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.name,
          quantity: 1,
          price: newItem.price,
          total: newItem.price,
          image: newItem.image,
          countInStock: newItem.countInStock,
        });
        console.log("new item added");
      } else {
        existingItem.quantity++;
        existingItem.total = existingItem.total + newItem.price;
        console.log("existing item updated");
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.total = existingItem.total - existingItem.price;
      }
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      state.changed = true;
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      state.changed = true;
    },
    setloading(state) {
      state.loading = true;
    },
    clearItem(state) {
      state.items = [];
    },
    offloading(state) {
      state.loading = false;
    },
    reset(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.changed = true;
      state.image = "";
      state.loading = false;
      state.shippingAddress = {
        address: "",
        city: "",
        postalCode: "",
        country: "",
      };
    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
// items: [],
//   totalQuantity: 0,
//   changed: false,
//   image: "",
//   loading: false,
//   shippingAddress: {
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "",
//   },
