"use client";

import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Tag,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaBookmark, FaHeart } from "react-icons/fa";
import { FiBookmark, FiHeart, FiLink, FiMessageCircle, FiMoreHorizontal, FiSend, FiShare2 } from "react-icons/fi";
import Verified from "@/components/ui/Verified";
import { creatorById } from "@/data/mock";
import { useApp } from "@/context/AppContext";

function Action({ icon, label, active, activeColor, onClick, ariaLabel }) {
  return (
    <Button
      variant="ghostApp"
      size="sm"
      leftIcon={icon}
      onClick={onClick}
      color={active ? activeColor || "app.brand" : "app.text"}
      fontWeight={500}
      aria-label={ariaLabel}
      aria-pressed={active}
    >
      {label}
    </Button>
  );
}

export default function PostCard({ post }) {
  const { user, has, toggle, addComment } = useApp();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [hidden, setHidden] = useState(false);

  const author = post.authorId === "me" ? user : creatorById(post.authorId);
  const liked = has("liked", post.id);
  const saved = has("saved", post.id);
  const likeCount = post.likes + (liked ? 1 : 0);
  const commentCount = post.commentBase + post.comments.length;

  if (hidden || !author) return null;

  const share = async () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/#${post.id}` : "";
    try {
      if (navigator.share) await navigator.share({ title: "Zura", text: post.text, url });
      else {
        await navigator.clipboard.writeText(url);
        toast({ title: "Link copied", status: "success", duration: 1600 });
      }
    } catch {}
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    addComment(post.id, draft.trim());
    setDraft("");
  };

  return (
    <Box
      as="article"
      id={post.id}
      p={{ base: 4, md: 5 }}
      rounded="2xl"
      bg="app.card"
      border="1px solid"
      borderColor="app.border"
    >
      <Flex align="center" gap={3}>
        <Avatar src={author.avatar} name={author.name} size="md" />
        <Box flex="1" minW={0}>
          <Flex align="center" gap={1}>
            <Text fontWeight={700} noOfLines={1}>
              {author.name}
            </Text>
            {author.verified && <Verified />}
          </Flex>
          <Text fontSize="xs" color="app.muted" noOfLines={1}>
            @{author.handle} · {post.time}
          </Text>
        </Box>
        <Menu placement="bottom-end">
          <MenuButton as={IconButton} aria-label="Post options" icon={<FiMoreHorizontal />} variant="ghostApp" rounded="full" size="sm" />
          <MenuList>
            <MenuItem icon={<FiLink />} onClick={share}>
              Copy link
            </MenuItem>
            <MenuItem onClick={() => setHidden(true)}>Hide post</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Text mt={3} fontSize="sm" lineHeight="tall" whiteSpace="pre-wrap">
        {post.text}
      </Text>

      {post.images.length > 0 && (
        <SimpleGrid columns={post.images.length > 1 ? 2 : 1} spacing="2px" mt={3} rounded="xl" overflow="hidden">
          {post.images.slice(0, 2).map((src, i) => (
            <Image
              key={i}
              src={src}
              alt=""
              w="full"
              h={{ base: post.images.length > 1 ? "150px" : "200px", md: post.images.length > 1 ? "220px" : "280px" }}
              objectFit="cover"
              fallback={<Box h="200px" bg="app.cardAlt" />}
            />
          ))}
        </SimpleGrid>
      )}

      {post.tags.length > 0 && (
        <HStack spacing={2} mt={3} flexWrap="wrap">
          {post.tags.map((t) => (
            <Tag key={t} size="sm">
              #{t}
            </Tag>
          ))}
        </HStack>
      )}

      <Flex mt={3} pt={2} borderTop="1px solid" borderColor="app.border" justify="space-between" align="center">
        <HStack spacing={{ base: 0, md: 2 }}>
          <Action
            icon={liked ? <FaHeart /> : <FiHeart />}
            label={likeCount}
            active={liked}
            activeColor="app.danger"
            onClick={() => toggle("liked", post.id)}
            ariaLabel="Like"
          />
          <Action icon={<FiMessageCircle />} label={commentCount} active={open} onClick={() => setOpen((o) => !o)} ariaLabel="Comments" />
        </HStack>
        <HStack spacing={{ base: 0, md: 2 }}>
          <Action icon={<FiShare2 />} label="Share" onClick={share} ariaLabel="Share" />
          <Action
            icon={saved ? <FaBookmark /> : <FiBookmark />}
            label="Save"
            active={saved}
            onClick={() => toggle("saved", post.id)}
            ariaLabel="Save"
          />
        </HStack>
      </Flex>

      {open && (
        <VStack align="stretch" spacing={3} pt={3}>
          {post.comments.map((c) => {
            const a = c.authorId === "me" ? user : creatorById(c.authorId);
            return (
              <Flex key={c.id} gap={2}>
                <Avatar size="xs" src={a?.avatar} name={a?.name} />
                <Box bg="app.cardAlt" px={3} py={2} rounded="xl" fontSize="sm">
                  <Text fontWeight={700} fontSize="xs">
                    {a?.name}
                  </Text>
                  <Text>{c.text}</Text>
                </Box>
              </Flex>
            );
          })}
          <Flex as="form" onSubmit={submitComment} gap={2}>
            <Input size="sm" rounded="full" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write a comment…" />
            <IconButton type="submit" aria-label="Send comment" icon={<FiSend />} size="sm" isDisabled={!draft.trim()} />
          </Flex>
        </VStack>
      )}
    </Box>
  );
}
