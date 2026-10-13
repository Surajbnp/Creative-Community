"use client";

import { Box, Flex } from "@chakra-ui/react";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import CreatePostModal from "@/components/home/CreatePostModal";

export default function AppShell({ children }) {
  return (
    <Box minH="100dvh" bg="app.bg">
      <TopNav />
      <Flex
        maxW="1560px"
        mx="auto"
        px={{ base: 4, md: 6 }}
        pt={{ base: 1, lg: 5 }}
        pb={{ base: "96px", lg: 10 }}
        gap={6}
        align="flex-start"
      >
        <Sidebar />
        <Box as="main" flex="1" minW={0}>
          {children}
        </Box>
      </Flex>
      <BottomNav />
      <CreatePostModal />
    </Box>
  );
}