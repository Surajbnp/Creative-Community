"use client";

import { Box, Button, HStack } from "@chakra-ui/react";

// Rounded pill tabs (Discover / Gigs filters)
export function PillTabs({ tabs, value, onChange, ...rest }) {
  return (
    <HStack spacing={2} overflowX="auto" className="hide-scroll" {...rest}>
      {tabs.map((t) => (
        <Button
          key={t.value}
          size="sm"
          px={5}
          flexShrink={0}
          variant={t.value === value ? "brand" : "soft"}
          onClick={() => onChange(t.value)}
        >
          {t.label}
        </Button>
      ))}
    </HStack>
  );
}

// Underlined tabs (For You / Following / Trending)
export function UnderlineTabs({ tabs, value, onChange, ...rest }) {
  return (
    <HStack
      spacing={{ base: 6, md: 8 }}
      borderBottom="1px solid"
      borderColor="app.border"
      overflowX="auto"
      className="hide-scroll"
      {...rest}
    >
      {tabs.map((t) => {
        const active = t.value === value;
        return (
          <Box
            as="button"
            key={t.value}
            onClick={() => onChange(t.value)}
            pb={3}
            pt={1}
            fontSize="sm"
            fontWeight={active ? 700 : 500}
            color={active ? "app.text" : "app.muted"}
            borderBottom="2px solid"
            borderColor={active ? "app.brand" : "transparent"}
            mb="-1px"
            transition="all .15s"
            _hover={{ color: "app.text" }}
          >
            {t.label}
          </Box>
        );
      })}
    </HStack>
  );
}
