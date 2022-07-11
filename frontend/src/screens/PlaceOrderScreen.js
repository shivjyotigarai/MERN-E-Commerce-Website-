import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { createorderDetailsActions } from "../reducers/orderCreateReducer";
import { cartActions } from "../reducers/cartDetailsReducer";
import { sendCartData } from "../actions/cartActions";
import { loginViaToken } from "../actions/loginActions";
import { fetchCartData } from "../actions/cartActions";
import { Heading, Divider, Button } from "@chakra-ui/react";
/*

   2 useEffect() :-
   1. First time when this screen is loaded then cart has to fetched from the database. It will fill state.cart
   2. When the cart state changes , it has to be updated in the database

  */

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartDetail);
  // const cartItems = cart ? cart.items : [];
  // const loading = useSelector((state) => state.cartDetail.loading);

  //const cartLocal = JSON.parse(localStorage.getItem("cartData"));
  const userLogin = useSelector((state) => state.loginDetail);
  const user = JSON.parse(localStorage.getItem("userInfo")); // from the local storage
  const token = user ? user.token : "";
  //const { userInfo } = userLogin;

  if (cart.items.length > 0 && !cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (cart.items.length > 0 && !cart.paymentMethod) {
    history.push("/payment");
  }

  //   Calculate prices

  const cart2 = {};
  cart2.itemsPrice =
    cart.items.length > 0
      ? cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
      : 0;
  if (cart.items.length > 0)
    cart2.shippingPrice = cart2.itemsPrice > 100 ? 0 : 100;
  else cart2.shippingPrice = 0;
  cart2.taxPrice = 0.15 * cart2.itemsPrice;
  cart2.totalPrice = cart2.itemsPrice + cart2.shippingPrice + cart2.taxPrice;

  const orderCreate = useSelector((state) => state.orderCreateDetail);
  /*
  shipping address
  payment method 
  */
  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
    dispatch(loginViaToken(token));
  }, [dispatch]);

  useEffect(() => {
    if (userLogin && userLogin.userInfo.status)
      dispatch(fetchCartData(userLogin.userInfo));
  }, [userLogin]);

  useEffect(() => {
    if (orderCreate.success) {
      console.log("ORDER CREATED");
      dispatch(cartActions.reset());
      dispatch(createorderDetailsActions.reset()); // create order reducer is set to null after the order is created
      dispatch(
        sendCartData(
          {
            items: [],
            totalQuantity: 0,
            changed: false,
            image: "",
            loading: false,
            shippingAddress: cart.shippingAddress,
            paymentMethod: {},
          },
          user
        )
      );
      history.push(`/order/${orderCreate.order._id}`);
    }
    // eslint-disable-next-line
  }, [history, orderCreate.success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder(
        {
          orderItems: cart.items,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          totalPrice: cart2.totalPrice,
          itemsPrice: cart2.itemsPrice,
          shippingPrice: cart2.shippingPrice,
          taxPrice: cart2.taxPrice,
        },
        user.token
      )
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      {cart.loading || cart.items.length == 0 ? (
        <Heading size="lg" py="5px">
          Place Order
        </Heading>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Heading size="lg" py="5px">
                  Shipping
                </Heading>
                <p>
                  <strong>Address:</strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                  {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <Heading size="lg" py="5px">
                  Payment Method
                </Heading>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </ListGroup.Item>

              <ListGroup.Item>
                <Heading size="lg" py="5px">
                  Order Items
                </Heading>
                {cart.items.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cart.items.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.title}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.id}`}>{item.title}</Link>
                          </Col>
                          <Col md={4}>
                            {item.quantity} x ${item.price} = $
                            {item.quantity * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Heading size="md" py="5px">
                    Order Summary
                  </Heading>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${cart2.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${cart2.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart2.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${cart2.totalPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    colorScheme="blue"
                    margin="4px"
                    disabled={cart.items === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PlaceOrderScreen;
