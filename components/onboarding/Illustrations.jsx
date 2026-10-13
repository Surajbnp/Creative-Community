"use client";

import { Avatar, Box, Button, Flex, HStack, Image, Tag, Text } from "@chakra-ui/react";
import { FiBookmark } from "react-icons/fi";
import Verified from "@/components/ui/Verified";
import { GigLogo } from "@/components/cards/GigCard";
import { CREATORS, GIGS, COMMUNITIES, pic } from "@/data/mock";

const card = {
  bg: "app.card",
  border: "1px solid",
  borderColor: "app.border",
  shadow: "0 14px 32px rgba(60,30,12,.18)",
};

/* 1. Hero — arch window with warm scene */
export function SlideHero() {
  return (
    <Box position="relative" h="100%" w="full" display="flex" justifyContent="center" alignItems="flex-end">
      <Box
        position="relative"
        w="86%"
        h="92%"
        roundedTop="999px"
        roundedBottom="2xl"
        overflow="hidden"
        bgGradient="linear(to-b, #F6C99B, #C97D45 55%, #5A2E17)"
        shadow="0 18px 40px rgba(60,30,12,.28)"
      >
        <Image
          src={pic("cozy-creator-desk", 700, 900)}
          alt=""
          w="full"
          h="full"
          objectFit="cover"
          opacity={0.55}
          mixBlendMode="multiply"
          filter="sepia(.8) saturate(1.3)"
          fallback={<Box />}
        />
        <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(40,20,10,.55), transparent 55%)" />
      </Box>
      <Box position="absolute" top="6%" right="2%" boxSize="70px" rounded="70% 0 70% 0" bg="app.brand" opacity={0.18} transform="rotate(20deg)" />
      <Box position="absolute" bottom="8%" left="-2%" boxSize="90px" rounded="70% 0 70% 0" bg="app.accent" opacity={0.22} transform="rotate(-25deg)" />
    </Box>
  );
}

/* 2. Creators — stacked, tilted cards */
export function SlideCreators() {
  const [a, b, c] = [CREATORS[0], CREATORS[2], CREATORS[1]];
  return (
    <Box position="relative" w="full" h="100%">
      <Box position="absolute" right="2%" top="12%" w="44%" p={3} rounded="2xl" transform="rotate(8deg)" {...card}>
        <Avatar src={c.avatar} name={c.name} size="lg" w="full" h="90px" rounded="xl" borderRadius="xl" />
        <Text mt={2} fontSize="xs" fontWeight={700}>
          {c.name}
        </Text>
        <Text fontSize="10px" color="app.muted">
          {c.role}
        </Text>
      </Box>
      <Box position="absolute" right="10%" top="2%" w="46%" p={3} rounded="2xl" transform="rotate(4deg)" {...card}>
        <Avatar src={b.avatar} name={b.name} w="full" h="90px" borderRadius="xl" />
        <Text mt={2} fontSize="xs" fontWeight={700}>
          {b.name}
        </Text>
        <Text fontSize="10px" color="app.muted">
          {b.role}
        </Text>
      </Box>
      <Box position="absolute" left="4%" top="6%" w="62%" p={3} rounded="3xl" transform="rotate(-6deg)" {...card}>
        <Image
          src={a.avatar}
          alt=""
          w="full"
          h={{ base: "170px", md: "210px" }}
          objectFit="cover"
          rounded="2xl"
          fallback={<Box h="170px" bg="app.cardAlt" rounded="2xl" />}
        />
        <Flex align="center" gap={1} mt={3}>
          <Text fontWeight={700} fontSize="sm">
            {a.name}
          </Text>
          <Verified boxSize={3.5} />
        </Flex>
        <Text fontSize="xs" color="app.muted">
          {a.role}
        </Text>
        <Button size="sm" variant="soft" w="full" mt={3} pointerEvents="none" tabIndex={-1}>
          Follow
        </Button>
      </Box>
    </Box>
  );
}

/* 3. Gigs — two gig cards */
export function SlideGigs() {
  return (
    <Flex direction="column" gap={4} w="full" justify="center" h="100%" px={1}>
      {[GIGS[0], GIGS[1]].map((g, i) => (
        <Box key={g.id} p={4} rounded="2xl" transform={`translateX(${i ? "14px" : "0"})`} {...card}>
          <Flex gap={3} align="flex-start">
            <GigLogo logo={g.logo} />
            <Box flex="1" minW={0}>
              <Text fontWeight={700} fontSize="sm">
                {g.title}
              </Text>
              <Text fontSize="xs" color="app.muted">
                {g.mode} · {g.type}
              </Text>
              <Text fontSize="sm" fontWeight={600} mt={1}>
                {g.pay}
              </Text>
            </Box>
            <FiBookmark />
          </Flex>
          <HStack mt={3} spacing={2}>
            {g.tags.map((t) => (
              <Tag key={t} size="sm">
                {t}
              </Tag>
            ))}
          </HStack>
        </Box>
      ))}
    </Flex>
  );
}

/* 4. Communities — three cards fan */
export function SlideCommunities() {
  const list = [COMMUNITIES[1], COMMUNITIES[0], COMMUNITIES[2]];
  return (
    <Flex w="full" h="100%" align="center" justify="center" position="relative">
      {list.map((c, i) => {
        const center = i === 1;
        return (
          <Box
            key={c.id}
            w={center ? "44%" : "36%"}
            mx={center ? "-4%" : 0}
            zIndex={center ? 2 : 1}
            p={2}
            rounded="2xl"
            transform={center ? "none" : `rotate(${i === 0 ? -5 : 5}deg) translateY(10px)`}
            {...card}
          >
            <Image src={c.cover} alt="" h={center ? "120px" : "92px"} w="full" objectFit="cover" rounded="xl" fallback={<Box h="92px" bg="app.cardAlt" rounded="xl" />} />
            <Text fontSize="xs" fontWeight={700} mt={2} noOfLines={1}>
              {c.name}
            </Text>
            <Text fontSize="10px" color="app.muted">
              {c.members} members
            </Text>
            <Button size="xs" w="full" mt={2} pointerEvents="none" tabIndex={-1} variant={center ? "brand" : "soft"}>
              Join
            </Button>
          </Box>
        );
      })}
    </Flex>
  );
}
