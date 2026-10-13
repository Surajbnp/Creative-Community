"use client";

import { Box, VStack } from "@chakra-ui/react";
import SectionHeader from "@/components/ui/SectionHeader";
import GigCard from "@/components/cards/GigCard";
import CommunityCard from "@/components/cards/CommunityCard";
import QuoteCard from "@/components/cards/QuoteCard";
import { COMMUNITIES, GIGS } from "@/data/mock";

export default function RightRail() {
  return (
    <VStack align="stretch" spacing={5} as="aside">
      <Box p={4} rounded="2xl" bg="app.surface" border="1px solid" borderColor="app.border">
        <SectionHeader title="Find Your Next Gig" subtitle="Opportunities from top creators and brands" href="/gigs" />
        <VStack align="stretch" spacing={3}>
          {GIGS.slice(0, 2).map((g) => (
            <GigCard key={g.id} gig={g} compact />
          ))}
        </VStack>
      </Box>

      <Box p={4} rounded="2xl" bg="app.surface" border="1px solid" borderColor="app.border">
        <SectionHeader title="Recommended Communities" href="/communities" />
        <VStack align="stretch" spacing={3}>
          {COMMUNITIES.slice(0, 3).map((c) => (
            <CommunityCard key={c.id} community={c} />
          ))}
        </VStack>
      </Box>

      <QuoteCard />
    </VStack>
  );
}
