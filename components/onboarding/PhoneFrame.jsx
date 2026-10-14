"use client";

import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

export default function PhoneFrame({ children }) {
  const backdrop = useColorModeValue("#2A1A11", "#0C0806");
  const bg = useColorModeValue(
    "linear-gradient(180deg,#FBEBDA 0%,#F8DFC8 100%)",
    "linear-gradient(180deg,#2A1B13 0%,#150E0A 100%)"
  );

  return (
    <Flex minH="100dvh" align="center" justify="center" bg={{ base: "transparent", md: backdrop }} p={{ base: 0, md: 6 }}>
      <Box
        position="relative"
        w="full"
        maxW={{ base: "full", md: "720px" }}
        h={{ base: "100dvh", md: "min(860px, calc(100dvh - 48px))" }}
        rounded={{ base: 0, md: "36px" }}
        overflow="hidden"
        border={{ base: "none", md: "1px solid" }}
        borderColor="app.border"
        shadow={{ base: "none", md: "0 30px 80px rgba(0,0,0,.45)" }}
        sx={{ background: bg }}
      >
        {children}
      </Box>
    </Flex>
  );
}
