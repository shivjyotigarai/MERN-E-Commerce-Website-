// Admin order list & mark as delivered
import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";
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
} from "@chakra-ui/react";
const OrderListScreen = ({ history }) => {
  //console.log("inside order list scren");
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderListDetail);
  const userLogin = useSelector((state) => state.loginDetail);
  //   const { userInfo } = userLogin;
  console.log(userLogin);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const token = user ? user.token : "";
  console.log(token);
  console.log(orderList);
  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
    console.log(token);
    dispatch(loginViaToken(token));
    console.log("log in via token");
  }, [dispatch]);

  useEffect(() => {
    if (
      userLogin &&
      userLogin.userInfo.status &&
      userLogin.userInfo.data.user.isAdmin
    ) {
      dispatch(listOrders(token));
    } else if (
      userLogin &&
      userLogin.userInfo.status &&
      !userLogin.userInfo.data.user.isAdmin
    ) {
      history.push("/");
    }
  }, [dispatch, history, userLogin]);

  return (
    <>
      <Heading size="lg" py="5px">
        Orders
      </Heading>
      {orderList.orders.length == 0 || orderList.loading ? (
        <Loader />
      ) : (
        <TableContainer>
          <Table variant="striped" colorScheme="blue" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>USER</Th>
                <Th>DATE</Th>
                <Th>TOTAL</Th>
                <Th>PAID</Th>
                <Th>DELIVERED</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {orderList.orders.data.orders.map((order) => (
                <Tr key={order._id}>
                  <Td>{order._id}</Td>
                  <Td>{order.user && order.user.name}</Td>
                  <Td>{order.createdAt.substring(0, 10)}</Td>
                  <Td>${order.totalPrice}</Td>
                  <Td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </Td>
                  <Td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </Td>
                  <Td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
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
    </>
  );
};

export default OrderListScreen;
