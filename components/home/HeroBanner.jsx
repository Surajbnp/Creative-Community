"use client";

import NextLink from "next/link";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { pic } from "@/data/mock";

export default function HeroBanner() {
  const demo = useDisclosure();

  return (
    <>
      <Box
        position="relative"
        overflow="hidden"
        rounded="2xl"
        minH={{ base: "200px", md: "240px" }}
        color="#FFF1E3"
        bgGradient="linear(to-r, #4A2412, #7B4527 60%, #2E170C)"
        border="1px solid"
        borderColor="app.border"
      >
        <Image
          src={pic("zura-hero-desk", 900, 500)}
          alt=""
          position="absolute"
          top={0}
          right={0}
          h="full"
          w={{ base: "70%", md: "58%" }}
          objectFit="cover"
          opacity={0.5}
          filter="sepia(.7) saturate(1.2) brightness(.8)"
          sx={{
            maskImage: "linear-gradient(to right, transparent, #000 55%)",
            WebkitMaskImage: "linear-gradient(to right, transparent, #000 55%)",
          }}
          fallback={<Box />}
        />
        <Flex position="relative" direction="column" justify="center" h="full" p={{ base: 5, md: 9 }} gap={3} minH="inherit">
          <Heading
            as="h1"
            fontFamily="heading"
            fontWeight={500}
            fontSize={{ base: "28px", md: "42px" }}
            lineHeight={1.12}
            maxW="460px"
          >
            Create. Connect.
            <br />
            Collaborate. Grow.
          </Heading>
          <Text fontSize={{ base: "xs", md: "sm" }} maxW="360px" opacity={0.9}>
            A home for creators to build, share, learn and find opportunities together.
          </Text>
          <Flex gap={3} mt={1} flexWrap="wrap">
            <Button
              as={NextLink}
              href="/discover"
              size="sm"
              h="40px"
              px={5}
              bg="#FBEBDC"
              color="#4A2412"
              _hover={{ bg: "#fff" }}
              rightIcon={<FiArrowRight />}
            >
              Explore Now
            </Button>
            <Button
              size="sm"
              h="40px"
              px={5}
              variant="outline"
              color="#FFF1E3"
              borderColor="rgba(255,241,227,.5)"
              _hover={{ bg: "rgba(255,255,255,.1)" }}
              leftIcon={<FiPlay />}
              onClick={demo.onOpen}
            >
              Watch Demo
            </Button>
          </Flex>
        </Flex>
      </Box>

      <Modal isOpen={demo.isOpen} onClose={demo.onClose} isCentered size="3xl">
        <ModalOverlay />
        <ModalContent mx={4} overflow="hidden" bg="black">
          <ModalCloseButton color="white" zIndex={2} />
          <AspectRatio ratio={16 / 9}>
            {/* Replace with your real demo video / embed URL */}
            <Flex direction="column" color="white" bgGradient="linear(to-br, #4A2412, #140E0B)" gap={2}>
              <FiPlay size={44} />
              <Text fontSize="sm" opacity={0.8}>
                Demo video placeholder
              </Text>
            </Flex>
          </AspectRatio>
        </ModalContent>
      </Modal>
    </>
  );
}
