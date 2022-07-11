import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/loginActions";
import { userInfoDetailsActions } from "../reducers/loginDetailsReducer";
import { useToast } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
const LoginScreen = ({ location }) => {
  console.log("hi");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.loginDetail);
  const { loading, error, userInfo } = userLogin;
  console.log(userInfo);
  const history = useHistory();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const user = JSON.parse(localStorage.getItem("userInfo")); // from the local storage
  const toast = useToast();

  useEffect(() => {
    if (user && user.data) {
      dispatch(userInfoDetailsActions.success(user));
    }
    if (userInfo.data) {
      console.log("userInfo present");
      history.push(redirect);
    }
    if (error.payload) dispatch(userInfoDetailsActions.resetfail());
    console.log(error);
  }, [history, userInfo, user, error, redirect]);

  const submitHandler = (e) => {
    toast.closeAll();
    e.preventDefault();
    dispatch(login(email, password));
  };
  function callbackp(e) {
    toast.closeAll();
    setPassword(e.target.value);
  }
  function callbacke(e) {
    toast.closeAll();
    setEmail(e.target.value);
  }
  return (
    <>
      {error.payload &&
        toast({
          title: "Error",
          description: error.payload.body,
          status: "error",
          duration: 3000,
          isClosable: true,
        })}
      <FormContainer>
        <Text
          fontSize="3xl"
          fontFamily="heading"
          fontWeight="extrabold"
          textAlign={["centre", "left"]}
        >
          Sign In
        </Text>
        {/* {loading && <Loader />} */}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={callbacke}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={callbackp}
            ></Form.Control>
          </Form.Group>

          <Button m="5px" colorScheme="blue" variant="solid" type="submit">
            SignIn
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
