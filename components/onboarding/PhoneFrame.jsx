"use client";

import { useEffect } from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

export default function PhoneFrame({ children }) {
  const backdrop = useColorModeValue("#2A1A11", "#0C0806");
  const bg = useColorModeValue(
    "linear-gradient(180deg,#FBEBDA 0%,#F8DFC8 100%)",
    "linear-gradient(180deg,#2A1B13 0%,#150E0A 100%)",
  );

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = [
      html.style.overflow,
      body.style.overflow,
      body.style.overscrollBehavior,
    ];
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    return () => {
      html.style.overflow = prev[0];
      body.style.overflow = prev[1];
      body.style.overscrollBehavior = prev[2];
    };
  }, []);

  return (
    <Flex
      position={{ base: "fixed", md: "static" }}
      inset={{ base: 0, md: "auto" }}
      minH={{ base: "auto", md: "100dvh" }}
      w="full"
      align="center"
      justify="center"
      overflow="hidden"
      bg={{ base: "transparent", md: backdrop }}
      p={{ base: 0, md: 6 }}
    >
      <Box
        position="relative"
        w="full"
        minW={0}
        maxW={{ base: "full", md: "720px" }}
        h={{ base: "100%", md: "min(860px, calc(100dvh - 48px))" }}
        rounded={{ base: 0, md: "36px" }}
        overflow="hidden"
        border={{ base: "none", md: "1px solid" }}
        borderColor="app.border"
        shadow={{ base: "none", md: "0 30px 80px rgba(0,0,0,.45)" }}
        sx={{ background: bg }}
      >
        <Box
          h="full"
          w="full"
          sx={{
            paddingTop: "env(safe-area-inset-top, 0px)",
            paddingBottom: "calc(env(safe-area-inset-bottom, 0px) * 0.5)",
          }}
        >
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
