"use client";

import { useState } from "react";
import { Box, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { FiBookmark } from "react-icons/fi";
import { PillTabs } from "@/components/ui/Tabs";
import EmptyState from "@/components/ui/EmptyState";
import PostCard from "@/components/cards/PostCard";
import GigCard from "@/components/cards/GigCard";
import { GIGS } from "@/data/mock";
import { useApp } from "@/context/AppContext";

export default function BookmarksPage() {
  const { posts, has } = useApp();
  const [tab, setTab] = useState("posts");

  const savedPosts = posts.filter((p) => has("saved", p.id));
  const savedGigs = GIGS.filter((g) => has("saved", g.id));

  return (
    <Box>
      <Heading as="h1" fontFamily="heading" fontWeight={500} fontSize="3xl" mb={5} display={{ base: "none", lg: "block" }}>
        Bookmarks
      </Heading>
      <PillTabs
        tabs={[
          { value: "posts", label: `Posts (${savedPosts.length})` },
          { value: "gigs", label: `Gigs (${savedGigs.length})` },
        ]}
        value={tab}
        onChange={setTab}
        mb={5}
      />

      {tab === "posts" ? (
        savedPosts.length ? (
          <VStack align="stretch" spacing={4} maxW="760px">
            {savedPosts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </VStack>
        ) : (
          <EmptyState icon={FiBookmark} title="No saved posts" hint="Tap Save on any post to keep it here." />
        )
      ) : savedGigs.length ? (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4}>
          {savedGigs.map((g) => (
            <GigCard key={g.id} gig={g} />
          ))}
        </SimpleGrid>
      ) : (
        <EmptyState icon={FiBookmark} title="No saved gigs" hint="Bookmark gigs to compare them later." />
      )}
    </Box>
  );
}
