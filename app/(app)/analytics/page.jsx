"use client";

import { Box, Flex, Grid, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import SectionHeader from "@/components/ui/SectionHeader";
import { ANALYTICS } from "@/data/mock";

const panel = { p: 5, rounded: "2xl", bg: "app.card", border: "1px solid", borderColor: "app.border" };

export default function AnalyticsPage() {
  const max = Math.max(...ANALYTICS.weekly.map((w) => w.v));

  return (
    <Box>
      <Heading as="h1" fontFamily="heading" fontWeight={500} fontSize="3xl" mb={5} display={{ base: "none", lg: "block" }}>
        Analytics
      </Heading>

      <SimpleGrid columns={{ base: 2, xl: 4 }} spacing={4}>
        {ANALYTICS.stats.map((s) => (
          <Box key={s.label} {...panel} p={4}>
            <Text fontSize="xs" color="app.muted">
              {s.label}
            </Text>
            <Text fontWeight={800} fontSize={{ base: "xl", md: "2xl" }} mt={1}>
              {s.value}
            </Text>
            <Text fontSize="xs" color="green.500" fontWeight={600}>
              {s.delta} this week
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      <Grid templateColumns={{ base: "1fr", xl: "1.4fr 1fr" }} gap={4} mt={4}>
        <Box {...panel}>
          <SectionHeader title="Profile views" subtitle="Last 7 days" size="sm" />
          <Flex h="190px" align="flex-end" gap={{ base: 2, md: 4 }} pt={4}>
            {ANALYTICS.weekly.map((w) => (
              <Flex key={w.d} direction="column" align="center" flex="1" h="full" justify="flex-end" gap={2}>
                <Text fontSize="xs" color="app.muted">
                  {w.v}
                </Text>
                <Box
                  w="full"
                  maxW="44px"
                  rounded="lg"
                  bgGradient="linear(to-t, app.brand, app.accent)"
                  h={`${(w.v / max) * 100}%`}
                  minH="8px"
                  transition="height .4s"
                />
                <Text fontSize="xs" color="app.muted">
                  {w.d}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Box>

        <Box {...panel}>
          <SectionHeader title="Top posts" size="sm" />
          <VStack align="stretch" spacing={3} divider={<Box borderBottom="1px solid" borderColor="app.border" />}>
            {ANALYTICS.topPosts.map((p, i) => (
              <Flex key={p.id} gap={3} align="center">
                <Text fontFamily="heading" fontSize="2xl" color="app.accent" w="24px">
                  {i + 1}
                </Text>
                <Box flex="1" minW={0}>
                  <Text fontSize="sm" fontWeight={600} noOfLines={1}>
                    {p.title}
                  </Text>
                  <Text fontSize="xs" color="app.muted">
                    {p.views} views · {p.likes} likes
                  </Text>
                </Box>
              </Flex>
            ))}
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
}
