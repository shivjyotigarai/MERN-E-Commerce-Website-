import React from "react";
import { Box } from "@chakra-ui/react";
import { Image, Badge } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Text, AspectRatio } from "@chakra-ui/react";
const Product = (props) => {
  return (
    <LinkBox>
      <Box
        maxW="sm"
        borderWidth="2px"
        borderRadius="lg"
        overflow="hidden"
        m={4}
      >
        <LinkOverlay href={`/product/${props.product._id}`}>
          <AspectRatio ratio={3 / 2}>
            <Image
              objectFit="cover"
              src={props.product.image}
              alt="Product"
              align="centre"
            />
          </AspectRatio>
        </LinkOverlay>

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="blue">
              {props.product.brand}
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {props.product.countInStock} Remaining
            </Box>
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {props.product.name}
          </Box>
          <Box mt="1" as="h4" lineHeight="tight">
            <Text color="gray.500" fontSize="sm" noOfLines={1} as="i">
              {props.product.description}
            </Text>
          </Box>

          <Box>
            {props.product.price}
            <Box as="span" color="gray.600" fontSize="sm">
              $
            </Box>
          </Box>

          <Box display="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < props.product.rating ? "blue.500" : "gray.300"}
                />
              ))}
            <Box as="span" ml="2" color="gray.800" fontSize="sm">
              {props.product.numReviews} reviews
            </Box>
          </Box>
        </Box>
      </Box>
    </LinkBox>
  );
};
export default Product;
