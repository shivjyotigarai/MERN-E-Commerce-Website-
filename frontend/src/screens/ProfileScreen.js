import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { loginViaToken } from "../actions/loginActions";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  Divider,
  Button,
} from "@chakra-ui/react";
let flag = false;
const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  // getting the user details
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  console.log("user Detail");
  console.log(userDetails);
  // login details
  const userLogin = useSelector((state) => state.loginDetail);
  const { userInfo } = userLogin;
  // update profile detail
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  // orders list
  const orderMyList = useSelector((state) => state.orderMyListDetail);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;
  console.log("Orders in profile scren.js");
  console.log(orderMyList);
  const user2 = JSON.parse(localStorage.getItem("userInfo"));
  const token = user2 ? user2.token : "";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    dispatch(loginViaToken(token));
  }, [dispatch]);

  useEffect(() => {
    if (!token) {
      history.push("/login");
    } else {
      if (
        userLogin &&
        userLogin.userInfo.status &&
        (!user.data || !user.data.user.name)
      ) {
        // dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails(token));
        dispatch(listMyOrders(token));
      } else if (userLogin && userLogin.userInfo.status) {
        setName(user.data.user.name);
        setEmail(user.data.user.email);
      } else return;
    }
  }, [dispatch, history, userLogin, userDetails]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUserProfile({ id: user._id, name, email }, token));
  };

  return (
    <Row>
      <Col md={3}>
        <Heading size="xl" py="5px">
          My Profile
        </Heading>
        <Divider />
        {!success && message && <Message status="error">{message}</Message>}
        {success && <Message status="success">Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button colorScheme="blue" margin="4px" type="submit">
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <Heading size="xl" py="5px">
          My Orders
        </Heading>
        <Divider />
        {loadingOrders || orders.length == 0 ? (
          <Loader />
        ) : (
          <TableContainer>
            <Table variant="striped" colorScheme="blue" size="sm">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>DATE</Th>
                  <Th>TOTAL</Th>
                  <Th>PAID</Th>
                  <Th>DELIVERED</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.data.orders.map((order) => (
                  <Tr key={order._id}>
                    <Td>{order._id}</Td>
                    <Td>{order.createdAt.substring(0, 10)}</Td>
                    <Td>{order.totalPrice}</Td>
                    <Td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </Td>
                    <Td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </Td>
                    <Td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
