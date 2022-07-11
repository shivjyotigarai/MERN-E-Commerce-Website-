import axios from "axios";
import { registerInfoDetailsActions } from "../reducers/registerDetailsReducer";
import { fetchCartData } from "../actions/cartActions";
import { userInfoDetailsActions } from "../reducers/loginDetailsReducer";
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch(registerInfoDetailsActions.request());
    const { data } = await axios.post("/api/users/signup", {
      name,
      email,
      password,
    });
    dispatch(registerInfoDetailsActions.success(data));
    dispatch(userInfoDetailsActions.success(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
    // const user = JSON.parse(localStorage.getItem("userInfo"));
    // dispatch(fetchCartData(user));
  } catch (error) {
    dispatch(
      registerInfoDetailsActions.fail({
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};
