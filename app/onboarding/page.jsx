"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isValidMotionProp, motion } from "framer-motion";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Text,
  chakra,
} from "@chakra-ui/react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import PhoneFrame from "@/components/onboarding/PhoneFrame";
import Logo from "@/components/ui/Logo";
import {
  SlideCommunities,
  SlideCreators,
  SlideGigs,
  SlideHero,
} from "@/components/onboarding/Illustrations";
import { useApp } from "@/context/AppContext";

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const SLIDES = [
  {
    key: "hero",
    title: ["Create. Connect.", "Collaborate. Grow."],
    accent: 1,
    body: "A home for creators to build, share, learn and find opportunities together.",
    Art: SlideHero,
    hero: true,
  },
  {
    key: "creators",
    title: ["Discover Amazing", "Creators"],
    accent: 1,
    body: "Explore talented creators, join communities, and get inspired by real work.",
    Art: SlideCreators,
  },
  {
    key: "gigs",
    title: ["Find Opportunities", "& Gigs"],
    accent: 1,
    body: "Discover freelance gigs, collaborations, and projects from top brands and creators.",
    Art: SlideGigs,
  },
  {
    key: "communities",
    title: ["Join Communities", "That Inspire"],
    accent: 1,
    body: "Be part of niche communities, share ideas, learn, and grow together.",
    Art: SlideCommunities,
  },
];

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
};

export default function OnboardingPage() {
  const router = useRouter();
  const { hydrated, onboarded, user, completeOnboarding } = useApp();
  const [[index, dir], setPage] = useState([0, 0]);

  const last = index === SLIDES.length - 1;
  const slide = SLIDES[index];

  // already onboarded users shouldn't see this again
  useEffect(() => {
    if (hydrated && onboarded) router.replace(user ? "/" : "/login");
  }, [hydrated, onboarded, user, router]);

  const finish = useCallback(() => {
    completeOnboarding();
    router.push("/login");
  }, [completeOnboarding, router]);

  const paginate = useCallback(
    (d) => {
      const next = index + d;
      if (next < 0) return;
      if (next >= SLIDES.length) return finish();
      setPage([next, d]);
    },
    [index, finish],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate]);

  const Art = slide.Art;

  return (
    <PhoneFrame>
      <Flex direction="column" h="full" px={6} pt={{ base: 6, md: 7 }} pb={6}>
        {/* top bar */}
        <Flex justify="space-between" align="center" minH="28px">
          <Box />
          <Button
            variant="ghostApp"
            size="sm"
            onClick={finish}
            color="app.muted"
          >
            Skip
          </Button>
        </Flex>

        {/* No AnimatePresence: it calls Math.random() on render, which Next 16
            Cache Components rejects. Keyed remount + enter animation instead. */}
        <>
          <MotionBox
            key={slide.key}
            custom={dir}
            variants={variants}
            initial={dir === 0 ? false : "enter"}
            animate="center"
            transition={{ duration: 0.28 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) paginate(1);
              else if (info.offset.x > 70) paginate(-1);
            }}
            display="flex"
            flexDirection="column"
            flex="1"
            minH={0}
            cursor="grab"
            _active={{ cursor: "grabbing" }}
          >
            {slide.hero && (
              <Flex justify="center" mt={1} mb={4}>
                <Logo size={38} />
              </Flex>
            )}
            <Box textAlign="center" mt={slide.hero ? 0 : 2}>
              <Heading
                as="h1"
                fontFamily="heading"
                fontWeight={500}
                fontSize={{ base: "30px", md: "34px" }}
                lineHeight={1.15}
                color="app.text"
              >
                {slide.title.map((line, i) => (
                  <Box
                    as="span"
                    display="block"
                    key={i}
                    color={i === slide.accent ? "app.accent" : undefined}
                  >
                    {line}
                  </Box>
                ))}
              </Heading>
              <Text
                mt={3}
                fontSize="sm"
                color="app.muted"
                maxW="300px"
                mx="auto"
                lineHeight="1.6"
              >
                {slide.body}
              </Text>
            </Box>

            <Box flex="1" minH={0} mt={5} mb={4} pointerEvents="none">
              <Art />
            </Box>
          </MotionBox>
        </>

        {/* footer */}
        <Flex align="center" justify="space-between">
          <HStack spacing={2} aria-label="Progress">
            {SLIDES.map((s, i) => (
              <Box
                as="button"
                key={s.key}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setPage([i, i > index ? 1 : -1])}
                boxSize="8px"
                rounded="full"
                bg={i === index ? "app.brand" : "app.border"}
                transition="all .2s"
                transform={i === index ? "scale(1.25)" : "none"}
              />
            ))}
          </HStack>
          <Flex gap={3}>
            <Button
              w={"46px"}
              h={"46px"}
              borderRadius={"50%"}
              onClick={() => paginate(-1)}
            >
              <FiArrowLeft />
            </Button>
            <Button
              w={"46px"}
              h={"46px"}
              borderRadius={"50%"}
              onClick={() => paginate(1)}
            >
              <FiArrowRight />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </PhoneFrame>
  );
}
