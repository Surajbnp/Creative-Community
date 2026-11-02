"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiArrowRight,
  FiBriefcase,
  FiCalendar,
  FiCamera,
  FiCheck,
  FiCode,
  FiFeather,
  FiFilm,
  FiHeart,
  FiImage,
  FiMenu,
  FiMessageCircle,
  FiMoon,
  FiMusic,
  FiPlay,
  FiSearch,
  FiStar,
  FiSun,
  FiUsers,
} from "react-icons/fi";
import {
  FaApple,
  FaDiscord,
  FaGamepad,
  FaGooglePlay,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

/* ---------- Image helpers (Unsplash + Pravatar, with Picsum fallback) ---------- */
const unsplash = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const fallback = (seed, w = 900, h = 700) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;
const avatar = (n) => `https://i.pravatar.cc/160?img=${n}`;

const IMG = {
  team: "photo-1522071820081-009f0129c71c",
  collab: "photo-1531482615713-2afd69097998",
  desk: "photo-1497032628192-86f99bcd76bc",
  code: "photo-1498050108023-c5249f4df085",
  design: "photo-1561070791-2526d30994b5",
  art: "photo-1513364776144-60967b0f800f",
  music: "photo-1511379938547-c1f69419868d",
  camera: "photo-1516035069371-29a1b244cc32",
  game: "photo-1511512578047-dfb367046420",
  write: "photo-1455390582262-044cdead277a",
  film: "photo-1485846234645-a62644f84728",
};

function Pic({ id, w = 900, seed, ...props }) {
  return (
    <Image
      src={unsplash(id, w)}
      fallbackSrc={fallback(seed || id, w)}
      alt=""
      loading="lazy"
      objectFit="cover"
      w="100%"
      h="100%"
      {...props}
    />
  );
}

/* ---------- Data ---------- */
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Communities", href: "#communities" },
  { label: "Gigs", href: "#gigs" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const categories = [
  { label: "Designers", icon: FiImage },
  { label: "Developers", icon: FiCode },
  { label: "Writers", icon: FiFeather },
  { label: "Musicians", icon: FiMusic },
  { label: "Photographers", icon: FiCamera },
  { label: "Gamers", icon: FaGamepad },
  { label: "Filmmakers", icon: FiFilm },
];

const features = [
  {
    icon: FiImage,
    tint: "#D9B58A",
    title: "Share your work",
    text: "Showcase your projects, art, ideas, and experiments.",
  },
  {
    icon: FiUsers,
    tint: "#C98D86",
    title: "Communities",
    text: "Find your people and join niche creative groups.",
  },
  {
    icon: FiBriefcase,
    tint: "#A7B89A",
    title: "Gigs & opportunities",
    text: "Discover freelance work and meaningful collaborations.",
  },
  {
    icon: FiMessageCircle,
    tint: "#B4A2D0",
    title: "Real-time chat",
    text: "Talk directly with creators and your communities.",
  },
  {
    icon: FiCalendar,
    tint: "#9AB9C9",
    title: "Events & workshops",
    text: "Attend sessions or host your own creative events.",
  },
  {
    icon: FiStar,
    tint: "#D7B96D",
    title: "Level up",
    text: "Earn XP, unlock badges, and grow your profile.",
  },
];

const showcase = [
  {
    img: IMG.design,
    title: "Brand identity study",
    by: "Mira S.",
    likes: "1.4K",
    h: "300px",
  },
  {
    img: IMG.camera,
    title: "Golden hour series",
    by: "Dev P.",
    likes: "982",
    h: "220px",
  },
  {
    img: IMG.art,
    title: "Studio sketches",
    by: "Ari K.",
    likes: "2.1K",
    h: "260px",
  },
  {
    img: IMG.code,
    title: "Open-source UI kit",
    by: "Sam R.",
    likes: "764",
    h: "220px",
  },
  {
    img: IMG.music,
    title: "Late night beats",
    by: "Noor A.",
    likes: "1.1K",
    h: "300px",
  },
  {
    img: IMG.film,
    title: "Short film: Monsoon",
    by: "Kabir T.",
    likes: "1.8K",
    h: "260px",
  },
];

const communities = [
  {
    name: "Design Circle",
    members: "1.2K members",
    img: IMG.design,
    color: "#855337",
    description: "Visual ideas and feedback",
    faces: [5, 12, 32],
  },
  {
    name: "Dev Collective",
    members: "2.4K members",
    img: IMG.code,
    color: "#35566A",
    description: "Build things together",
    faces: [15, 52, 60],
  },
  {
    name: "Creative Writers",
    members: "980 members",
    img: IMG.write,
    color: "#8D6841",
    description: "Stories, words, and worlds",
    faces: [20, 45, 47],
  },
  {
    name: "Game Creators",
    members: "1.1K members",
    img: IMG.game,
    color: "#65466F",
    description: "Play, design, and make",
    faces: [8, 33, 68],
  },
];

const gigs = [
  {
    role: "React Developer",
    type: "Remote · Contract",
    pay: "₹40k–₹80k",
    img: IMG.code,
  },
  {
    role: "Brand Designer",
    type: "Remote · Freelance",
    pay: "₹15k–₹30k",
    img: IMG.design,
  },
  { role: "Illustrator", type: "Project based", pay: "₹8k–₹20k", img: IMG.art },
];

const stats = [
  { icon: FiUsers, value: "10K+", label: "Creators" },
  { icon: FiMessageCircle, value: "250+", label: "Communities" },
  { icon: FiImage, value: "5K+", label: "Projects shared" },
  { icon: FiBriefcase, value: "1K+", label: "Gigs posted" },
];

const testimonials = [
  {
    name: "Aanya Verma",
    role: "Illustrator",
    face: 47,
    quote:
      "I posted one sketch and had three collaboration offers by the weekend.",
  },
  {
    name: "Rohan Das",
    role: "Full Stack Developer",
    face: 12,
    quote:
      "The Dev Collective gave me my first freelance client and a group of friends.",
  },
  {
    name: "Ishita Rao",
    role: "Photographer",
    face: 32,
    quote:
      "Feedback here is honest and kind. My portfolio has never looked better.",
  },
];

const plans = [
  {
    name: "Free",
    price: 0,
    cta: "Get started",
    perks: [
      "Create your profile",
      "Join communities",
      "Basic messaging",
      "Browse public gigs",
    ],
  },
  {
    name: "Pro",
    price: 199,
    cta: "Start Pro",
    popular: true,
    perks: [
      "Everything in Free",
      "Unlimited messaging",
      "More project posts",
      "Apply to premium gigs",
      "Profile analytics",
    ],
  },
  {
    name: "Creator+",
    price: 499,
    cta: "Start Creator+",
    perks: [
      "Everything in Pro",
      "Featured creator profile",
      "Early event access",
      "Priority support",
      "Custom profile link",
    ],
  },
];

const faqs = [
  {
    q: "What is ZURA?",
    a: "ZURA is a creative community platform where creators share work, connect with people, collaborate, and discover opportunities.",
  },
  {
    q: "Is ZURA free to use?",
    a: "Yes. You can start with the Free plan and upgrade if you need additional creator tools.",
  },
  {
    q: "Can I showcase my projects?",
    a: "Yes. Build your profile and share projects, experiments, artwork, and other work with the community.",
  },
  {
    q: "How do I find gigs?",
    a: "Browse the Gigs section, explore opportunities, and apply to roles that fit your skills.",
  },
  {
    q: "Can I create a community?",
    a: "ZURA is designed around creative communities where people with shared interests can connect and collaborate.",
  },
];

const footerColumns = [
  {
    title: "Explore",
    items: [
      ["Features", "#features"],
      ["Showcase", "#showcase"],
      ["Communities", "#communities"],
      ["Gigs", "#gigs"],
    ],
  },
  {
    title: "ZURA",
    items: [
      ["Pricing", "#pricing"],
      ["FAQ", "#faq"],
      ["Get started", "#home"],
    ],
  },
  {
    title: "Company",
    items: [
      ["About", "#about"],
      ["Privacy", "#privacy"],
      ["Terms", "#terms"],
    ],
  },
];

/* ---------- Shared bits ---------- */
function SectionContainer(props) {
  return <Container maxW="1240px" px={{ base: 5, md: 8, xl: 10 }} {...props} />;
}

function Eyebrow({ children, ...props }) {
  const color = useColorModeValue("#956344", "#D1A77F");
  return (
    <HStack spacing={3} {...props}>
      <Box w="28px" h="2px" bg={color} borderRadius="full" />
      <Text
        color={color}
        fontSize="xs"
        fontWeight="800"
        letterSpacing="0.2em"
        textTransform="uppercase"
      >
        {children}
      </Text>
    </HStack>
  );
}

function SectionTitle({ eyebrow, title, text, centered = false }) {
  return (
    <Stack
      spacing={3}
      maxW={centered ? "760px" : "620px"}
      mx={centered ? "auto" : 0}
      textAlign={centered ? "center" : "left"}
      align={centered ? "center" : "flex-start"}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading
        as="h2"
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        lineHeight="1.12"
        letterSpacing="-0.035em"
      >
        {title}
      </Heading>
      {text && (
        <Text
          color="app.muted"
          fontSize={{ base: "sm", md: "md" }}
          lineHeight="1.8"
        >
          {text}
        </Text>
      )}
    </Stack>
  );
}

const lift = {
  transform: "translateY(-6px)",
  boxShadow: "0 24px 50px rgba(63,30,12,.18)",
};

/* ---------- Navbar ---------- */
function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue(
    "rgba(250, 242, 229, 0.88)",
    "rgba(26, 14, 8, 0.88)",
  );
  const border = useColorModeValue("#E4D0B9", "#43291B");

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={50}
      bg={bg}
      borderBottom="1px solid"
      borderColor={border}
      backdropFilter="blur(18px) saturate(1.4)"
    >
      <SectionContainer>
        <Flex minH="76px" align="center" justify="space-between" gap={4}>
          <Link
            href="#home"
            _hover={{ textDecoration: "none" }}
            aria-label="ZURA home"
          >
            <HStack spacing={2}>
              <Flex
                w="34px"
                h="34px"
                bg="app.brand"
                color="app.brandText"
                borderRadius="xl"
                align="center"
                justify="center"
                transform="rotate(-8deg)"
              >
                <Text fontWeight="900" fontSize="lg">
                  Z
                </Text>
              </Flex>
              <Heading color="app.brand" fontSize="2xl" letterSpacing="-0.06em">
                ZURA
              </Heading>
            </HStack>
          </Link>

          <HStack
            spacing={{ md: 4, lg: 6 }}
            display={{ base: "none", lg: "flex" }}
          >
            {navLinks.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                fontSize="sm"
                fontWeight={index === 0 ? 800 : 600}
                color={index === 0 ? "app.brand" : "app.text"}
                _hover={{ color: "app.accent", textDecoration: "none" }}
              >
                {item.label}
              </Link>
            ))}
          </HStack>

          <HStack spacing={2}>
            <IconButton
              aria-label="Search ZURA"
              icon={<FiSearch />}
              variant="ghost"
              display={{ base: "none", md: "inline-flex" }}
            />
            <IconButton
              aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
              icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
              variant="outlineApp"
              onClick={toggleColorMode}
              size="sm"
            />
            <Button
              variant="outlineApp"
              size="sm"
              display={{ base: "none", sm: "inline-flex" }}
            >
              Login
            </Button>
            <Button
              size="sm"
              display={{ base: "none", sm: "inline-flex" }}
              as="a"
              href="#pricing"
            >
              Get started
            </Button>
            <IconButton
              aria-label="Open navigation menu"
              icon={<FiMenu />}
              variant="ghost"
              display={{ base: "inline-flex", lg: "none" }}
              onClick={onOpen}
            />
          </HStack>
        </Flex>
      </SectionContainer>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="app.surface" color="app.text">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor="app.border">
            ZURA menu
          </DrawerHeader>
          <DrawerBody py={5}>
            <Stack spacing={5}>
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  fontWeight="semibold"
                >
                  {item.label}
                </Link>
              ))}
              <Button onClick={onClose}>Get started</Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

/* ---------- Hero: photo collage ---------- */
function Hero() {
  const blob = useColorModeValue("#EBC79F", "#5B3320");
  const frame = useColorModeValue("#FAF2E5", "#1A0E08");

  return (
    <Box id="home" position="relative" overflow="hidden">
      <Box
        position="absolute"
        top="-120px"
        right="-120px"
        w="520px"
        h="520px"
        borderRadius="full"
        bg={blob}
        filter="blur(90px)"
        opacity={0.7}
      />
      <SectionContainer py={{ base: 12, md: 16, lg: 20 }} position="relative">
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 12, lg: 12 }}
          alignItems="center"
        >
          <Stack spacing={{ base: 5, md: 6 }} maxW="620px" zIndex={1}>
            <Eyebrow>A home for creators</Eyebrow>
            <Heading
              as="h1"
              fontSize={{ base: "4xl", sm: "5xl", md: "6xl", xl: "7xl" }}
              lineHeight={{ base: 1.03, md: 0.98 }}
              letterSpacing="-0.055em"
            >
              Create. Connect.{" "}
              <Box
                as="span"
                color="app.accent"
                position="relative"
                display="inline-block"
              >
                Collaborate. Grow.
                <Box
                  position="absolute"
                  left={0}
                  right={0}
                  bottom="-2px"
                  h="8px"
                  bg="app.accent"
                  opacity={0.18}
                  borderRadius="full"
                />
              </Box>
            </Heading>
            <Text
              color="app.muted"
              maxW="530px"
              fontSize={{ base: "md", md: "lg" }}
              lineHeight="1.8"
            >
              A creative community for builders, artists, and dreamers to share
              work, learn together, and find their next opportunity.
            </Text>
            <HStack spacing={3} flexWrap="wrap">
              <Button
                size="lg"
                rightIcon={<FiArrowRight />}
                as="a"
                href="#pricing"
              >
                Get started free
              </Button>
              <Button size="lg" variant="outlineApp" leftIcon={<FiPlay />}>
                Watch overview
              </Button>
            </HStack>
            <HStack spacing={3} pt={2}>
              <AvatarGroup size="md" max={5}>
                {[5, 12, 32, 47, 15].map((n) => (
                  <Avatar key={n} src={avatar(n)} borderColor={frame} />
                ))}
              </AvatarGroup>
              <Box>
                <HStack spacing={1} color="#D7A24A">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Icon
                      key={i}
                      as={FiStar}
                      fill="currentColor"
                      boxSize={3.5}
                    />
                  ))}
                </HStack>
                <Text fontWeight="800" fontSize="sm">
                  Loved by 10K+ creators
                </Text>
              </Box>
            </HStack>
          </Stack>

          {/* Collage */}
          <Box position="relative" h={{ base: "420px", md: "560px" }}>
            <Box
              position="absolute"
              top={0}
              right={{ base: 0, md: 6 }}
              w="62%"
              h="72%"
              borderRadius="3xl"
              overflow="hidden"
              boxShadow="0 30px 70px rgba(63,30,12,.28)"
              transform="rotate(2deg)"
            >
              <Pic id={IMG.team} w={900} />
              <Box
                position="absolute"
                inset={0}
                bgGradient="linear(to-t, rgba(30,14,6,.55), transparent 55%)"
              />
              <Text
                position="absolute"
                left={4}
                bottom={4}
                color="#FFF0DD"
                fontWeight="800"
                fontSize="sm"
              >
                Make space for your next big idea.
              </Text>
            </Box>
            <Box
              position="absolute"
              bottom={{ base: "6%", md: "4%" }}
              left={0}
              w="46%"
              h="46%"
              borderRadius="3xl"
              overflow="hidden"
              border="6px solid"
              borderColor={frame}
              boxShadow="0 24px 60px rgba(63,30,12,.25)"
              transform="rotate(-4deg)"
            >
              <Pic id={IMG.design} w={700} />
            </Box>
            <Box
              position="absolute"
              bottom={0}
              right={0}
              w="34%"
              h="32%"
              borderRadius="2xl"
              overflow="hidden"
              border="6px solid"
              borderColor={frame}
              boxShadow="0 24px 60px rgba(63,30,12,.25)"
              transform="rotate(5deg)"
            >
              <Pic id={IMG.camera} w={500} />
            </Box>
            <Box
              position="absolute"
              top="8%"
              left={{ base: 0, md: -2 }}
              bg="app.card"
              border="1px solid"
              borderColor="app.border"
              borderRadius="xl"
              px={4}
              py={3}
              boxShadow="xl"
              backdropFilter="blur(10px)"
            >
              <HStack spacing={3}>
                <Avatar size="sm" src={avatar(47)} />
                <Box>
                  <Text fontWeight="800" fontSize="sm">
                    Aanya joined Design Circle
                  </Text>
                  <Text fontSize="xs" color="app.muted">
                    2 minutes ago
                  </Text>
                </Box>
              </HStack>
            </Box>
            <Box
              position="absolute"
              top="46%"
              right={{ base: 0, md: -3 }}
              bg="app.accent"
              color="white"
              borderRadius="full"
              px={4}
              py={2}
              boxShadow="xl"
            >
              <HStack spacing={2}>
                <Icon as={FiHeart} fill="currentColor" />
                <Text fontSize="sm" fontWeight="800">
                  2.1K
                </Text>
              </HStack>
            </Box>
          </Box>
        </SimpleGrid>
      </SectionContainer>
    </Box>
  );
}

/* ---------- Categories ---------- */
function Categories() {
  return (
    <Box bg="app.surface" borderY="1px solid" borderColor="app.border">
      <SectionContainer py={6}>
        <Stack spacing={5} align="center">
          <Text fontFamily="heading" fontWeight="700" textAlign="center">
            A place for every kind of creator
          </Text>
          <Flex
            w="full"
            justify="center"
            align="center"
            gap={{ base: 3, md: 4 }}
            wrap="wrap"
          >
            {categories.map(({ label, icon: CategoryIcon }) => (
              <HStack
                key={label}
                spacing={2}
                px={4}
                py={2}
                bg="app.card"
                border="1px solid"
                borderColor="app.border"
                borderRadius="full"
                transition="all 160ms ease"
                _hover={{
                  borderColor: "app.accent",
                  transform: "translateY(-2px)",
                }}
              >
                <Icon as={CategoryIcon} boxSize={4} color="app.accent" />
                <Text fontSize="sm" fontWeight="semibold" color="app.text">
                  {label}
                </Text>
              </HStack>
            ))}
            <Text color="app.accent" fontSize="sm" fontWeight="bold">
              and more...
            </Text>
          </Flex>
        </Stack>
      </SectionContainer>
    </Box>
  );
}

/* ---------- Features ---------- */
function Features() {
  return (
    <SectionContainer id="features" py={{ base: 14, md: 20 }}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 10, lg: 14 }}
        alignItems="center"
      >
        <Stack spacing={6} maxW="520px">
          <SectionTitle
            eyebrow="Made for makers"
            title="Everything a creator needs, in one place."
            text="From sharing your work to finding your next collaboration, ZURA brings your creative world together."
          />
          <Box
            position="relative"
            h={{ base: "200px", md: "240px" }}
            borderRadius="3xl"
            overflow="hidden"
            boxShadow="0 20px 50px rgba(63,30,12,.18)"
          >
            <Pic id={IMG.desk} w={900} />
            <Box
              position="absolute"
              inset={0}
              bgGradient="linear(to-r, rgba(47,24,11,.7), transparent)"
            />
            <Stack
              position="absolute"
              left={5}
              bottom={5}
              spacing={1}
              color="#FFF0DD"
            >
              <Text fontWeight="800" fontSize="lg">
                Less noise. More making.
              </Text>
              <Text fontSize="sm" opacity={0.85}>
                A calmer feed built around your craft.
              </Text>
            </Stack>
          </Box>
          <Button
            alignSelf="flex-start"
            rightIcon={<FiArrowRight />}
            as="a"
            href="#showcase"
          >
            Explore the features
          </Button>
        </Stack>
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
          {features.map(({ icon: FeatureIcon, tint, title, text }) => (
            <Stack
              key={title}
              bg="app.card"
              border="1px solid"
              borderColor="app.border"
              borderRadius="2xl"
              p={{ base: 4, md: 5 }}
              minH={{ base: "auto", sm: "170px" }}
              spacing={3}
              transition="all 200ms ease"
              _hover={lift}
            >
              <Flex
                w="44px"
                h="44px"
                align="center"
                justify="center"
                borderRadius="xl"
                bg={tint}
                color="#32190D"
              >
                <Icon as={FeatureIcon} boxSize={5} />
              </Flex>
              <Text fontWeight="800">{title}</Text>
              <Text fontSize="sm" color="app.muted" lineHeight="1.65">
                {text}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </SimpleGrid>
    </SectionContainer>
  );
}

/* ---------- Showcase gallery (new) ---------- */
function Showcase() {
  return (
    <Box
      id="showcase"
      bg="app.surface"
      borderY="1px solid"
      borderColor="app.border"
    >
      <SectionContainer py={{ base: 14, md: 20 }}>
        <Stack spacing={10}>
          <SectionTitle
            centered
            eyebrow="Fresh from the community"
            title="Work worth stopping for."
            text="A peek at what creators are sharing on ZURA right now."
          />
          <Box
            sx={{ columnCount: { base: 1, sm: 2, lg: 3 }, columnGap: "16px" }}
          >
            {showcase.map((item) => (
              <Box
                key={item.title}
                position="relative"
                mb={4}
                h={item.h}
                borderRadius="2xl"
                overflow="hidden"
                sx={{ breakInside: "avoid" }}
                role="group"
                cursor="pointer"
                transition="all 220ms ease"
                _hover={lift}
              >
                <Pic
                  id={item.img}
                  w={800}
                  transition="transform 500ms ease"
                  _groupHover={{ transform: "scale(1.06)" }}
                />
                <Box
                  position="absolute"
                  inset={0}
                  bgGradient="linear(to-t, rgba(30,14,6,.78), transparent 55%)"
                />
                <Flex
                  position="absolute"
                  left={4}
                  right={4}
                  bottom={4}
                  justify="space-between"
                  align="flex-end"
                  color="#FFF0DD"
                >
                  <Box>
                    <Text fontWeight="800" fontSize="sm">
                      {item.title}
                    </Text>
                    <Text fontSize="xs" opacity={0.8}>
                      by {item.by}
                    </Text>
                  </Box>
                  <HStack
                    spacing={1}
                    bg="blackAlpha.500"
                    px={2.5}
                    py={1}
                    borderRadius="full"
                    backdropFilter="blur(6px)"
                  >
                    <Icon as={FiHeart} boxSize={3} />
                    <Text fontSize="xs" fontWeight="bold">
                      {item.likes}
                    </Text>
                  </HStack>
                </Flex>
              </Box>
            ))}
          </Box>
        </Stack>
      </SectionContainer>
    </Box>
  );
}

/* ---------- Communities ---------- */
function Communities() {
  const [joined, setJoined] = useState([]);
  return (
    <Box id="communities">
      <SectionContainer py={{ base: 14, md: 20 }}>
        <Flex
          justify="space-between"
          align={{ base: "flex-start", md: "flex-end" }}
          gap={5}
          mb={10}
          direction={{ base: "column", md: "row" }}
        >
          <SectionTitle
            eyebrow="Find your circle"
            title="Find your people. Build something together."
            text="Join communities around your interests, share what you know, and make things as a team."
          />
          <Button
            variant="outlineApp"
            rightIcon={<FiArrowRight />}
            flexShrink={0}
          >
            Explore communities
          </Button>
        </Flex>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={5}>
          {communities.map((community) => {
            const isJoined = joined.includes(community.name);
            return (
              <Box
                key={community.name}
                bg="app.card"
                border="1px solid"
                borderColor="app.border"
                borderRadius="2xl"
                overflow="hidden"
                role="group"
                transition="all 200ms ease"
                _hover={lift}
              >
                <Box
                  position="relative"
                  h="160px"
                  bg={community.color}
                  overflow="hidden"
                >
                  <Pic
                    id={community.img}
                    w={600}
                    transition="transform 500ms ease"
                    _groupHover={{ transform: "scale(1.08)" }}
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    bg={community.color}
                    opacity={0.35}
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    bgGradient="linear(to-t, rgba(20,8,3,.65), transparent 60%)"
                  />
                  <Badge
                    position="absolute"
                    top={3}
                    left={3}
                    bg="blackAlpha.600"
                    color="white"
                    borderRadius="full"
                    px={3}
                    py={1}
                    backdropFilter="blur(6px)"
                    textTransform="none"
                  >
                    {community.members}
                  </Badge>
                </Box>
                <Stack p={4} spacing={4}>
                  <Box>
                    <Text fontWeight="800">{community.name}</Text>
                    <Text fontSize="sm" color="app.muted" mt={1}>
                      {community.description}
                    </Text>
                  </Box>
                  <Flex justify="space-between" align="center">
                    <AvatarGroup size="xs" max={3}>
                      {community.faces.map((n) => (
                        <Avatar key={n} src={avatar(n)} />
                      ))}
                    </AvatarGroup>
                    <Button
                      size="sm"
                      variant={isJoined ? "outlineApp" : "brand"}
                      onClick={() =>
                        setJoined((cur) =>
                          isJoined
                            ? cur.filter((n) => n !== community.name)
                            : [...cur, community.name],
                        )
                      }
                    >
                      {isJoined ? "Joined ✓" : "Join"}
                    </Button>
                  </Flex>
                </Stack>
              </Box>
            );
          })}
        </SimpleGrid>
      </SectionContainer>
    </Box>
  );
}

/* ---------- App promo / gigs ---------- */
function PhoneFrame({ children, label, ...props }) {
  const phoneBg = useColorModeValue("#2B1A11", "#100905");
  const borderColor = useColorModeValue("#20120B", "#070403");
  return (
    <Stack
      w={{ base: "min(100%, 250px)", md: "235px" }}
      minH="410px"
      bg={phoneBg}
      color="#F8EBDD"
      border="7px solid"
      borderColor={borderColor}
      borderRadius="36px"
      p={4}
      spacing={4}
      boxShadow="0 28px 55px rgba(42, 20, 8, .32)"
      position="relative"
      overflow="hidden"
      {...props}
    >
      <Flex align="center" justify="space-between">
        <Text fontSize="xs" fontWeight="bold" letterSpacing="0.12em">
          ZURA
        </Text>
        <HStack spacing={1}>
          <Box w="4px" h="4px" borderRadius="full" bg="#D8AD7B" />
          <Box w="4px" h="4px" borderRadius="full" bg="#D8AD7B" />
          <Box w="16px" h="7px" border="1px solid #D8AD7B" borderRadius="sm" />
        </HStack>
      </Flex>
      {label && (
        <Text fontSize="xs" color="#D8B89A">
          {label}
        </Text>
      )}
      {children}
    </Stack>
  );
}

function AppPromo() {
  return (
    <Box
      id="gigs"
      bg="app.surface"
      borderY="1px solid"
      borderColor="app.border"
      overflow="hidden"
    >
      <SectionContainer py={{ base: 14, md: 20 }}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 12, lg: 14 }}
          alignItems="center"
        >
          <Stack spacing={5} maxW="520px">
            <Eyebrow>More than a feed</Eyebrow>
            <Heading
              fontSize={{ base: "3xl", md: "5xl" }}
              lineHeight="1.08"
              letterSpacing="-0.04em"
            >
              Your creative world, wherever you go.
            </Heading>
            <Text color="app.muted" lineHeight="1.8">
              Keep up with conversations, discover communities, show off your
              work, and spot opportunities without losing your momentum.
            </Text>
            <HStack flexWrap="wrap" spacing={3}>
              <Button
                leftIcon={<FaApple />}
                bg="#17100C"
                color="#FFF1DF"
                _hover={{ bg: "#352116" }}
              >
                App Store
              </Button>
              <Button leftIcon={<FaGooglePlay />} variant="outlineApp">
                Google Play
              </Button>
            </HStack>
            <Text fontSize="xs" color="app.muted">
              Mobile app availability can be updated when your store listings
              are ready.
            </Text>
          </Stack>

          <Flex
            justify="center"
            align="center"
            gap={{ base: 3, md: 5 }}
            wrap="wrap"
          >
            <PhoneFrame
              label="Creator profile"
              transform={{ base: "rotate(-4deg)", md: "rotate(-6deg)" }}
            >
              <Stack align="center" spacing={2}>
                <Avatar
                  size="xl"
                  src={avatar(12)}
                  name="Code Ferret"
                  border="3px solid #DCA36D"
                />
                <Text fontWeight="800">CodeFerret</Text>
                <Text fontSize="xs" color="#D4B9A0">
                  Full Stack Developer
                </Text>
                <HStack spacing={4} fontSize="xs" textAlign="center">
                  <Box>
                    <Text fontWeight="bold">24</Text>
                    <Text color="#C7A98E">Posts</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">1.2K</Text>
                    <Text color="#C7A98E">Followers</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">180</Text>
                    <Text color="#C7A98E">Following</Text>
                  </Box>
                </HStack>
                <Button
                  size="sm"
                  w="full"
                  bg="#DCA36D"
                  color="#32190D"
                  _hover={{ bg: "#E9B981" }}
                >
                  Follow creator
                </Button>
              </Stack>
              <Box borderTop="1px solid" borderColor="whiteAlpha.200" pt={3}>
                <Text fontSize="xs" fontWeight="bold" mb={2}>
                  Recent work
                </Text>
                <SimpleGrid columns={2} spacing={2}>
                  <Box h="70px" borderRadius="md" overflow="hidden">
                    <Pic id={IMG.code} w={300} />
                  </Box>
                  <Box h="70px" borderRadius="md" overflow="hidden">
                    <Pic id={IMG.desk} w={300} />
                  </Box>
                </SimpleGrid>
              </Box>
            </PhoneFrame>

            <PhoneFrame label="Fresh opportunities" mt={{ base: 0, md: 10 }}>
              <HStack justify="space-between">
                <Text fontWeight="800">Gigs for you</Text>
                <FiSearch />
              </HStack>
              {gigs.map((gig) => (
                <Stack
                  key={gig.role}
                  bg="whiteAlpha.100"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  borderRadius="xl"
                  p={3}
                  spacing={2}
                >
                  <HStack align="start" spacing={2}>
                    <Box
                      w="36px"
                      h="36px"
                      borderRadius="lg"
                      overflow="hidden"
                      flexShrink={0}
                    >
                      <Pic id={gig.img} w={120} />
                    </Box>
                    <Box flex="1">
                      <Text fontSize="xs" fontWeight="800">
                        {gig.role}
                      </Text>
                      <Text fontSize="10px" color="#D4B9A0">
                        {gig.type}
                      </Text>
                    </Box>
                  </HStack>
                  <Flex justify="space-between" align="center" gap={2}>
                    <Text fontSize="xs" color="#F2D0A9" fontWeight="bold">
                      {gig.pay}
                    </Text>
                    <Button
                      size="xs"
                      bg="#DCA36D"
                      color="#32190D"
                      _hover={{ bg: "#E9B981" }}
                    >
                      Apply
                    </Button>
                  </Flex>
                </Stack>
              ))}
            </PhoneFrame>
          </Flex>
        </SimpleGrid>
      </SectionContainer>
    </Box>
  );
}

/* ---------- Stats on a photo banner ---------- */
function Stats() {
  return (
    <Box position="relative" color="#FFF0DD" overflow="hidden">
      <Box position="absolute" inset={0}>
        <Pic id={IMG.collab} w={1600} />
      </Box>
      <Box position="absolute" inset={0} bg="rgba(47, 24, 11, 0.86)" />
      <SectionContainer py={{ base: 12, md: 16 }} position="relative">
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 8, md: 4 }}>
          {stats.map(({ icon: StatIcon, value, label }) => (
            <Stack key={label} align="center" spacing={1} textAlign="center">
              <Flex
                w="48px"
                h="48px"
                borderRadius="full"
                bg="whiteAlpha.200"
                align="center"
                justify="center"
                mb={1}
              >
                <Icon as={StatIcon} boxSize={5} color="#E9B981" />
              </Flex>
              <Heading fontSize={{ base: "3xl", md: "4xl" }}>{value}</Heading>
              <Text fontSize="sm" opacity={0.8}>
                {label}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </SectionContainer>
    </Box>
  );
}

/* ---------- Testimonials (new) ---------- */
function Testimonials() {
  return (
    <SectionContainer py={{ base: 14, md: 20 }}>
      <Stack spacing={10}>
        <SectionTitle
          centered
          eyebrow="Kind words"
          title="Creators who found their circle."
        />
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
          {testimonials.map((t) => (
            <Stack
              key={t.name}
              bg="app.card"
              border="1px solid"
              borderColor="app.border"
              borderRadius="2xl"
              p={6}
              spacing={5}
              justify="space-between"
              transition="all 200ms ease"
              _hover={lift}
            >
              <Text fontSize="lg" lineHeight="1.6" fontWeight="600">
                “{t.quote}”
              </Text>
              <HStack spacing={3}>
                <Avatar src={avatar(t.face)} name={t.name} />
                <Box>
                  <Text fontWeight="800" fontSize="sm">
                    {t.name}
                  </Text>
                  <Text fontSize="xs" color="app.muted">
                    {t.role}
                  </Text>
                </Box>
              </HStack>
            </Stack>
          ))}
        </SimpleGrid>
      </Stack>
    </SectionContainer>
  );
}

/* ---------- Pricing ---------- */
function Pricing() {
  const [yearly, setYearly] = useState(false);
  const mutedBorder = useColorModeValue("#D9BFA4", "#4A2D1B");
  return (
    <Stack spacing={10}>
      <Flex
        justify="space-between"
        align={{ base: "flex-start", md: "flex-end" }}
        gap={4}
        direction={{ base: "column", sm: "row" }}
      >
        <SectionTitle
          eyebrow="Pricing"
          title="Simple plans. Room to grow."
          text="Start for free and upgrade when you need more tools for your creative work."
        />
        <ButtonGroup isAttached size="sm" flexShrink={0}>
          <Button
            variant={!yearly ? "brand" : "outlineApp"}
            onClick={() => setYearly(false)}
          >
            Monthly
          </Button>
          <Button
            variant={yearly ? "brand" : "outlineApp"}
            onClick={() => setYearly(true)}
          >
            Yearly · Save 20%
          </Button>
        </ButtonGroup>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} alignItems="stretch">
        {plans.map(({ name, price, perks, cta, popular }) => {
          const shownPrice =
            yearly && price > 0 ? Math.round(price * 0.8) : price;
          return (
            <Stack
              key={name}
              position="relative"
              bg="app.card"
              border="1px solid"
              borderColor={popular ? "app.accent" : mutedBorder}
              borderWidth={popular ? "2px" : "1px"}
              borderRadius="2xl"
              p={{ base: 5, md: 6 }}
              spacing={5}
              boxShadow={
                popular ? "0 20px 50px rgba(110, 60, 25, .18)" : "none"
              }
              mt={{ base: 0, md: popular ? 0 : 3 }}
            >
              {popular && (
                <Badge
                  alignSelf="flex-start"
                  bg="app.accent"
                  color="white"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  Most popular
                </Badge>
              )}
              <Box>
                <Heading size="md">{name}</Heading>
                <HStack align="baseline" spacing={1} mt={3}>
                  <Heading fontSize="4xl">₹{shownPrice}</Heading>
                  <Text color="app.muted" fontSize="sm">
                    / month
                  </Text>
                </HStack>
                {yearly && price > 0 && (
                  <Text fontSize="xs" color="app.muted" mt={1}>
                    Billed annually
                  </Text>
                )}
              </Box>
              <List spacing={3} flex="1">
                {perks.map((perk) => (
                  <ListItem
                    key={perk}
                    display="flex"
                    alignItems="flex-start"
                    fontSize="sm"
                  >
                    <ListIcon as={FiCheck} color="app.accent" mt="3px" />
                    <Text>{perk}</Text>
                  </ListItem>
                ))}
              </List>
              <Button
                variant={popular ? "brand" : "outlineApp"}
                as="a"
                href="#home"
              >
                {cta}
              </Button>
            </Stack>
          );
        })}
      </SimpleGrid>
      <Text color="app.muted" fontSize="xs">
        Pricing is sample UI content; confirm final plan limits and billing
        terms before launch.
      </Text>
    </Stack>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: 10, lg: 16 }}
      alignItems="start"
    >
      <Stack spacing={6} position={{ lg: "sticky" }} top={{ lg: "110px" }}>
        <SectionTitle
          eyebrow="FAQ"
          title="A few things you might be wondering."
          text="Quick answers to help you get started with ZURA."
        />
        <Box
          position="relative"
          h={{ base: "190px", md: "230px" }}
          borderRadius="3xl"
          overflow="hidden"
          boxShadow="0 20px 50px rgba(63,30,12,.18)"
        >
          <Pic id={IMG.team} w={900} />
          <Box position="absolute" inset={0} bg="rgba(47,24,11,.7)" />
          <Stack
            position="absolute"
            inset={0}
            p={6}
            justify="center"
            spacing={3}
            color="#FFF0DD"
            align="flex-start"
          >
            <Text fontWeight="800" fontSize="xl">
              Still curious? Come say hi.
            </Text>
            <Button
              size="sm"
              leftIcon={<FaDiscord />}
              bg="#FFF0DD"
              color="#32190D"
              _hover={{ bg: "#fff" }}
            >
              Join our Discord
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Accordion allowToggle borderTop="1px solid" borderColor="app.border">
        {faqs.map(({ q, a }) => (
          <AccordionItem key={q} borderColor="app.border">
            <AccordionButton px={0} py={5} _hover={{ bg: "transparent" }}>
              <Box flex="1" textAlign="left" fontSize="md" fontWeight="800">
                {q}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel
              px={0}
              pb={5}
              color="app.muted"
              fontSize="sm"
              lineHeight="1.8"
            >
              {a}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </SimpleGrid>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const socialLinks = [
    { label: "Instagram", icon: FaInstagram },
    { label: "X", icon: FaXTwitter },
    { label: "YouTube", icon: FaYoutube },
    { label: "Discord", icon: FaDiscord },
  ];
  return (
    <Box
      as="footer"
      bg="app.surface"
      borderTop="1px solid"
      borderColor="app.border"
    >
      <SectionContainer py={{ base: 10, md: 14 }}>
        <Grid
          templateColumns={{
            base: "repeat(2, minmax(0, 1fr))",
            md: "1.5fr repeat(3, 1fr)",
          }}
          gap={{ base: 8, md: 6 }}
        >
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <Stack spacing={3} maxW="260px">
              <Heading color="app.brand" fontSize="2xl" letterSpacing="-0.06em">
                ZURA
              </Heading>
              <Text color="app.muted" fontSize="sm" lineHeight="1.7">
                A home for creators, builders, and dreamers.
              </Text>
              <HStack spacing={2}>
                {socialLinks.map(({ label, icon: SocialIcon }) => (
                  <IconButton
                    key={label}
                    aria-label={label}
                    icon={<SocialIcon />}
                    variant="outlineApp"
                    size="sm"
                  />
                ))}
              </HStack>
            </Stack>
          </GridItem>
          {footerColumns.map((column) => (
            <GridItem key={column.title}>
              <Stack spacing={3} align="flex-start">
                <Text fontWeight="800" fontSize="sm">
                  {column.title}
                </Text>
                {column.items.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    color="app.muted"
                    fontSize="sm"
                    _hover={{ color: "app.accent" }}
                  >
                    {label}
                  </Link>
                ))}
              </Stack>
            </GridItem>
          ))}
        </Grid>
        <Flex
          mt={10}
          pt={5}
          borderTop="1px solid"
          borderColor="app.border"
          justify="space-between"
          gap={3}
          wrap="wrap"
        >
          <Text fontSize="xs" color="app.muted">
            © {new Date().getFullYear()} ZURA. Made for creators.
          </Text>
          <Text fontSize="xs" color="app.muted">
            Create · Connect · Collaborate · Grow
          </Text>
        </Flex>
      </SectionContainer>
    </Box>
  );
}

export default function Home() {
  const pageBg = useColorModeValue("#FAF2E5", "#1A0E08");
  return (
    <Box bg={pageBg} color="app.text" minH="100vh" overflowX="clip">
      <Navbar />
      <Hero />
      <Categories />
      <Features />
      <Showcase />
      <Communities />
      <AppPromo />
      <Stats />
      <Testimonials />
      <SectionContainer id="pricing" py={{ base: 14, md: 20 }}>
        <Pricing />
      </SectionContainer>
      <Box
        id="faq"
        bg="app.surface"
        borderTop="1px solid"
        borderColor="app.border"
      >
        <SectionContainer py={{ base: 14, md: 20 }}>
          <Faq />
        </SectionContainer>
      </Box>
      <Footer />
    </Box>
  );
}
