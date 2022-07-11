import axios from "axios";
import { userInfoDetailsActions } from "../reducers/loginDetailsReducer";
import { fetchCartData } from "../actions/cartActions";
export const login = (email, password) => async (dispatch) => {
  dispatch(userInfoDetailsActions.request());

  const { data } = await axios
    .post("/api/users/login", { email, password })
    .catch(function (error) {
      console.log(error.toJSON());
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        dispatch(
          userInfoDetailsActions.fail({
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
        );
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  console.log("DATA WHICH IS TO ADDED TO LOCAL STORAGE");
  console.log(data);
  dispatch(userInfoDetailsActions.success(data));
  localStorage.setItem("userInfo", JSON.stringify(data));
  const user = JSON.parse(localStorage.getItem("userInfo"));
  dispatch(fetchCartData(user));
};
export const loginViaToken = (token) => async (dispatch) => {
  try {
    console.log("INDSIDE LOGIN VIA TOKEN");
    dispatch(userInfoDetailsActions.request());
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(`/api/users/loginViaToken`, {}, config);
    console.log("DATA WHICH IS TO ADDED TO LOCAL STORAGE loginViaToken");
    console.log(data);
    dispatch(userInfoDetailsActions.success(data));
    const user = JSON.parse(localStorage.getItem("userInfo"));
    dispatch(fetchCartData(user));
  } catch (error) {
    console.log("ERROR caused !!!");
    // console.log(error);
    dispatch(
      userInfoDetailsActions.fail({
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};
