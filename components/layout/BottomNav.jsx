"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { FiBriefcase, FiCompass, FiHome, FiPlus, FiUser } from "react-icons/fi";
import { isActive } from "@/lib/nav";
import { useApp } from "@/context/AppContext";

const LEFT = [
  { label: "Home", href: "/", icon: FiHome },
  { label: "Discover", href: "/discover", icon: FiCompass },
];
const RIGHT = [
  { label: "Gigs", href: "/gigs", icon: FiBriefcase },
  { label: "Profile", href: "/profile", icon: FiUser },
];

function Item({ item, pathname }) {
  const active = isActive(pathname, item.href);
  return (
    <Flex
      as={NextLink}
      href={item.href}
      direction="column"
      align="center"
      justify="center"
      gap="2px"
      flex="1"
      h="full"
      color={active ? "app.brand" : "app.muted"}
      fontWeight={active ? 700 : 500}
      aria-current={active ? "page" : undefined}
    >
      <Icon as={item.icon} boxSize={5} />
      <Text fontSize="10px">{item.label}</Text>
    </Flex>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const { setCreateOpen } = useApp();

  return (
    <Flex
      as="nav"
      display={{ base: "flex", lg: "none" }}
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      h="64px"
      zIndex={30}
      bg="app.surface"
      borderTop="1px solid"
      borderColor="app.border"
      px={2}
      pb="env(safe-area-inset-bottom)"
      boxSizing="content-box"
      align="center"
    >
      {LEFT.map((i) => (
        <Item key={i.href} item={i} pathname={pathname} />
      ))}
      <Flex flex="1" justify="center" h="full" position="relative">
        <IconButton
          aria-label="Create"
          icon={<FiPlus size={24} />}
          onClick={() => setCreateOpen(true)}
          rounded="full"
          boxSize="52px"
          mt="-18px"
          shadow="0 6px 18px rgba(0,0,0,.28)"
          border="4px solid"
          borderColor="app.surface"
        />
      </Flex>
      {RIGHT.map((i) => (
        <Item key={i.href} item={i} pathname={pathname} />
      ))}
    </Flex>
  );
}
