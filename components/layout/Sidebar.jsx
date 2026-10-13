"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, Box, Button, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import Verified from "@/components/ui/Verified";
import ProCard from "@/components/cards/ProCard";
import { NAV, isActive } from "@/lib/nav";
import { useApp } from "@/context/AppContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, conversations, setCreateOpen } = useApp();
  const unread = conversations.reduce((n, c) => n + c.unread, 0);

  return (
    <Box
      as="aside"
      display={{ base: "none", lg: "block" }}
      w="240px"
      flexShrink={0}
      position="sticky"
      top="92px"
      alignSelf="flex-start"
      maxH="calc(100dvh - 108px)"
      overflowY="auto"
      className="hide-scroll"
      pb={4}
    >
      <Flex
        as={NextLink}
        href="/profile"
        align="center"
        gap={3}
        p={3}
        mb={4}
        rounded="2xl"
        bg="app.surface"
        border="1px solid"
        borderColor="app.border"
        _hover={{ borderColor: "app.muted" }}
        transition="border-color .15s"
      >
        <Avatar src={user?.avatar} name={user?.name} size="md" />
        <Box minW={0}>
          <Flex align="center" gap={1}>
            <Text fontWeight={700} noOfLines={1}>
              {user?.name}
            </Text>
            {user?.verified && <Verified boxSize={4} />}
          </Flex>
          <Text fontSize="xs" color="app.muted" noOfLines={1}>
            {user?.role}
          </Text>
        </Box>
      </Flex>

      <VStack as="nav" align="stretch" spacing={1}>
        {NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Flex
              as={NextLink}
              href={item.href}
              key={item.href}
              align="center"
              gap={3}
              px={4}
              h="44px"
              rounded="xl"
              fontWeight={active ? 700 : 500}
              fontSize="sm"
              bg={active ? "app.brand" : "transparent"}
              color={active ? "app.brandText" : "app.text"}
              _hover={{ bg: active ? "app.brand" : "app.cardAlt" }}
              transition="background .15s"
              aria-current={active ? "page" : undefined}
            >
              <Icon as={item.icon} boxSize={5} />
              <Text flex="1">{item.label}</Text>
              {item.label === "Messages" && unread > 0 && (
                <Box boxSize="8px" rounded="full" bg="app.accent" />
              )}
            </Flex>
          );
        })}
      </VStack>

      <Button
        mt={5}
        w="full"
        h="46px"
        leftIcon={<FiPlus />}
        onClick={() => setCreateOpen(true)}
      >
        Create
      </Button>

      <Box mt={5}>
        <ProCard />
      </Box>
    </Box>
  );
}
