"use client";

import {
  AvatarGroup,
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Progress,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import { creatorById } from "@/data/mock";
import { useApp } from "@/context/AppContext";

export default function ProjectCard({ project }) {
  const { has, toggle } = useApp();
  const toast = useToast();
  const joined = has("joined", project.id);
  const owner = creatorById(project.ownerId);

  const onJoin = () => {
    toggle("joined", project.id);
    if (!joined) toast({ title: `You joined “${project.title}”`, status: "success", duration: 2000 });
  };

  return (
    <Box
      rounded="2xl"
      overflow="hidden"
      bg="app.card"
      border="1px solid"
      borderColor="app.border"
      transition="transform .15s, box-shadow .15s"
      _hover={{ transform: "translateY(-2px)", shadow: "md" }}
    >
      <Box position="relative">
        <Image src={project.cover} alt="" w="full" h="150px" objectFit="cover" fallback={<Box h="150px" bg="app.cardAlt" />} />
        <Badge
          position="absolute"
          top={3}
          left={3}
          rounded="full"
          px={3}
          py={0.5}
          colorScheme={project.status === "Open" ? "green" : "orange"}
        >
          {project.status}
        </Badge>
      </Box>
      <Box p={4}>
        <Text fontWeight={700}>{project.title}</Text>
        <Text fontSize="xs" color="app.muted" mt={0.5}>
          by {owner?.name}
        </Text>
        <Text fontSize="sm" color="app.muted" mt={2} noOfLines={2} minH="40px">
          {project.description}
        </Text>

        <Flex justify="space-between" fontSize="xs" color="app.muted" mt={3} mb={1}>
          <Text>Progress</Text>
          <Text>{project.progress}%</Text>
        </Flex>
        <Progress value={project.progress} size="xs" rounded="full" bg="app.cardAlt" sx={{ "& > div": { background: "var(--chakra-colors-app-brand)" } }} />

        <HStack spacing={1.5} mt={3} flexWrap="wrap">
          {project.tags.map((t) => (
            <Tag key={t} size="sm">
              {t}
            </Tag>
          ))}
        </HStack>

        <Flex mt={4} align="center" justify="space-between">
          <AvatarGroup size="xs" max={3}>
            {project.members.map((m, i) => (
              <Avatar key={i} src={m} />
            ))}
          </AvatarGroup>
          <Button size="sm" variant={joined ? "outlineApp" : "brand"} px={5} onClick={onJoin}>
            {joined ? "Joined" : "Join project"}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
