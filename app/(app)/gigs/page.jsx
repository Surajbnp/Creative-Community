"use client";

import { useMemo, useState } from "react";
import { Box, Heading, Input, InputGroup, InputLeftElement, Select, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { PillTabs } from "@/components/ui/Tabs";
import GigCard from "@/components/cards/GigCard";
import EmptyState from "@/components/ui/EmptyState";
import { GIGS } from "@/data/mock";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "Remote", label: "Remote" },
  { value: "On-site", label: "On-site" },
];

export default function GigsPage() {
  const [q, setQ] = useState("");
  const [mode, setMode] = useState("all");
  const [type, setType] = useState("all");

  const list = useMemo(
    () =>
      GIGS.filter((g) => {
        if (mode !== "all" && g.mode !== mode) return false;
        if (type !== "all" && g.type !== type) return false;
        const text = `${g.title} ${g.company} ${g.tags.join(" ")}`.toLowerCase();
        return !q || text.includes(q.toLowerCase());
      }),
    [q, mode, type]
  );

  return (
    <Box>
      <Heading as="h1" fontFamily="heading" fontWeight={500} fontSize={{ base: "2xl", md: "3xl" }} display={{ base: "none", lg: "block" }}>
        Gigs
      </Heading>
      <Text color="app.muted" fontSize="sm" mt={1} mb={5} display={{ base: "none", lg: "block" }}>
        Opportunities from top creators and brands.
      </Text>

      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none" h="full" color="app.muted">
          <FiSearch />
        </InputLeftElement>
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search gigs…" rounded="full" h="46px" bg="app.card" />
      </InputGroup>

      <Flex gap={3} mb={5} align="center" justify="space-between" flexWrap="wrap">
        <PillTabs tabs={FILTERS} value={mode} onChange={setMode} />
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          w="auto"
          size="sm"
          rounded="full"
          bg="app.cardAlt"
          borderColor="app.border"
          aria-label="Filter by job type"
        >
          <option value="all">All types</option>
          <option>Freelance</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Full-time</option>
        </Select>
      </Flex>

      {list.length === 0 ? (
        <EmptyState title="No gigs match" hint="Adjust your filters or search." />
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4}>
          {list.map((g) => (
            <GigCard key={g.id} gig={g} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
