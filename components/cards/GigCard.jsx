"use client";

import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaBookmark } from "react-icons/fa";
import { FiBookmark, FiMapPin } from "react-icons/fi";
import { useApp } from "@/context/AppContext";

export function GigLogo({ logo, size = "48px" }) {
  return (
    <Flex
      boxSize={size}
      rounded="xl"
      bg={logo.bg}
      color={logo.fg}
      align="center"
      justify="center"
      fontWeight={800}
      fontSize="xl"
      flexShrink={0}
    >
      {logo.letter}
    </Flex>
  );
}

export default function GigCard({ gig, compact = false }) {
  const { has, toggle } = useApp();
  const disclosure = useDisclosure();
  const toast = useToast();
  const saved = has("saved", gig.id);
  const applied = has("applied", gig.id);

  const apply = () => {
    toggle("applied", gig.id);
    if (!applied) toast({ title: "Application sent", description: `${gig.title} · ${gig.company}`, status: "success", duration: 2400 });
    else toast({ title: "Application withdrawn", status: "info", duration: 1800 });
  };

  return (
    <>
      <Box
        p={compact ? 3 : 4}
        rounded="2xl"
        bg="app.card"
        border="1px solid"
        borderColor="app.border"
        transition="box-shadow .15s, transform .15s"
        _hover={{ shadow: "md" }}
      >
        <Flex gap={3} align="flex-start">
          <GigLogo logo={gig.logo} size={compact ? "42px" : "52px"} />
          <Box flex="1" minW={0}>
            <Text fontWeight={700} fontSize={compact ? "sm" : "md"} noOfLines={1}>
              {gig.title}
            </Text>
            <Text fontSize="xs" color="app.muted" noOfLines={1}>
              {gig.mode} · {gig.type}
              {!compact && ` · ${gig.company}`}
            </Text>
            <Text fontWeight={600} fontSize="sm" mt={1}>
              {gig.pay}
            </Text>
          </Box>
          <IconButton
            aria-label={saved ? "Remove bookmark" : "Bookmark gig"}
            aria-pressed={saved}
            size="sm"
            variant="ghostApp"
            rounded="full"
            icon={saved ? <FaBookmark /> : <FiBookmark />}
            color={saved ? "app.brand" : "app.muted"}
            onClick={() => toggle("saved", gig.id)}
          />
        </Flex>
        <Flex mt={3} align="center" justify="space-between" gap={2}>
          <HStack spacing={2} overflow="hidden">
            {gig.tags.map((t) => (
              <Tag key={t} size="sm">
                {t}
              </Tag>
            ))}
          </HStack>
          <Button size="sm" variant="soft" px={5} onClick={disclosure.onOpen} flexShrink={0}>
            View
          </Button>
        </Flex>
      </Box>

      <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose} isCentered size="lg" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader pr={12}>
            <Flex gap={3} align="center">
              <GigLogo logo={gig.logo} />
              <Box>
                <Text fontSize="lg" fontWeight={700}>
                  {gig.title}
                </Text>
                <Text fontSize="sm" color="app.muted" fontWeight={500}>
                  {gig.company}
                </Text>
              </Box>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack spacing={2} mb={4} flexWrap="wrap">
              <Badge colorScheme="orange" rounded="md" px={2}>
                {gig.mode}
              </Badge>
              <Badge rounded="md" px={2}>
                {gig.type}
              </Badge>
              <Flex align="center" gap={1} fontSize="sm" color="app.muted">
                <FiMapPin /> {gig.location}
              </Flex>
              <Text fontSize="sm" color="app.muted">
                · {gig.posted}
              </Text>
            </HStack>
            <Text fontWeight={700} fontSize="xl" mb={3}>
              {gig.pay}
            </Text>
            <Text color="app.muted" lineHeight="tall">
              {gig.description}
            </Text>
            <HStack spacing={2} mt={4} flexWrap="wrap">
              {gig.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </HStack>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button
              variant="soft"
              leftIcon={saved ? <FaBookmark /> : <FiBookmark />}
              onClick={() => toggle("saved", gig.id)}
            >
              {saved ? "Saved" : "Save"}
            </Button>
            <Button onClick={apply} px={8}>
              {applied ? "Applied ✓" : "Apply now"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
