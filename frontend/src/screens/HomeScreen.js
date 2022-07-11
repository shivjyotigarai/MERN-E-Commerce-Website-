import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import { sendCartData } from "../actions/cartActions";
import { loginViaToken } from "../actions/loginActions";
import { Text, AspectRatio } from "@chakra-ui/react";
import { Wrap, WrapItem } from "@chakra-ui/react";
let isInitial = true;
const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  console.log(products);
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  const userLogin = useSelector((state) => state.loginDetail);
  const user = JSON.parse(localStorage.getItem("userInfo")); // from the local storage
  const { userInfo } = userLogin;
  console.log("USER INFO");
  console.log(userInfo);
  if (userInfo.data) console.log(userInfo.data.user.name);
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart && cart.changed) {
      dispatch(sendCartData(cart, userInfo));
    }
  }, [cart, dispatch]);
  useEffect(() => {
    // if the page is loaded or refreshed after login
    // hence it will run only for the first time
    if (user && user.data) {
      const token = user.token;
      console.log(token);
      dispatch(loginViaToken(token));
    }
  }, []);
  console.log("PRODUCTS");
  console.log(products);
  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <>
          <Text
            fontSize="4xl"
            fontFamily="heading"
            fontWeight="extrabold"
            textAlign={["centre", "left"]}
          >
            {products.length} Products available...
          </Text>
          <Wrap justify="center">
            {products.map((product) => (
              <WrapItem>
                <Product product={product} />
              </WrapItem>
            ))}
          </Wrap>
        </>
      )}
    </>
  );
};

export default HomeScreen;
