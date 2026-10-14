"use client";

import { useEffect, useState } from "react";
import { motion, isValidMotionProp, useReducedMotion } from "framer-motion";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Tag,
  Text,
  chakra,
  shouldForwardProp,
} from "@chakra-ui/react";
import { FiBookmark } from "react-icons/fi";
import Verified from "@/components/ui/Verified";
import { GigLogo } from "@/components/cards/GigCard";
import { CREATORS, GIGS, COMMUNITIES, pic } from "@/data/mock";

const card = {
  bg: "app.card",
  border: "1px solid",
  borderColor: "app.border",
  shadow: "0 14px 32px rgba(60,30,12,.18)",
};

/* palette for illustrated bits (self-contained so contrast holds in light + dark) */
const GOLD = "#E8B04A";
const GOLD_SOFT = "#F6D58E";
const TERRA = "#C9683A";
const COFFEE = "#5A2E17";
const INK = "#3A1E0E";

/* ───────────────────────── motion helpers ───────────────────────── */

const M = chakra(motion.div, {
  shouldForwardProp: (p) => isValidMotionProp(p) || shouldForwardProp(p),
});

/** true only when motion is allowed, the tab is visible and the slide is active */
function usePlay(active = true) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setReady(true);
    const onVis = () => setVisible(!document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
  return ready && visible && active && !reduce;
}

/**
 * Looping keyframe element. `loop` = keyframe arrays (first value === last value
 * so the loop is seamless), `still` = static pose used for reduced motion / paused.
 */
const Anim = ({
  play,
  loop,
  still,
  times,
  dur = 8,
  ease = "easeInOut",
  ...props
}) => (
  <M
    initial={false}
    animate={play ? loop : still}
    transition={
      play
        ? { duration: dur, times, ease, repeat: Infinity }
        : { duration: 0.25 }
    }
    {...props}
  />
);

/** rise-and-fade keyframes used for sparkles / floating cards */
const rise = ({ s, e, dx, dy, rot = 0 }) => {
  const d = e - s;
  return {
    times: [0, s, s + d * 0.25, e - d * 0.25, e, 1],
    loop: {
      opacity: [0, 0, 1, 1, 0, 0],
      x: [0, 0, dx * 0.3, dx * 0.8, dx, dx],
      y: [0, 0, dy * 0.3, dy * 0.8, dy, dy],
      scale: [0.3, 0.3, 1, 1, 0.7, 0.7],
      rotate: [0, 0, rot * 0.4, rot * 0.8, rot, rot],
    },
  };
};

/* ───────────────────────── tiny illustrated bits ───────────────────────── */

const Spark = ({ size = 14, color = GOLD }) => (
  <chakra.svg
    viewBox="0 0 20 20"
    boxSize={`${size}px`}
    aria-hidden="true"
    display="block"
  >
    <path
      d="M10 1 C10.8 6.5 13.5 9.2 19 10 C13.5 10.8 10.8 13.5 10 19 C9.2 13.5 6.5 10.8 1 10 C6.5 9.2 9.2 6.5 10 1Z"
      fill={color}
    />
  </chakra.svg>
);

const Pointer = () => (
  <chakra.svg
    viewBox="0 0 22 26"
    w="22px"
    h="26px"
    aria-hidden="true"
    display="block"
    filter="drop-shadow(0 2px 2px rgba(40,20,10,.35))"
  >
    <path
      d="M2 2 L2.4 20 L7 15.6 L10.4 23.6 L13.6 22.2 L10.2 14.6 L16.8 14 Z"
      fill="#FFF6E8"
      stroke={COFFEE}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </chakra.svg>
);

const Heart = () => (
  <chakra.svg
    viewBox="0 0 20 18"
    w="20px"
    h="18px"
    aria-hidden="true"
    display="block"
  >
    <path
      d="M10 17 C-2 9 3 1 10 6 C17 1 22 9 10 17Z"
      fill={TERRA}
      stroke="#FFF6E8"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </chakra.svg>
);

const MiniCard = () => (
  <Box
    w="54px"
    p={2}
    rounded="lg"
    bg="app.card"
    border="1px solid"
    borderColor="app.border"
    shadow="0 8px 18px rgba(60,30,12,.25)"
  >
    <Box boxSize="14px" rounded="full" bg={GOLD} mb={1.5} />
    <Box h="4px" rounded="full" bg="app.muted" opacity={0.45} mb="3px" />
    <Box h="4px" w="60%" rounded="full" bg="app.muted" opacity={0.45} />
  </Box>
);

/* ───────────────────────── 1. Hero — door to opportunities ───────────────────────── */

const SPARKS = [
  { s: 0.3, e: 0.6, dx: -52, dy: -112, size: 14, left: 44 },
  { s: 0.34, e: 0.64, dx: -12, dy: -130, size: 10, left: 50 },
  { s: 0.38, e: 0.68, dx: 38, dy: -105, size: 16, left: 56 },
  { s: 0.42, e: 0.72, dx: 62, dy: -70, size: 10, left: 60 },
  { s: 0.33, e: 0.62, dx: -70, dy: -60, size: 9, left: 40 },
  { s: 0.4, e: 0.7, dx: 14, dy: -85, size: 12, left: 52 },
];
const FLOATERS = [
  { s: 0.36, e: 0.76, dx: -40, dy: -118, rot: -12, left: 36 },
  { s: 0.44, e: 0.82, dx: 42, dy: -96, rot: 10, left: 62 },
];

export function SlideHero({ active = true }) {
  const play = usePlay(active);
  const T = 7.5;
  // wobble → open on hinge → hold → close → rest
  const door = [0, 0.06, 0.12, 0.18, 0.35, 0.62, 0.78, 1];

  return (
    <Box
      position="relative"
      h="100%"
      w="full"
      display="flex"
      justifyContent="center"
      alignItems="flex-end"
    >
      <Box position="relative" w="86%" h="92%">
        {/* warm glow behind the door */}
        <Anim
          play={play}
          times={door}
          dur={T}
          loop={{
            opacity: [0, 0, 0, 0, 0.9, 0.9, 0, 0],
            scale: [0.9, 0.9, 0.9, 0.9, 1.12, 1.12, 0.9, 0.9],
          }}
          still={{ opacity: 0, scale: 0.9 }}
          position="absolute"
          inset="-8%"
          rounded="full"
          background="radial-gradient(circle, rgba(246,201,106,.75) 0%, rgba(246,201,106,0) 65%)"
          pointerEvents="none"
          aria-hidden="true"
        />
        {/* golden light revealed in the doorway */}
        <Anim
          play={play}
          times={door}
          dur={T}
          loop={{ opacity: [0, 0, 0, 0, 1, 1, 0, 0] }}
          still={{ opacity: 0 }}
          position="absolute"
          inset={0}
          roundedTop="999px"
          roundedBottom="2xl"
          bgGradient="linear(to-b, #FFF0C2, #F6C96A 55%, #E39B4A)"
          aria-hidden="true"
        />
        {/* the existing door / arch */}
        <Anim
          play={play}
          times={door}
          dur={T}
          loop={{
            rotateZ: [0, -1.2, 1.2, 0, 0, 0, 0, 0],
            rotateY: [0, 0, 0, 0, 38, 38, 0, 0],
          }}
          still={{ rotateZ: 0, rotateY: 0 }}
          style={{ transformOrigin: "0% 50%", transformPerspective: 900 }}
          position="relative"
          w="100%"
          h="100%"
          roundedTop="999px"
          roundedBottom="2xl"
          overflow="hidden"
          bgGradient="linear(to-b, #F6C99B, #C97D45 55%, #5A2E17)"
          shadow="0 18px 40px rgba(60,30,12,.28)"
        >
          <Image
            src={pic("cozy-creator-desk", 700, 900)}
            alt=""
            w="full"
            h="full"
            objectFit="cover"
            opacity={0.55}
            mixBlendMode="multiply"
            filter="sepia(.8) saturate(1.3)"
            fallback={<Box />}
          />
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-t, rgba(40,20,10,.55), transparent 55%)"
          />
        </Anim>

        {/* floating opportunity cards */}
        {FLOATERS.map((c, i) => {
          const r = rise(c);
          return (
            <Anim
              key={i}
              play={play}
              times={r.times}
              dur={T}
              loop={r.loop}
              still={{ opacity: 0 }}
              position="absolute"
              top="52%"
              left={`${c.left}%`}
              ml="-27px"
              zIndex={3}
              pointerEvents="none"
              aria-hidden="true"
            >
              <MiniCard />
            </Anim>
          );
        })}
        {/* sparkles */}
        {SPARKS.map((p, i) => {
          const r = rise({ ...p, rot: 80 });
          return (
            <Anim
              key={i}
              play={play}
              times={r.times}
              dur={T}
              loop={r.loop}
              still={{ opacity: 0.85, x: p.dx * 0.2, y: p.dy * 0.2, scale: 1 }}
              position="absolute"
              top="54%"
              left={`${p.left}%`}
              zIndex={3}
              pointerEvents="none"
              aria-hidden="true"
            >
              <Spark size={p.size} color={i % 2 ? GOLD_SOFT : GOLD} />
            </Anim>
          );
        })}
      </Box>

      {/* paper leaves — gentle drift */}
      <Anim
        play={play}
        times={[0, 0.5, 1]}
        dur={6}
        loop={{ rotate: [20, 26, 20], y: [0, -5, 0] }}
        still={{ rotate: 20, y: 0 }}
        position="absolute"
        top="6%"
        right="2%"
        boxSize="70px"
        rounded="70% 0 70% 0"
        bg="app.brand"
        opacity={0.18}
      />
      <Anim
        play={play}
        times={[0, 0.5, 1]}
        dur={7}
        loop={{ rotate: [-25, -31, -25], y: [0, 4, 0] }}
        still={{ rotate: -25, y: 0 }}
        position="absolute"
        bottom="8%"
        left="-2%"
        boxSize="90px"
        rounded="70% 0 70% 0"
        bg="app.accent"
        opacity={0.22}
      />
    </Box>
  );
}

/* ───────────────────────── 2. Creators — stacked, tilted cards ───────────────────────── */

export function SlideCreators({ active = true }) {
  const play = usePlay(active);
  const [a, b, c] = [CREATORS[0], CREATORS[2], CREATORS[1]];
  const T = 8;

  // enter → settle → hold → shuffle → settle → drift out (last frame ≈ first, opacity 0)
  const timesFor = (settle) => [0, settle, 0.5, 0.62, 0.74, 0.86, 0.92, 1];
  const flow = (rot, [ix, iy, ir], [sx, sy, sr]) => ({
    x: [ix, 0, 0, 0, sx, 0, 0, ix * 0.5],
    y: [iy, 0, 0, 0, sy, 0, 0, iy * 0.5],
    rotate: [rot + ir, rot, rot, rot, rot + sr, rot, rot, rot + ir * 0.5],
    opacity: [0, 1, 1, 1, 1, 1, 1, 0],
  });

  return (
    <Box position="relative" w="full" h="100%" overflowX="clip">
      {/* c — enters from the right */}
      <Anim
        play={play}
        times={timesFor(0.1)}
        dur={T}
        loop={flow(8, [70, 10, 10], [-6, 8, 2])}
        still={{ x: 0, y: 0, rotate: 8, opacity: 1 }}
        position="absolute"
        right="2%"
        top="12%"
        w="44%"
        p={3}
        rounded="2xl"
        {...card}
      >
        <Avatar
          src={c.avatar}
          name={c.name}
          size="lg"
          w="full"
          h="90px"
          rounded="xl"
          borderRadius="xl"
        />
        <Text mt={2} fontSize="xs" fontWeight={700}>
          {c.name}
        </Text>
        <Text fontSize="10px" color="app.muted">
          {c.role}
        </Text>
      </Anim>

      {/* b — drops in from above */}
      <Anim
        play={play}
        times={timesFor(0.15)}
        dur={T}
        loop={flow(4, [0, -70, -6], [10, -6, -2])}
        still={{ x: 0, y: 0, rotate: 4, opacity: 1 }}
        position="absolute"
        right="10%"
        top="2%"
        w="46%"
        p={3}
        rounded="2xl"
        {...card}
      >
        <Avatar
          src={b.avatar}
          name={b.name}
          w="full"
          h="90px"
          borderRadius="xl"
        />
        <Text mt={2} fontSize="xs" fontWeight={700}>
          {b.name}
        </Text>
        <Text fontSize="10px" color="app.muted">
          {b.role}
        </Text>
      </Anim>

      {/* a — front card, enters from the left; carries the Follow click */}
      <Anim
        play={play}
        times={timesFor(0.2)}
        dur={T}
        loop={flow(-6, [-80, 6, -8], [14, 6, 4])}
        still={{ x: 0, y: 0, rotate: -6, opacity: 1 }}
        position="absolute"
        left="4%"
        top="6%"
        w="62%"
        p={3}
        rounded="3xl"
        {...card}
      >
        <Image
          src={a.avatar}
          alt=""
          w="full"
          h={{ base: "170px", md: "210px" }}
          objectFit="cover"
          rounded="2xl"
          fallback={<Box h="170px" bg="app.cardAlt" rounded="2xl" />}
        />
        <Flex align="center" gap={1} mt={3}>
          <Text fontWeight={700} fontSize="sm">
            {a.name}
          </Text>
          <Verified boxSize={3.5} />
        </Flex>
        <Text fontSize="xs" color="app.muted">
          {a.role}
        </Text>
        <Anim
          play={play}
          times={[0, 0.38, 0.5, 0.54, 0.6, 0.66, 1]}
          dur={T}
          loop={{ scale: [1, 1, 1, 0.94, 1.04, 1, 1] }}
          still={{ scale: 1 }}
          mt={3}
        >
          <Button
            size="sm"
            variant="soft"
            w="full"
            pointerEvents="none"
            tabIndex={-1}
          >
            Follow
          </Button>
        </Anim>

        {/* heart pop */}
        <Anim
          play={play}
          times={[0, 0.54, 0.6, 0.7, 0.8, 1]}
          dur={T}
          loop={{
            opacity: [0, 0, 1, 1, 0, 0],
            y: [0, 0, -8, -30, -46, -46],
            scale: [0.2, 0.2, 1.3, 1, 1, 1],
          }}
          still={{ opacity: 0 }}
          position="absolute"
          left="50%"
          bottom="44px"
          ml="-10px"
          zIndex={4}
          pointerEvents="none"
          aria-hidden="true"
        >
          <Heart />
        </Anim>
        {/* illustrated pointer */}
        <Anim
          play={play}
          times={[0, 0.38, 0.5, 0.54, 0.58, 0.7, 1]}
          dur={T}
          loop={{
            opacity: [0, 0, 1, 1, 1, 0, 0],
            x: [46, 46, 0, 0, 0, 26, 26],
            y: [40, 40, 0, 0, 0, 30, 30],
            scale: [1, 1, 1, 0.8, 1, 1, 1],
          }}
          still={{ opacity: 0 }}
          position="absolute"
          left="58%"
          bottom="2px"
          zIndex={5}
          pointerEvents="none"
          aria-hidden="true"
        >
          <Pointer />
        </Anim>
      </Anim>
    </Box>
  );
}

/* ───────────────────────── 3. Gigs — paper stack with Apply click ───────────────────────── */

const pointerStates = {
  idle: { opacity: 0, x: 44, y: 38, scale: 1, transition: { duration: 0.2 } },
  aim: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
  press: { opacity: 1, x: 0, y: 0, scale: 0.8, transition: { duration: 0.15 } },
  done: { opacity: 0, x: 16, y: 18, scale: 1, transition: { duration: 0.4 } },
  out: { opacity: 0, x: 16, y: 18, scale: 1, transition: { duration: 0.1 } },
};

export function SlideGigs({ active = true }) {
  const play = usePlay(active);
  const gigs = [GIGS[0], GIGS[1], GIGS[2]];
  const [order, setOrder] = useState([0, 1, 2]);
  const [phase, setPhase] = useState("idle"); // idle → aim → press → done → out → (rotate) → idle

  useEffect(() => {
    if (!play) {
      setPhase("idle");
      return;
    }
    let timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const cycle = () => {
      timers = [];
      at(700, () => setPhase("aim"));
      at(1500, () => setPhase("press"));
      at(1700, () => setPhase("done"));
      at(3200, () => setPhase("out"));
      at(3850, () => {
        setOrder((o) => [...o.slice(1), o[0]]);
        setPhase("idle");
      });
      at(4800, cycle);
    };
    cycle();
    return () => timers.forEach(clearTimeout);
  }, [play]);

  return (
    <Flex direction="column" gap={4} w="full" justify="center" h="100%" px={1}>
      {order.map((idx, slot) => {
        const g = gigs[idx];
        const top = slot === 0;
        const leaving = top && phase === "out";
        const checked = top && (phase === "done" || phase === "out");
        return (
          <M
            key={g.id}
            layout="position"
            initial={false}
            animate={{ x: slot ? 14 : 0 }}
            transition={{
              layout: { duration: 0.5, ease: "easeInOut" },
              x: { duration: 0.4 },
            }}
          >
            <M
              position="relative"
              p={4}
              rounded="2xl"
              initial={false}
              animate={
                leaving
                  ? {
                      x: -48,
                      rotate: -6,
                      opacity: 0,
                      transition: { duration: 0.55, ease: "easeIn" },
                    }
                  : {
                      x: 0,
                      rotate: 0,
                      opacity: 1,
                      transition: { duration: 0.4, delay: 0.5 },
                    }
              }
              {...card}
            >
              <Flex gap={3} align="flex-start">
                <GigLogo logo={g.logo} />
                <Box flex="1" minW={0}>
                  <Text fontWeight={700} fontSize="sm">
                    {g.title}
                  </Text>
                  <Text fontSize="xs" color="app.muted">
                    {g.mode} · {g.type}
                  </Text>
                  <Text fontSize="sm" fontWeight={600} mt={1}>
                    {g.pay}
                  </Text>
                </Box>
                <FiBookmark />
              </Flex>
              <Flex mt={3} align="center" gap={2}>
                <HStack spacing={2} flex="1" minW={0} overflow="hidden">
                  {g.tags.map((t) => (
                    <Tag key={t} size="sm">
                      {t}
                    </Tag>
                  ))}
                </HStack>
                {/* decorative Apply pill */}
                <M
                  aria-hidden="true"
                  flexShrink={0}
                  px={3}
                  py="3px"
                  rounded="full"
                  fontSize="11px"
                  fontWeight={700}
                  bg={GOLD_SOFT}
                  color={INK}
                  border="1px solid"
                  borderColor={GOLD}
                  initial={false}
                  animate={{ scale: top && phase === "press" ? 0.9 : 1 }}
                  transition={{ duration: 0.15 }}
                >
                  Apply
                </M>
              </Flex>

              {/* hand-drawn checkmark */}
              <M
                aria-hidden="true"
                position="absolute"
                top="-14px"
                right="12px"
                boxSize="30px"
                rounded="full"
                bg={GOLD_SOFT}
                border="2px solid"
                borderColor={GOLD}
                pointerEvents="none"
                initial={false}
                animate={{ opacity: checked ? 1 : 0, scale: checked ? 1 : 0.5 }}
                transition={{ duration: 0.25 }}
              >
                <svg
                  viewBox="0 0 30 30"
                  width="26"
                  height="26"
                  style={{ display: "block" }}
                >
                  <motion.path
                    d="M7 15.5 C9 17.2 10.8 19.2 12.2 21 C15.2 15.2 18.8 11.6 22.4 8.6"
                    fill="none"
                    stroke={INK}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={false}
                    animate={{
                      pathLength: checked ? 1 : 0,
                      opacity: checked ? 1 : 0,
                    }}
                    transition={{
                      duration: checked ? 0.45 : 0,
                      delay: checked ? 0.15 : 0,
                    }}
                  />
                </svg>
              </M>

              {/* illustrated pointer */}
              <M
                aria-hidden="true"
                position="absolute"
                right="22px"
                bottom="1px"
                zIndex={5}
                pointerEvents="none"
                variants={pointerStates}
                initial={false}
                animate={top ? phase : "idle"}
              >
                <Pointer />
              </M>
            </M>
          </M>
        );
      })}
    </Flex>
  );
}

/* ───────────────────────── 4. Communities — group forms, Join, confetti ───────────────────────── */

const NODES = [
  { x: 110, y: 22, from: [0, -44] },
  { x: 52, y: 58, from: [-64, 10] },
  { x: 168, y: 58, from: [64, 10] },
  { x: 110, y: 92, from: [0, 50] },
];
const LINKS = [
  [0, 1],
  [0, 2],
  [1, 2],
  [1, 3],
  [2, 3],
];
const CONFETTI = [
  [-46, -52],
  [-22, -70],
  [8, -64],
  [34, -58],
  [52, -34],
  [-56, -22],
  [20, -82],
  [-34, -84],
  [58, -62],
];
const CONFETTI_COLORS = [GOLD, TERRA, GOLD_SOFT, "#8A5A3A"];

export function SlideCommunities({ active = true }) {
  const play = usePlay(active);
  const list = [COMMUNITIES[1], COMMUNITIES[0], COMMUNITIES[2]];
  const people = NODES.map((_, i) => CREATORS[i % CREATORS.length]);
  const T = 9;

  return (
    <Box position="relative" w="full" h="100%" overflowX="clip">
      {/* avatar cluster + connecting lines (fixed 220×110 so SVG + avatars stay aligned) */}
      <Box
        position="absolute"
        top={0}
        left="50%"
        ml="-110px"
        w="220px"
        h="110px"
        pointerEvents="none"
        aria-hidden="true"
      >
        <chakra.svg
          viewBox="0 0 220 110"
          position="absolute"
          inset={0}
          w="220px"
          h="110px"
        >
          {LINKS.map(([p, q], i) => {
            const s = 0.2 + i * 0.03;
            const e = s + 0.1;
            return (
              <motion.line
                key={i}
                x1={NODES[p].x}
                y1={NODES[p].y}
                x2={NODES[q].x}
                y2={NODES[q].y}
                stroke={TERRA}
                strokeWidth="2"
                strokeLinecap="round"
                initial={false}
                animate={
                  play
                    ? {
                        pathLength: [0, 0, 1, 1, 1, 0],
                        opacity: [0, 0, 0.9, 0.9, 0, 0],
                      }
                    : { pathLength: 1, opacity: 0.55 }
                }
                transition={
                  play
                    ? {
                        duration: T,
                        times: [0, s, e, 0.9, 0.97, 1],
                        ease: "easeInOut",
                        repeat: Infinity,
                      }
                    : { duration: 0.25 }
                }
              />
            );
          })}
        </chakra.svg>
        {NODES.map((n, i) => {
          const s = 0.04 + i * 0.04;
          const e = s + 0.14;
          const [fx, fy] = n.from;
          return (
            <Anim
              key={i}
              play={play}
              times={[0, s, e, 0.9, 0.97, 1]}
              dur={T}
              loop={{
                x: [fx, fx, 0, 0, fx * 0.3, fx],
                y: [fy, fy, 0, 0, fy * 0.3, fy],
                opacity: [0, 0, 1, 1, 0, 0],
                scale: [0.5, 0.5, 1, 1, 0.7, 0.7],
              }}
              still={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              position="absolute"
              left={`${n.x - 16}px`}
              top={`${n.y - 16}px`}
            >
              <Avatar
                src={people[i].avatar}
                name={people[i].name}
                size="sm"
                border="2px solid"
                borderColor="app.card"
                shadow="0 4px 10px rgba(60,30,12,.25)"
              />
            </Anim>
          );
        })}
      </Box>

      {/* community cards */}
      <Flex
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        top="100px"
        align="center"
        justify="center"
      >
        {list.map((c, i) => {
          const center = i === 1;
          const rot = center ? 0 : i === 0 ? -5 : 5;
          const base = center ? 0 : 10;
          const s = [0.26, 0.34, 0.3][i];
          const e = s + 0.12;
          return (
            <Anim
              key={c.id}
              play={play}
              times={[0, s, e, 0.9, 0.97, 1]}
              dur={T}
              loop={{
                y: [base + 36, base + 36, base, base, base + 12, base + 12],
                rotate: [rot * 1.8, rot * 1.8, rot, rot, rot * 1.3, rot * 1.3],
                opacity: [0, 0, 1, 1, 0, 0],
              }}
              still={{ y: base, rotate: rot, opacity: 1 }}
              position="relative"
              w={center ? "44%" : "36%"}
              mx={center ? "-4%" : 0}
              zIndex={center ? 2 : 1}
              p={2}
              rounded="2xl"
              {...card}
            >
              <Image
                src={c.cover}
                alt=""
                h={center ? "120px" : "92px"}
                w="full"
                objectFit="cover"
                rounded="xl"
                fallback={<Box h="92px" bg="app.cardAlt" rounded="xl" />}
              />
              <Text fontSize="xs" fontWeight={700} mt={2} noOfLines={1}>
                {c.name}
              </Text>
              <Text fontSize="10px" color="app.muted">
                {c.members} members
              </Text>
              {center ? (
                <Anim
                  play={play}
                  times={[0, 0.42, 0.52, 0.56, 0.62, 0.7, 1]}
                  dur={T}
                  loop={{ scale: [1, 1, 1, 0.93, 1.05, 1, 1] }}
                  still={{ scale: 1 }}
                  mt={2}
                >
                  <Button
                    size="xs"
                    w="full"
                    pointerEvents="none"
                    tabIndex={-1}
                    variant="brand"
                  >
                    Join
                  </Button>
                </Anim>
              ) : (
                <Button
                  size="xs"
                  w="full"
                  mt={2}
                  pointerEvents="none"
                  tabIndex={-1}
                  variant="soft"
                >
                  Join
                </Button>
              )}

              {center && (
                <>
                  {/* pointer */}
                  <Anim
                    play={play}
                    times={[0, 0.42, 0.52, 0.56, 0.6, 0.7, 1]}
                    dur={T}
                    loop={{
                      opacity: [0, 0, 1, 1, 1, 0, 0],
                      x: [44, 44, 0, 0, 0, 20, 20],
                      y: [36, 36, 0, 0, 0, 24, 24],
                      scale: [1, 1, 1, 0.8, 1, 1, 1],
                    }}
                    still={{ opacity: 0 }}
                    position="absolute"
                    left="50%"
                    bottom="-6px"
                    zIndex={5}
                    pointerEvents="none"
                    aria-hidden="true"
                  >
                    <Pointer />
                  </Anim>
                  {/* confetti burst */}
                  {CONFETTI.map(([dx, dy], k) => (
                    <Anim
                      key={k}
                      play={play}
                      times={[0, 0.58, 0.66, 0.8, 1]}
                      dur={T}
                      ease="easeOut"
                      loop={{
                        opacity: [0, 0, 1, 0, 0],
                        x: [0, 0, dx, dx * 1.15, dx * 1.15],
                        y: [0, 0, dy, dy + 24, dy + 24],
                        rotate: [
                          0,
                          0,
                          120 * (k % 2 ? 1 : -1),
                          240 * (k % 2 ? 1 : -1),
                          240 * (k % 2 ? 1 : -1),
                        ],
                      }}
                      still={{ opacity: 0 }}
                      position="absolute"
                      left="50%"
                      bottom="22px"
                      w={k % 2 ? "6px" : "7px"}
                      h={k % 2 ? "6px" : "4px"}
                      rounded={k % 2 ? "full" : "1px"}
                      bg={CONFETTI_COLORS[k % CONFETTI_COLORS.length]}
                      zIndex={6}
                      pointerEvents="none"
                      aria-hidden="true"
                    />
                  ))}
                </>
              )}
            </Anim>
          );
        })}
      </Flex>
    </Box>
  );
}
