import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { sendCartData } from "../actions/cartActions";
import { loginViaToken } from "../actions/loginActions";
import { cartActions } from "../reducers/cartDetailsReducer";
import { useEffect } from "react";
import { fetchCartData } from "../actions/cartActions";
import { Heading, Divider, Button } from "@chakra-ui/react";
let isInitial = true;
let isInitial2 = true;
const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartDetail);
  //   const history = useHistory();
  const { shippingAddress } = cart;
  const userLogin = useSelector((state) => state.loginDetail);
  const user = JSON.parse(localStorage.getItem("userInfo")); // from the local storage
  const cartData = JSON.parse(localStorage.getItem("cartData"));
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const { userInfo } = userLogin;
  if (cartData && isInitial2) {
    isInitial2 = false;
    setPaymentMethod(cartData.paymentMethod);
  }
  useEffect(() => {
    // AFTER RELOAD
    if (user && user.data) {
      const token = user.token;
      console.log(token);
      dispatch(loginViaToken(token));
    }
    dispatch(fetchCartData(userInfo));
  }, [dispatch]);

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    history.push("/placeorder");
  };
  const saveHandler = () => {
    dispatch(cartActions.savePaymentMethod(paymentMethod));
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
      <CheckoutSteps step1 step2 step3 />
      <Heading size="md" py="5px">
        Payment Screen
      </Heading>
      <Divider />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
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

export default PaymentScreen;
