"use client";

import { useState } from "react";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { PillTabs } from "@/components/ui/Tabs";
import ProjectCard from "@/components/cards/ProjectCard";
import EmptyState from "@/components/ui/EmptyState";
import { PROJECTS } from "@/data/mock";
import { useApp } from "@/context/AppContext";

export default function ProjectsPage() {
  const { has } = useApp();
  const [filter, setFilter] = useState("all");

  const list = PROJECTS.filter((p) => {
    if (filter === "open") return p.status === "Open";
    if (filter === "mine") return has("joined", p.id);
    return true;
  });

  return (
    <Box>
      <Heading as="h1" fontFamily="heading" fontWeight={500} fontSize={{ base: "2xl", md: "3xl" }} display={{ base: "none", lg: "block" }}>
        Projects
      </Heading>
      <Text color="app.muted" fontSize="sm" mt={1} mb={5} display={{ base: "none", lg: "block" }}>
        Join collaborations or find teammates for your own.
      </Text>

      <PillTabs
        tabs={[
          { value: "all", label: "All" },
          { value: "open", label: "Open" },
          { value: "mine", label: "Joined" },
        ]}
        value={filter}
        onChange={setFilter}
        mb={5}
      />

      {list.length === 0 ? (
        <EmptyState title="No projects here" hint="Join one to see it under Joined." />
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4}>
          {list.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
