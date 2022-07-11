/*
getUserDetails
updateUserProfile
listUsers
deleteUser
updateUser => by the admin
*/
import axios from "axios";
import { userDeleteActions } from "../reducers/userDeleteReducer";
import { userDetailsActions } from "../reducers/userDetailsReducer";
import { userUpdateActions } from "../reducers/userUpdateReducer";
import { userUpdateProfileActions } from "../reducers/userUpdateProfileReducer";
import { userListActions } from "../reducers/userListReducer";
import { userInfoDetailsActions } from "../reducers/loginDetailsReducer";

export const getUserDetails = (token) => async (dispatch, getState) => {
  let flag = false;
  dispatch(userDetailsActions.request());
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios
    .get(`/api/users/me`, config)
    .catch(function (error) {
      console.log(error.toJSON());
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        dispatch(
          userDetailsActions.fail({
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
  dispatch(userDetailsActions.success(data));
};

export const updateUserProfile =
  (user, token) => async (dispatch, getState) => {
    let flag = false;
    dispatch(userUpdateProfileActions.request());

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios
      .patch(`/api/users/profile`, user, config)
      .catch(function (error) {
        console.log(error.toJSON());
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          dispatch(
            userUpdateProfileActions.fail({
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
    dispatch(userUpdateProfileActions.success(data));
    dispatch(userInfoDetailsActions.success(data));
    dispatch(userDetailsActions.reset());
    data["token"] = token;
    localStorage.setItem("userInfo", JSON.stringify(data));
  };

export const listUsers = (token) => async (dispatch, getState) => {
  let flag = false;
  dispatch(userListActions.request());
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios
    .get(`/api/users`, config)
    .catch(function (error) {
      console.log(error.toJSON());
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        dispatch(
          userListActions.fail({
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
  dispatch(userListActions.success(data));
};

export const deleteUser = (id, token) => async (dispatch, getState) => {
  dispatch(userDeleteActions.request());
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios.delete(`/api/users/${id}`, config).catch(function (error) {
    console.log(error.toJSON());
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      dispatch(
        userDeleteActions.fail({
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

  dispatch(userDeleteActions.success());
};

export const updateUser = (user, token) => async (dispatch, getState) => {
  let flag = true;
  dispatch(userUpdateActions.request());
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios
    .put(`/api/users/${user._id}`, user, config)
    .catch(function (error) {
      console.log(error.toJSON());
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        dispatch(
          userUpdateActions.fail({
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
  dispatch(userUpdateActions.success(data));

  dispatch(userDetailsActions.success(data));

  // dispatch({ type: USER_DETAILS_RESET });
};
