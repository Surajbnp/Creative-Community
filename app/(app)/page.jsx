"use client";

import { useMemo, useState } from "react";
import { Box, Grid, SimpleGrid, VStack } from "@chakra-ui/react";
import HeroBanner from "@/components/home/HeroBanner";
import RightRail from "@/components/home/RightRail";
import SectionHeader from "@/components/ui/SectionHeader";
import { UnderlineTabs } from "@/components/ui/Tabs";
import EmptyState from "@/components/ui/EmptyState";
import CreatorCard from "@/components/cards/CreatorCard";
import PostCard from "@/components/cards/PostCard";
import { FEATURED_CREATORS } from "@/data/mock";
import { useApp } from "@/context/AppContext";

const TABS = [
  { value: "for-you", label: "For You" },
  { value: "following", label: "Following" },
  { value: "trending", label: "Trending" },
];

export default function HomePage() {
  const { posts, has } = useApp();
  const [tab, setTab] = useState("for-you");

  const feed = useMemo(() => {
    if (tab === "following")
      return posts.filter((p) => p.authorId === "me" || has("following", p.authorId));
    if (tab === "trending") return [...posts].sort((a, b) => b.likes - a.likes);
    return posts;
  }, [tab, posts, has]);

  return (
    <Grid templateColumns={{ base: "minmax(0,1fr)", xl: "minmax(0,1fr) 340px" }} gap={6} alignItems="start">
      <Box minW={0}>
        <HeroBanner />

        <Box mt={7}>
          <SectionHeader title="Featured Creators" href="/discover" />
          {/* horizontal scroll on phones, grid from md */}
          <Box display={{ base: "block", md: "none" }} mx={-4} px={4}>
            <Box display="flex" gap={3} overflowX="auto" className="hide-scroll" pb={2} sx={{ scrollSnapType: "x mandatory" }}>
              {FEATURED_CREATORS.map((c) => (
                <Box key={c.id} flex="0 0 140px" sx={{ scrollSnapAlign: "start" }}>
                  <CreatorCard creator={c} />
                </Box>
              ))}
            </Box>
          </Box>
          <SimpleGrid display={{ base: "none", md: "grid" }} columns={4} spacing={4}>
            {FEATURED_CREATORS.map((c) => (
              <CreatorCard key={c.id} creator={c} />
            ))}
          </SimpleGrid>
        </Box>

        <Box mt={7}>
          <UnderlineTabs tabs={TABS} value={tab} onChange={setTab} mb={4} />
          <VStack align="stretch" spacing={4}>
            {feed.length === 0 ? (
              <EmptyState title="Nothing in this feed yet" hint="Follow a few creators to fill your Following tab." />
            ) : (
              feed.map((p) => <PostCard key={p.id} post={p} />)
            )}
          </VStack>
        </Box>
      </Box>

      <Box display={{ base: "none", xl: "block" }}>
        <RightRail />
      </Box>
    </Grid>
  );
}
