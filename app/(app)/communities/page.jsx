"use client";

import { useMemo, useState } from "react";
import { Box, Heading, Input, InputGroup, InputLeftElement, SimpleGrid, Text } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { PillTabs } from "@/components/ui/Tabs";
import CommunityCard from "@/components/cards/CommunityCard";
import EmptyState from "@/components/ui/EmptyState";
import { COMMUNITIES } from "@/data/mock";
import { useApp } from "@/context/AppContext";

export default function CommunitiesPage() {
  const { has } = useApp();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");

  const list = useMemo(
    () =>
      COMMUNITIES.filter((c) => {
        const text = `${c.name} ${c.tags.join(" ")} ${c.description}`.toLowerCase();
        if (q && !text.includes(q.toLowerCase())) return false;
        if (filter === "joined" && !has("joined", c.id)) return false;
        return true;
      }),
    [q, filter, has]
  );

  return (
    <Box>
      <Heading as="h1" fontFamily="heading" fontWeight={500} fontSize={{ base: "2xl", md: "3xl" }} display={{ base: "none", lg: "block" }}>
        Communities
      </Heading>
      <Text color="app.muted" fontSize="sm" mt={1} mb={5} display={{ base: "none", lg: "block" }}>
        Find your people. Share ideas, learn and grow together.
      </Text>

      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none" h="full" color="app.muted">
          <FiSearch />
        </InputLeftElement>
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search communities…" rounded="full" h="46px" bg="app.card" />
      </InputGroup>

      <PillTabs
        tabs={[
          { value: "all", label: "All" },
          { value: "joined", label: "Joined" },
        ]}
        value={filter}
        onChange={setFilter}
        mb={5}
      />

      {list.length === 0 ? (
        <EmptyState title="No communities found" hint={filter === "joined" ? "Join a community to see it here." : "Try another search."} />
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, xl: 3 }} spacing={4}>
          {list.map((c) => (
            <CommunityCard key={c.id} community={c} variant="cover" />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
