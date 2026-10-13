"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import CreatePostModal from "@/components/home/CreatePostModal";
import { useApp } from "@/context/AppContext";

export default function AppShell({ children }) {
  const router = useRouter();
  const { hydrated, onboarded, user } = useApp();

  // route guard: onboarding -> login -> app
  useEffect(() => {
    if (!hydrated) return;
    if (!onboarded) router.replace("/onboarding");
    else if (!user) router.replace("/login");
  }, [hydrated, onboarded, user, router]);

  const ready = hydrated && onboarded && !!user;


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

      {!ready && (
        <Center position="fixed" inset={0} zIndex={2000} bg="app.bg">
          <Spinner color="app.brand" thickness="3px" size="lg" />
        </Center>
      )}
    </Box>
  );
}
