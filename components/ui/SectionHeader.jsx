"use client";

import { Flex, Heading, Link as CLink, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function SectionHeader({ title, subtitle, href, onSeeAll, size = "md", mb = 3 }) {
  return (
    <Flex align="baseline" justify="space-between" mb={mb} gap={3}>
      <Flex direction="column">
        <Heading
          as="h2"
          fontFamily="body"
          fontWeight={700}
          fontSize={size === "md" ? { base: "md", md: "lg" } : "md"}
          color="app.text"
        >
          {title}
        </Heading>
        {subtitle && (
          <Text fontSize="xs" color="app.muted">
            {subtitle}
          </Text>
        )}
      </Flex>
      {(href || onSeeAll) && (
        <CLink
          as={href ? NextLink : "button"}
          href={href}
          onClick={onSeeAll}
          fontSize="sm"
          fontWeight={500}
          color="app.muted"
          _hover={{ color: "app.brand", textDecoration: "none" }}
          flexShrink={0}
        >
          See all
        </CLink>
      )}
    </Flex>
  );
}
