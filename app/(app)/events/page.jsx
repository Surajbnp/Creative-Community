"use client";

import { Box, Button, Flex, Heading, Image, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import { FiClock, FiUsers } from "react-icons/fi";
import { EVENTS } from "@/data/mock";
import { useApp } from "@/context/AppContext";

function EventCard({ event }) {
  const { has, toggle } = useApp();
  const toast = useToast();
  const going = has("rsvp", event.id);

  return (
    <Box rounded="2xl" overflow="hidden" bg="app.card" border="1px solid" borderColor="app.border" transition="box-shadow .15s" _hover={{ shadow: "md" }}>
      <Box position="relative">
        <Image src={event.cover} alt="" w="full" h="140px" objectFit="cover" fallback={<Box h="140px" bg="app.cardAlt" />} />
        <Flex
          position="absolute"
          top={3}
          left={3}
          direction="column"
          align="center"
          bg="app.card"
          rounded="xl"
          px={3}
          py={1.5}
          lineHeight="1.1"
          shadow="md"
        >
          <Text fontWeight={800} fontSize="lg">
            {event.day}
          </Text>
          <Text fontSize="10px" textTransform="uppercase" color="app.muted" letterSpacing="wider">
            {event.month}
          </Text>
        </Flex>
      </Box>
      <Box p={4}>
        <Text fontWeight={700}>{event.title}</Text>
        <Text fontSize="xs" color="app.muted" mt={0.5}>
          Hosted by {event.host} · {event.mode}
        </Text>
        <Flex gap={4} mt={3} fontSize="xs" color="app.muted">
          <Flex align="center" gap={1}>
            <FiClock /> {event.time}
          </Flex>
          <Flex align="center" gap={1}>
            <FiUsers /> {event.attendees + (going ? 1 : 0)} going
          </Flex>
        </Flex>
        <Button
          mt={4}
          w="full"
          size="sm"
          variant={going ? "outlineApp" : "brand"}
          onClick={() => {
            toggle("rsvp", event.id);
            if (!going) toast({ title: "You're going!", description: event.title, status: "success", duration: 2000 });
          }}
        >
          {going ? "Going ✓" : "RSVP"}
        </Button>
      </Box>
    </Box>
  );
}

export default function EventsPage() {
  return (
    <Box>
      <Heading as="h1" fontFamily="heading" fontWeight={500} fontSize="3xl" display={{ base: "none", lg: "block" }}>
        Events
      </Heading>
      <Text color="app.muted" fontSize="sm" mt={1} mb={5} display={{ base: "none", lg: "block" }}>
        Meetups, workshops and jams from the community.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4}>
        {EVENTS.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
