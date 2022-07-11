import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./reducers/productListReducers";
import productDetailsReducer from "./reducers/productDetailsReducer";
import productCreateReducer from "./reducers/productCreateReducer";
import loginDetailsReducer from "./reducers/loginDetailsReducer";
import cartDetailsReducer from "./reducers/cartDetailsReducer";
import uiReducer from "./reducers/uiReducer";
import registerDetailsReducer from "./reducers/registerDetailsReducer";
import orderCreateReducer from "./reducers/orderCreateReducer";
import orderDeliverReducer from "./reducers/orderDeliverReducer";
import orderDetailsReducer from "./reducers/orderDetailsReducer";
import orderListReducer from "./reducers/orderListReducer";
import orderMyListReducer from "./reducers/orderMyListReducer";
import orderPayReducer from "./reducers/orderPayReducer";
import userUpdateProfileReducer from "./reducers/userUpdateProfileReducer";
import userDetailsReducer from "./reducers/userDetailsReducer";
import productUpdateReducer from "./reducers/productUpdateReducer";
import reviewCreateReducer from "./reducers/reviewCreateReducer";
const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreateDetails: productCreateReducer,
    productUpdate: productUpdateReducer,
    loginDetail: loginDetailsReducer,
    cartDetail: cartDetailsReducer,
    uiDetail: uiReducer,
    registerDetail: registerDetailsReducer,
    orderCreateDetail: orderCreateReducer,
    orderDeliverDetail: orderDeliverReducer,
    orderDetails: orderDetailsReducer,
    orderListDetail: orderListReducer,
    orderMyListDetail: orderMyListReducer,
    orderPayDetail: orderPayReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDetails: userDetailsReducer,
    reviewCreateDetail: reviewCreateReducer,
  },
});
export default store;
