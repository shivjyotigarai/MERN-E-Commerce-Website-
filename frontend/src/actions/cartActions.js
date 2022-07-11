import { cartActions } from "../reducers/cartDetailsReducer";
import { useSelector } from "react-redux";
import axios from "axios";
import { uiActions } from "../reducers/uiReducer";
export const fetchCartData = (userInfo) => {
  console.log("CART FETCHED !!!!");
  return async (dispatch) => {
    const fetchData = async () => {
      if (!userInfo || !userInfo.data) {
        console.log("NO DATA");
        return {
          items: [],
          user: userInfo.data.user._id,
          totalQuantity: 0,
          paymentMethod: {},
          shippingAddress: {
            address: "",
            city: "",
            postalCode: "",
            country: "",
          },
        };
      }
      const response = await axios.get(`/api/cart/${userInfo.data.user._id}`);
      return response.data.data.cartDetails;
    };
    try {
      dispatch(cartActions.setloading());
      dispatch(
        uiActions.showNotification({
          status: "Loading",
          title: "Loading",
          message: "Loading",
        })
      );
      const cartData = await fetchData();
      console.log("Fetched cart data");
      console.log(cartData);
      dispatch(cartActions.offloading());
      if (cartData.totalQuantity == 0) {
        dispatch(
          uiActions.showNotification({
            status: "Failed",
            title: "Failed",
            message: "Must Be Logged In To View Cart ",
          })
        );
      } else {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Cart Data Loaded ",
          })
        );
      }
      if (cartData.totalQuantity == 0) {
        dispatch(
          cartActions.replaceCart({
            items: [],
            user: userInfo.data.user._id,
            totalQuantity: 0,
            paymentMethod: {},
            shippingAddress: {
              address: "",
              city: "",
              postalCode: "",
              country: "",
            },
          })
        );
      } else {
        dispatch(
          cartActions.replaceCart({
            items: cartData[0].items || [],
            user: userInfo.data.user._id,
            totalQuantity: cartData[0].totalQuantity || 0,
            paymentMethod: cartData[0].paymentMethod,
            shippingAddress: cartData[0].shippingAddress,
          })
        );
        localStorage.setItem(
          "cartData",
          JSON.stringify({
            items: cartData[0].items || [],
            user: userInfo.data.user._id,
            totalQuantity: cartData[0].totalQuantity || 0,
            paymentMethod: cartData[0].paymentMethod,
            shippingAddress: cartData[0].shippingAddress,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendCartData = (cart, userInfo) => {
  console.log("CART SENT TO DB !!!!");
  return async (dispatch) => {
    const sendRequest = async () => {
      console.log(cart);
      const response = axios.put("/api/cart", {
        user: userInfo.data.user._id,
        items: cart.items,
        totalQuantity: cart.totalQuantity,
        paymentMethod: cart.paymentMethod,
        shippingAddress: cart.shippingAddress,
      });
      localStorage.setItem(
        "cartData",
        JSON.stringify({
          user: userInfo.data.user._id,
          items: cart.items,
          totalQuantity: cart.totalQuantity,
          paymentMethod: cart.paymentMethod,
          shippingAddress: cart.shippingAddress,
        })
      );
      console.log("cart sent to db");
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};
// paymentMethod: { default: {} },
// shippingAddress: { default: {} },
