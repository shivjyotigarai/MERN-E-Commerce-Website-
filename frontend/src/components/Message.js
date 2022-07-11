import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const Message = ({ status, children }) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  status: "info",
};

export default Message;
