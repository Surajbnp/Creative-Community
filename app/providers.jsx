"use client";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import { AppProvider } from "@/context/AppContext";

export default function Providers({ children }) {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>{children}</AppProvider>
    </ChakraProvider>
  );
}
