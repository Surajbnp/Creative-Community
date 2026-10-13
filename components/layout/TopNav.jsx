"use client";

import { useState } from "react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { FiBell, FiChevronLeft, FiLogOut, FiMoon, FiSearch, FiSun, FiUser } from "react-icons/fi";
import Logo from "@/components/ui/Logo";
import { PAGE_TITLES, TOP_LINKS, isActive } from "@/lib/nav";
import { useApp } from "@/context/AppContext";

function Notifications() {
  const { notifications, markNotificationsRead } = useApp();
  const unread = notifications.filter((n) => !n.read).length;
  return (
    <Popover placement="bottom-end" onOpen={markNotificationsRead} isLazy>
      <PopoverTrigger>
        <Box position="relative">
          <IconButton
            aria-label="Notifications"
            icon={<FiBell size={20} />}
            variant="ghostApp"
            rounded="full"
          />
          {unread > 0 && (
            <Box
              position="absolute"
              top="6px"
              right="6px"
              boxSize="9px"
              rounded="full"
              bg="app.accent"
              border="2px solid"
              borderColor="app.bg"
              pointerEvents="none"
            />
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent w={{ base: "92vw", sm: "340px" }}>
        <PopoverHeader fontWeight={700} borderColor="app.border">
          Notifications
        </PopoverHeader>
        <PopoverBody p={0} maxH="360px" overflowY="auto">
          <VStack align="stretch" spacing={0} divider={<Box borderBottom="1px solid" borderColor="app.border" />}>
            {notifications.map((n) => (
              <Flex key={n.id} px={4} py={3} gap={3} align="start" opacity={n.read ? 0.75 : 1}>
                <Box boxSize="8px" mt="7px" rounded="full" bg={n.read ? "transparent" : "app.accent"} flexShrink={0} />
                <Box>
                  <Text fontSize="sm">{n.text}</Text>
                  <Text fontSize="xs" color="app.muted">
                    {n.time} ago
                  </Text>
                </Box>
              </Flex>
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

function UserMenu() {
  const router = useRouter();
  const { user, logout } = useApp();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Menu placement="bottom-end">
      <MenuButton rounded="full" aria-label="Account menu">
        <Avatar size="sm" src={user?.avatar} name={user?.name} />
      </MenuButton>
      <MenuList minW="200px" zIndex={20}>
        <Box px={3} pb={2}>
          <Text fontWeight={700}>{user?.name}</Text>
          <Text fontSize="xs" color="app.muted">
            @{user?.handle}
          </Text>
        </Box>
        <MenuDivider borderColor="app.border" />
        <MenuItem icon={<FiUser />} onClick={() => router.push("/profile")}>
          Profile
        </MenuItem>
        <MenuItem
          icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? "Dark mode" : "Light mode"}
        </MenuItem>
        <MenuItem
          icon={<FiLogOut />}
          onClick={() => {
            logout();
            router.replace("/login");
          }}
        >
          Log out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const [q, setQ] = useState("");

  const submit = (e) => {
    e.preventDefault();
    router.push(q.trim() ? `/discover?q=${encodeURIComponent(q.trim())}` : "/discover");
  };

  const isHome = pathname === "/";
  const title = PAGE_TITLES[pathname] || PAGE_TITLES["/" + pathname.split("/")[1]] || "";

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={30}
      bg="app.bg"
      borderBottom="1px solid"
      borderColor={{ base: "transparent", lg: "app.border" }}
      backdropFilter="blur(10px)"
    >
      {/* Desktop */}
      <Flex
        display={{ base: "none", lg: "flex" }}
        maxW="1560px"
        mx="auto"
        px={6}
        h="76px"
        align="center"
        gap={8}
      >
        <NextLink href="/" aria-label="Zura home">
          <Logo size={34} />
        </NextLink>

        <HStack as="nav" spacing={{ base: 5, xl: 8 }} ml={2}>
          {TOP_LINKS.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Box
                as={NextLink}
                href={l.href}
                key={l.href}
                fontWeight={active ? 700 : 500}
                fontSize="sm"
                color={active ? "app.brand" : "app.text"}
                position="relative"
                py={1}
                _hover={{ color: "app.brand" }}
                _after={
                  active
                    ? { content: '""', position: "absolute", left: 0, right: 0, bottom: "-6px", h: "2px", bg: "app.brand", rounded: "full" }
                    : undefined
                }
              >
                {l.label}
              </Box>
            );
          })}
        </HStack>

        <Box as="form" onSubmit={submit} flex="1" maxW="460px" ml="auto">
          <InputGroup>
            <InputLeftElement pointerEvents="none" h="full" color="app.muted">
              <FiSearch />
            </InputLeftElement>
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search creators, gigs, or communities…"
              rounded="full"
              h="44px"
              bg="app.card"
              fontSize="sm"
            />
          </InputGroup>
        </Box>

        <HStack spacing={2}>
          <IconButton
            aria-label="Toggle color mode"
            onClick={toggleColorMode}
            rounded="full"
            variant="soft"
            icon={colorMode === "light" ? <FiSun size={18} /> : <FiMoon size={18} />}
            color={colorMode === "light" ? "app.accent" : "app.brand"}
          />
          <Notifications />
          <UserMenu />
        </HStack>
      </Flex>

      {/* Mobile / tablet */}
      <Flex display={{ base: "flex", lg: "none" }} px={4} h="60px" align="center" justify="space-between" gap={2}>
        <Flex flex="1" align="center" minW={0}>
          {isHome ? (
            <Logo size={26} />
          ) : (
            <IconButton
              aria-label="Back"
              icon={<FiChevronLeft size={22} />}
              variant="ghostApp"
              rounded="full"
              onClick={() => router.back()}
              ml={-2}
            />
          )}
        </Flex>
        {!isHome && (
          <Heading as="h1" fontFamily="body" fontSize="md" fontWeight={700} noOfLines={1}>
            {title}
          </Heading>
        )}
        <HStack flex="1" justify="flex-end" spacing={1}>
          <Notifications />
          <UserMenu />
        </HStack>
      </Flex>
    </Box>
  );
}
