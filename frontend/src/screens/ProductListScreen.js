import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";
import { loginViaToken } from "../actions/loginActions";
import { createProduct } from "../actions/productActions";
import { productCreateDetailsActions } from "../reducers/productCreateReducer";
import { Flex, Spacer, Box, Button, ButtonGroup } from "@chakra-ui/react";
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
const ProductListScreen = ({ history, match }) => {
  const pageNumber = 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCreate = useSelector((state) => state.productCreateDetails);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.loginDetail);
  const user = JSON.parse(localStorage.getItem("userInfo")); // from the local storage
  const token = user ? user.token : "";

  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
    dispatch(loginViaToken(token));
  }, [dispatch]);

  useEffect(() => {
    if (successCreate) {
      dispatch(productCreateDetailsActions.reset());
      const id = createdProduct._id;
      history.push(`/admin/product/${id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, successCreate, productCreate]);

  const createProductHandler = () => {
    dispatch(createProduct(token));
  };

  return (
    <>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading size="md">Products</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <Button
            colorScheme="blue"
            onClick={createProductHandler}
            margin="4px"
          >
            Create New Product +
          </Button>
        </ButtonGroup>
      </Flex>
      <Divider />
      {loadingCreate && <Loader />}
      {/* {errorCreate && <Message variant="danger">{errorCreate}</Message>} */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <TableContainer>
            <Table variant="striped" colorScheme="blue" size="sm">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>NAME</Th>
                  <Th>PRICE</Th>
                  <Th>CATEGORY</Th>
                  <Th>BRAND</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product) => (
                  <Tr key={product._id}>
                    <Td>{product._id}</Td>
                    <Td>{product.name}</Td>
                    <Td>${product.price}</Td>
                    <Td>{product.category}</Td>
                    <Td>{product.brand}</Td>
                    <Td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
