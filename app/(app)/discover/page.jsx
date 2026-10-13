"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Input, InputGroup, InputLeftElement, SimpleGrid } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { PillTabs } from "@/components/ui/Tabs";
import EmptyState from "@/components/ui/EmptyState";
import CreatorCard from "@/components/cards/CreatorCard";
import CommunityCard from "@/components/cards/CommunityCard";
import GigCard from "@/components/cards/GigCard";
import ProjectCard from "@/components/cards/ProjectCard";
import { COMMUNITIES, CREATORS, GIGS, PROJECTS } from "@/data/mock";

const TABS = [
  { value: "people", label: "People" },
  { value: "communities", label: "Communities" },
  { value: "gigs", label: "Gigs" },
  { value: "projects", label: "Projects" },
];

const match = (q, ...fields) => !q || fields.join(" ").toLowerCase().includes(q.toLowerCase());

function DiscoverInner() {
  const params = useSearchParams();
  const [tab, setTab] = useState("people");
  const [q, setQ] = useState(params.get("q") || "");

  useEffect(() => {
    setQ(params.get("q") || "");
  }, [params]);

  const results = useMemo(
    () => ({
      people: CREATORS.filter((c) => match(q, c.name, c.role, c.handle)),
      communities: COMMUNITIES.filter((c) => match(q, c.name, c.tags.join(" "), c.description)),
      gigs: GIGS.filter((g) => match(q, g.title, g.company, g.tags.join(" "))),
      projects: PROJECTS.filter((p) => match(q, p.title, p.tags.join(" "), p.description)),
    }),
    [q]
  );

  const list = results[tab];

  return (
    <Box>
      <InputGroup mb={4} display={{ base: "block", lg: "block" }}>
        <InputLeftElement pointerEvents="none" h="full" color="app.muted">
          <FiSearch />
        </InputLeftElement>
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search people, communities, gigs…" rounded="full" h="46px" bg="app.card" />
      </InputGroup>

      <PillTabs
        tabs={TABS.map((t) => ({ ...t, label: `${t.label} (${results[t.value].length})` }))}
        value={tab}
        onChange={setTab}
        mb={5}
      />

      {list.length === 0 ? (
        <EmptyState title="No results" hint="Try a different keyword." icon={FiSearch} />
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4}>
          {tab === "people" && list.map((c) => <CreatorCard key={c.id} creator={c} layout="row" />)}
          {tab === "communities" && list.map((c) => <CommunityCard key={c.id} community={c} variant="cover" />)}
          {tab === "gigs" && list.map((g) => <GigCard key={g.id} gig={g} />)}
          {tab === "projects" && list.map((p) => <ProjectCard key={p.id} project={p} />)}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={null}>
      <DiscoverInner />
    </Suspense>
  );
}
