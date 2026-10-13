"use client";

import { Box, Button, Flex, HStack, Image, Tag, Text, useToast } from "@chakra-ui/react";
import { useApp } from "@/context/AppContext";

// variant="compact" (rail rows) | "cover" (grid cards)
export default function CommunityCard({ community, variant = "compact" }) {
  const { has, toggle } = useApp();
  const toast = useToast();
  const joined = has("joined", community.id);

  const onJoin = () => {
    toggle("joined", community.id);
    if (!joined)
      toast({ title: `Joined ${community.name}`, status: "success", duration: 1800, position: "bottom" });
  };

  const button = (
    <Button size="sm" variant={joined ? "outlineApp" : "soft"} px={5} onClick={onJoin} aria-pressed={joined}>
      {joined ? "Joined" : "Join"}
    </Button>
  );

  if (variant === "compact") {
    return (
      <Flex gap={3} p={3} rounded="2xl" bg="app.card" border="1px solid" borderColor="app.border" align="center">
        <Image
          src={community.cover}
          alt=""
          boxSize="56px"
          rounded="xl"
          objectFit="cover"
          fallback={<Box boxSize="56px" rounded="xl" bg="app.cardAlt" />}
        />
        <Box flex="1" minW={0}>
          <Text fontWeight={700} fontSize="sm" noOfLines={1}>
            {community.name}
          </Text>
          <Text fontSize="xs" color="app.muted" noOfLines={1}>
            {community.members} members · {community.tags.join(", ")}
          </Text>
        </Box>
        {button}
      </Flex>
    );
  }

  return (
    <Box
      rounded="2xl"
      overflow="hidden"
      bg="app.card"
      border="1px solid"
      borderColor="app.border"
      transition="transform .15s, box-shadow .15s"
      _hover={{ transform: "translateY(-2px)", shadow: "md" }}
    >
      <Image
        src={community.cover}
        alt=""
        w="full"
        h={{ base: "120px", md: "140px" }}
        objectFit="cover"
        fallback={<Box h="140px" bg="app.cardAlt" />}
      />
      <Box p={4}>
        <Text fontWeight={700}>{community.name}</Text>
        <Text fontSize="xs" color="app.muted" mt={0.5}>
          {community.members} members
        </Text>
        <Text fontSize="sm" color="app.muted" mt={2} noOfLines={2} minH="40px">
          {community.description}
        </Text>
        <Flex mt={3} justify="space-between" align="center" gap={2}>
          <HStack spacing={1.5}>
            {community.tags.map((t) => (
              <Tag key={t} size="sm">
                {t}
              </Tag>
            ))}
          </HStack>
          {button}
        </Flex>
      </Box>
    </Box>
  );
}
