import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
// import { saveShippingAddress } from "../actions/cartActions";
import { sendCartData } from "../actions/cartActions";
import { loginViaToken } from "../actions/loginActions";
import { cartActions } from "../reducers/cartDetailsReducer";
import { fetchCartData } from "../actions/cartActions";
import { useEffect } from "react";
import { Heading, Divider, Button, ButtonGroup } from "@chakra-ui/react";
let isInitial = true;
let isInitial2 = true;
const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartDetail);
  console.log("CART IN SHIPPING SCREEN");
  console.log(cart);

  const [address, setAddress] = useState(cart.shippingAddress.address);
  const [city, setCity] = useState(cart.shippingAddress.city);
  const [postalCode, setPostalCode] = useState(cart.shippingAddress.postalCode);
  const [country, setCountry] = useState(cart.shippingAddress.country);

  const userLogin = useSelector((state) => state.loginDetail);
  const user = JSON.parse(localStorage.getItem("userInfo")); // from the local storage
  const { userInfo } = userLogin;

  if (!user || !user.data) history.push("/");
  useEffect(() => {
    // only for the first time the component is loaded especially after reload
    if (user && user.data) {
      const token = user.token;
      dispatch(loginViaToken(token));
    }
    dispatch(fetchCartData(userInfo));
  }, [dispatch]);
  useEffect(() => {
    setAddress(cart.shippingAddress.address);
    setCity(cart.shippingAddress.city);
    setPostalCode(cart.shippingAddress.postalCode);
    setCountry(cart.shippingAddress.country);
  }, [cart]);

  const submitHandler = (e) => {
    e.preventDefault();
    history.push("/payment");
  };
  const saveHandler = () => {
    dispatch(
      cartActions.saveShippingAddress({ address, city, postalCode, country })
    );
  };
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart && cart.changed && user) {
      dispatch(sendCartData(cart, user));
    }
  }, [cart]);

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <Heading size="md" py="5px">
        Shipping
      </Heading>
      <Divider />
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button colorScheme="blue" margin="4px" onClick={saveHandler}>
          Save
        </Button>
        <Button colorScheme="blue" margin="4px" type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
