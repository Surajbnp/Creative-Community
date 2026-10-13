"use client";

import { Avatar, Box, Button, Flex, Text, VStack, useToast } from "@chakra-ui/react";
import Verified from "@/components/ui/Verified";
import { useApp } from "@/context/AppContext";

function Ring({ children }) {
  return (
    <Box p="3px" rounded="full" bgGradient="linear(to-br, #E8B07A, #7B4527)">
      <Box p="2px" rounded="full" bg="app.card">
        {children}
      </Box>
    </Box>
  );
}

// layout="card" (vertical, featured grid) | "row" (lists)
export default function CreatorCard({ creator, layout = "card" }) {
  const { has, toggle } = useApp();
  const toast = useToast();
  const following = has("following", creator.id);

  const onFollow = () => {
    toggle("following", creator.id);
    if (!following) toast({ title: `Following ${creator.name}`, status: "success", duration: 1800, position: "bottom" });
  };

  const button = (
    <Button
      size="sm"
      variant={following ? "outlineApp" : "soft"}
      w={layout === "card" ? "full" : "auto"}
      minW="88px"
      onClick={onFollow}
      aria-pressed={following}
    >
      {following ? "Following" : "Follow"}
    </Button>
  );

  if (layout === "row") {
    return (
      <Flex align="center" gap={3} p={3} rounded="2xl" bg="app.card" border="1px solid" borderColor="app.border">
        <Avatar src={creator.avatar} name={creator.name} size="md" />
        <Box flex="1" minW={0}>
          <Flex align="center" gap={1}>
            <Text fontWeight={700} fontSize="sm" noOfLines={1}>
              {creator.name}
            </Text>
            {creator.verified && <Verified boxSize={3.5} />}
          </Flex>
          <Text fontSize="xs" color="app.muted" noOfLines={1}>
            {creator.role} · {creator.followers} followers
          </Text>
        </Box>
        {button}
      </Flex>
    );
  }

  return (
    <VStack
      spacing={2}
      p={{ base: 3, md: 4 }}
      rounded="2xl"
      bg="app.card"
      border="1px solid"
      borderColor="app.border"
      w="full"
      transition="transform .15s, box-shadow .15s"
      _hover={{ transform: "translateY(-2px)", shadow: "md" }}
    >
      <Ring>
        <Avatar src={creator.avatar} name={creator.name} boxSize={{ base: "64px", md: "76px" }} />
      </Ring>
      <Box textAlign="center" minW={0} w="full">
        <Flex align="center" justify="center" gap={1}>
          <Text fontWeight={700} fontSize="sm" noOfLines={1}>
            {creator.name}
          </Text>
          {creator.verified && <Verified boxSize={3.5} />}
        </Flex>
        <Text fontSize="xs" color="app.muted" noOfLines={1}>
          {creator.role}
        </Text>
      </Box>
      {button}
    </VStack>
  );
}
