"use client";

import { Box, Text } from "@chakra-ui/react";

export default function Logo({ size = 30, ...rest }) {
  return (
    <Box
      position="relative"
      display="inline-block"
      lineHeight="1"
      userSelect="none"
      pt={`${size * 0.28}px`}
      {...rest}
    >
      <Box
        as="svg"
        viewBox="0 0 100 20"
        position="absolute"
        top="0"
        left="50%"
        transform="translateX(-50%)"
        w="62%"
        h={`${size * 0.34}px`}
        fill="none"
        stroke="var(--chakra-colors-app-accent)"
        strokeWidth="3"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M4 18 Q50 -8 96 18" />
      </Box>
      <Text
        fontFamily="heading"
        fontWeight={500}
        fontSize={`${size}px`}
        letterSpacing="0.06em"
        color="app.brand"
      >
        ZURA
      </Text>
    </Box>
  );
}
