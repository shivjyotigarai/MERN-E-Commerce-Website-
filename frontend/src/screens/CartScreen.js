import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { fetchCartData } from "../actions/cartActions";
import { cartActions } from "../reducers/cartDetailsReducer";
import { sendCartData } from "../actions/cartActions";
import { loginViaToken } from "../actions/loginActions";
import Loader from "../components/Loader";
import { Text } from "@chakra-ui/react";

const CartScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartDetail);
  const cartItems = cart ? cart.items : [];
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const token = user ? user.token : "";
  const userLogin = useSelector((state) => state.loginDetail);
  const notification = useSelector((state) => state.uiDetail.notification);
  const loading = useSelector((state) => state.cartDetail.loading);
  console.log("user details");
  console.log(userLogin);

  useEffect(() => {
    if (userLogin && userLogin.userInfo.status)
      dispatch(fetchCartData(userLogin.userInfo));
  }, [userLogin]);

  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
    dispatch(loginViaToken(token));
  }, [dispatch]);

  const removeFromCartHandler = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };
  const addFromCartHandler = (item) => {
    dispatch(cartActions.addItemToCartFromCart(item));
  };
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  useEffect(() => {
    if (cart && cart.changed && user) {
      console.log("user to be sent");
      dispatch(sendCartData(cart, user));
    }
  }, [cart, dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={8}>
            {cartItems.length === 0 ? (
              <h1>Cart is Empty</h1>
            ) : (
              <>
                <Text
                  fontSize="3xl"
                  fontFamily="heading"
                  fontWeight="extrabold"
                  textAlign={["centre", "left"]}
                >
                  Shopping Cart ({cartItems.length} items)
                </Text>
                <ListGroup>
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.id}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={3}>
                          <Link to={`/product/${item.id}`}>{item.title}</Link>
                        </Col>
                        <Col md={2}>${item.price}</Col>
                        <Col md={2}>{item.quantity}</Col>
                        <Col md={2}>
                          <Button
                            type="button"
                            variant="primary"
                            onClick={() => addFromCartHandler(item)}
                            disabled={item.quantity > item.countInStock - 1}
                          >
                            <i className="fas fa-plus"></i>
                          </Button>
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => removeFromCartHandler(item.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <Text
                    fontSize="xl"
                    fontFamily="heading"
                    fontWeight="extrabold"
                    textAlign={["centre", "left"]}
                  >
                    Order Summary
                  </Text>
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                    products
                  </h2>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item variant="primary">
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
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

export default CartScreen;
/*
<Box
    maxW={{ base: '3xl', lg: '7xl' }}
    mx="auto"
    px={{ base: '4', md: '8', lg: '12' }}
    py={{ base: '6', md: '8', lg: '12' }}
  >
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      align={{ lg: 'flex-start' }}
      spacing={{ base: '8', md: '16' }}
    >
      <Stack spacing={{ base: '8', md: '10' }} flex="2">
        <Heading fontSize="2xl" fontWeight="extrabold">
          Shopping Cart (3 items)
        </Heading>

        <Stack spacing="6">
          {cartData.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </Stack>
      </Stack>

      <Flex direction="column" align="center" flex="1">
        <CartOrderSummary />
        <HStack mt="6" fontWeight="semibold">
          <p>or</p>
          <Link color={mode('blue.500', 'blue.200')}>Continue shopping</Link>
        </HStack>
      </Flex>
    </Stack>
  </Box>
*/
