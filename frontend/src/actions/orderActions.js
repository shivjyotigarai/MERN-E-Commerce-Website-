import axios from "axios";
import { createorderDetailsActions } from "../reducers/orderCreateReducer";
import { cartActions } from "../reducers/cartDetailsReducer";
import { orderDeliverDetailsActions } from "../reducers/orderDeliverReducer";
import { orderDetailsActions } from "../reducers/orderDetailsReducer";
import { orderListDetailsActions } from "../reducers/orderListReducer";
import { orderMyListDetailsActions } from "../reducers/orderMyListReducer";
import { orderPayDetailsActions } from "../reducers/orderPayReducer";
export const createOrder = (order, token) => async (dispatch, getState) => {
  let flag = false;
  dispatch(createorderDetailsActions.request());
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios
    .post(`/api/orders`, order, config)
    .catch(function (error) {
      console.log(error.toJSON());
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        dispatch(
          createorderDetailsActions.fail({
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
        );
        flag = true;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  if (flag) return;
  dispatch(createorderDetailsActions.success(data));
  dispatch(cartActions.reset());
};

export const getOrderDetails = (id, token) => async (dispatch, getState) => {
  let flag = false;
  dispatch(orderDetailsActions.request());
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  //authorization
  console.log("INSIDE GET ORDER DETAIL");
  console.log(id);
  console.log(token);
  const { data } = await axios
    .get(`/api/orders/${id}`, config)
    .catch(function (error) {
      console.log(error.toJSON());
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        dispatch(
          orderDetailsActions.fail({
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
        );
        flag = true;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  if (flag) return;
  dispatch(orderDetailsActions.success(data));
};

export const payOrder = (orderId, token) => async (dispatch) => {
  let flag = false;
  dispatch(orderPayDetailsActions.request());
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios
    .get(`/api/orders/${orderId}/pay`, config)
    .catch(function (error) {
      console.log(error.toJSON());
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        dispatch(
          orderPayDetailsActions.fail({
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
        );
        flag = true;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  if (flag) return;
  dispatch(orderPayDetailsActions.success(data));
};

export const deliverOrder = (order, token) => async (dispatch) => {
  let flag = false;
  dispatch(orderDeliverDetailsActions.request());
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios
    .get(`/api/orders/${order._id}/deliver`, config)
    .catch(function (error) {
      console.log(error.toJSON());
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        dispatch(
          orderDeliverDetailsActions.fail({
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
        );
        flag = true;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  if (flag) return;
  dispatch(orderDeliverDetailsActions.success(data));
};

export const listMyOrders = (token) => async (dispatch) => {
  let flag = false;
  dispatch(orderMyListDetailsActions.request());
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios
    .get(`/api/orders/myorders`, config)
    .catch(function (error) {
      console.log(error.toJSON());
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        dispatch(
          orderMyListDetailsActions.fail({
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
        );
        flag = true;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  if (flag) return;
  console.log("orders in orderAction.js");
  console.log(data);

  dispatch(orderMyListDetailsActions.success(data));
};

export const listOrders = (token) => async (dispatch) => {
  let flag = false;
  console.log("listOrders");
  dispatch(orderListDetailsActions.request());
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios
    .get(`/api/orders`, config)
    .catch(function (error) {
      console.log(error.toJSON());
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        dispatch(
          orderListDetailsActions.fail({
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
        );
        flag = true;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  if (flag) return;
  console.log("data in orderActions.js");
  console.log(data);
  dispatch(orderListDetailsActions.success(data));
};
