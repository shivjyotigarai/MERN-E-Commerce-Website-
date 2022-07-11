import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useParams } from "react-router";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import { loginViaToken } from "../actions/loginActions";

import { orderPayDetailsActions } from "../reducers/orderPayReducer";
import { orderDeliverDetailsActions } from "../reducers/orderDeliverReducer";
import { Heading, Divider, Button } from "@chakra-ui/react";
const OrderScreen = ({ history }) => {
  const match = useParams();
  const orderId = match.id;
  //const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  console.log(orderDetails);

  const orderPay = useSelector((state) => state.orderPayDetail);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliverDetail);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.loginDetail);
  const { userInfo } = userLogin;
  console.log("user info in order screen");
  console.log(userInfo);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const token = user.token;
  useEffect(() => {
    dispatch(loginViaToken(token));
    // dispatch(getOrderDetails(orderId, token));
  }, []);
  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
    if (!order || successPay || successDeliver || order._id !== orderId) {
      // whenever the payment or deliver method is done the component is loaded and getOrderDetails are filled
      dispatch(orderPayDetailsActions.reset());
      dispatch(orderDeliverDetailsActions.reset());
      dispatch(getOrderDetails(orderId, token));
    }
  }, [dispatch, successPay, successDeliver, order]);

  const successPaymentHandler = () => {
    dispatch(payOrder(orderId, token));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order, token));
  };

  return (
    <>
      {!order.orderItems ? (
        <h1>Order not valid</h1>
      ) : (
        <Row>
          <Col md={8}>
            <Heading size="xl" py="5px">
              Order Details
            </Heading>
            <Divider />
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Heading size="md" py="5px">
                  Shipping
                </Heading>
                <p>
                  <strong>Name: </strong> {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong>{" "}
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>Address:</strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message status="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message status="error">Not Delivered</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <Heading size="md" py="5px">
                  Payment Method
                </Heading>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message status="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message status="error">Not Paid</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <Heading size="md" py="5px">
                  Order Items
                </Heading>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
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
                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}

                    <Button
                      colorScheme="blue"
                      margin="4px"
                      onClick={successPaymentHandler}
                    >
                      Pay
                    </Button>
                  </ListGroup.Item>
                )}
                {loadingDeliver && <Loader />}
                {userInfo &&
                  userInfo.data &&
                  userInfo.data.user &&
                  userInfo.data.user.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        colorScheme="blue"
                        margin="4px"
                        onClick={deliverHandler}
                      >
                        Mark As Delivered
                      </Button>
                    </ListGroup.Item>
                  )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default OrderScreen;
