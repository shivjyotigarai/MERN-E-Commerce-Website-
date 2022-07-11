import axios from "axios";
import { productListActions } from "../reducers/productListReducers";
import { productDetailsActions } from "../reducers/productDetailsReducer";
import { productCreateDetailsActions } from "../reducers/productCreateReducer";
import { productUpdateActions } from "../reducers/productUpdateReducer";
import { createreviewDetailsActions } from "../reducers/reviewCreateReducer";
export const listProducts = () => async (dispatch) => {
  try {
    dispatch(productListActions.request());
    const { data } = await axios.get("/api/products");
    dispatch(productListActions.success(data));
  } catch (error) {
    dispatch(
      productListActions.fail({
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};
export const listProductsDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailsActions.request());
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(productDetailsActions.success(data));
  } catch (error) {
    dispatch(
      productDetailsActions.fail({
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    );
  }
};
export const createProduct = (token) => async (dispatch) => {
  let flag = false;
  dispatch(productCreateDetailsActions.request());
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios
    .post(`/api/products`, {}, config)
    .catch(function (error) {
      console.log(error.toJSON());
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        dispatch(
          productCreateDetailsActions.fail({
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

  dispatch(productCreateDetailsActions.success(data));
};
export const updateProduct = (product, token) => async (dispatch) => {
  console.log("INSIDE UPDATE PRODUCT");
  console.log(product);
  product.price = parseFloat(product.price);
  product.countInStock = parseInt(product.countInStock);
  console.log(product);
  let flag = false;
  dispatch(productUpdateActions.request());
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios
    .patch(`/api/products/${product._id}`, product, config)
    .catch(function (error) {
      console.log(error.toJSON());
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        dispatch(
          productUpdateActions.fail({
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
  dispatch(productUpdateActions.success(data));
  dispatch(productDetailsActions.success(data));
};
export const createProductReview =
  (productId, review, token) => async (dispatch) => {
    let flag = 0;
    dispatch(createreviewDetailsActions.request());
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .post(`/api/products/${productId}/reviews`, review, config)
      .catch(function (error) {
        console.log(error.toJSON());
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          dispatch(
            createreviewDetailsActions.fail({
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
    console.log("reached here");
    dispatch(createreviewDetailsActions.success());
  };
// const submitHandler = (e) => {
//   e.preventDefault();
//   dispatch(
//     updateProduct({
//       _id: productId,
//       name,
//       price,
//       image,
//       brand,
//       category,
//       description,
//       countInStock,
//     })
//   );
// };
