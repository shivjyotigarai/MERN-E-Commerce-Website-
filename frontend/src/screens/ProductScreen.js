import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Card, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductsDetails } from "../actions/productActions";
import { cartActions } from "../reducers/cartDetailsReducer";
import { sendCartData } from "../actions/cartActions";
import { loginViaToken } from "../actions/loginActions";
import { createProductReview } from "../actions/productActions";
import { createreviewDetailsActions } from "../reducers/reviewCreateReducer";
import Loader from "../components/Loader";
import Message from "../components/Message";

import {
  Heading,
  HStack,
  VStack,
  AspectRatio,
  Image,
  Text,
  Divider,
  Button,
  Box,
  Stack,
  useColorMode,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Flex, Container } from "@chakra-ui/react";

const ProductScreen = ({ history }) => {
  const dispatch = useDispatch();
  const match = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const productReviewCreate = useSelector((state) => state.reviewCreateDetail);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;
  const cart = useSelector((state) => state.cartDetail);
  const userLogin = useSelector((state) => state.loginDetail);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const token = user ? user.token : "";
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  console.log("error in product details page");
  console.log(errorProductReview);
  console.log(productReviewCreate);
  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
    dispatch(loginViaToken(token));
    dispatch(createreviewDetailsActions.reset());
  }, []);
  useEffect(() => {
    dispatch(listProductsDetails(match.id));
  }, [dispatch, productReviewCreate]);

  useEffect(() => {
    if (cart && cart.changed && user) {
      console.log("user to be sent");
      console.log(user);
      dispatch(sendCartData(cart, user));
    }
  }, [cart, dispatch]);
  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart(product));
    alert("Item Added to Cart");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setRating(0);
    setComment("");
    dispatch(
      createProductReview(
        match.id,
        {
          rating,
          comment,
        },
        token
      )
    );
  };
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Container maxW="container.xl" p={0}>
        <Flex
          h={{ base: "auto", md: "auto" }}
          py={[0, 2, 5]}
          direction={{ base: "column-reverse", md: "row" }}
        >
          <VStack w="60%" h="full" p={5} spacing={10} alignItems="flex-start">
            <Image
              objectFit="cover"
              src={product.image}
              alt="Product"
              align="centre"
            />
          </VStack>
          <VStack
            w="40%"
            h="full"
            p={10}
            spacing={10}
            alignItems="flex-start"
            bg="gray.50"
          >
            <VStack alignItems="flex-start" spacing={3}>
              <Heading size="xl">{product.name}</Heading>
              <Divider />
              <Box display="flex" mt="2" alignItems="center">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < product.rating ? "blue.500" : "gray.300"}
                    />
                  ))}
                <Box as="span" ml="2" color="gray.800" fontSize="lg">
                  {product.numReviews} reviews
                </Box>
              </Box>
              <Heading size="sm">Description:-</Heading>
              <Text as="i">{product.description}</Text>
              <Divider />
              <Col md={5}>
                <Card>
                  <ListGroup variant="primary">
                    <ListGroup.Item>
                      <Row>
                        <Col>Remaining:</Col>
                        <Col>{product.countInStock}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item active>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out Of Stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>

              <Heading size="lg">${product.price}</Heading>

              <Button
                colorScheme="blue"
                size="lg"
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                Add To Cart
              </Button>
            </VStack>
          </VStack>
        </Flex>
      </Container>
      <Row>
        <Row>
          <Col md={6}>
            <Heading size="xl" py="5px">
              Reviews
            </Heading>
            <Divider />
            {product.reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant="flush">
              {product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Box display="flex" mt="2" alignItems="center">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < review.rating ? "blue.500" : "gray.300"}
                        />
                      ))}
                  </Box>
                  <br />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <Heading size="md" py="5px">
                  Write a Customer Review
                </Heading>
                {successProductReview && !errorProductReview.payload && (
                  <Message status="success">
                    Review submitted successfully
                  </Message>
                )}
                {loadingProductReview && <Loader />}
                {errorProductReview.payload && (
                  <Message status="error">
                    {errorProductReview.payload.body}
                  </Message>
                )}
                {userLogin.userInfo.status ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      disabled={loadingProductReview}
                      type="submit"
                      colorScheme="blue"
                      size="md"
                      m="5px"
                    >
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to="/login"> sign in</Link> to write a review{" "}
                  </Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Row>
    </>
  );
};
export default ProductScreen;
