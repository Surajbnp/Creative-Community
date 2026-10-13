"use client";

import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Flex,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiChevronLeft, FiSend } from "react-icons/fi";
import { creatorById } from "@/data/mock";
import { useApp } from "@/context/AppContext";

const REPLIES = [
  "Sounds great! Let's do it.",
  "Thanks for reaching out — can you share a bit more detail?",
  "Love that. I'll send over some references tonight.",
  "Perfect, let's hop on a quick call this week.",
];

export default function MessagesPage() {
  const { conversations, pushMessage, markConversationRead } = useApp();
  const [activeId, setActiveId] = useState(null); // mobile: null = list view
  const [draft, setDraft] = useState("");
  const endRef = useRef(null);

  const current = conversations.find((c) => c.id === (activeId ?? conversations[0]?.id));
  const person = current ? creatorById(current.withId) : null;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [current?.messages.length, current?.id]);

  const open = (id) => {
    setActiveId(id);
    markConversationRead(id);
  };

  const send = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !current) return;
    pushMessage(current.id, { from: "me", text });
    setDraft("");
    const id = current.id;
    setTimeout(() => {
      pushMessage(id, { from: "them", text: REPLIES[Math.floor(Math.random() * REPLIES.length)] });
    }, 1200);
  };

  const last = (c) => c.messages[c.messages.length - 1];

  return (
    <Flex
      h={{ base: "calc(100dvh - 60px - 64px - 24px)", lg: "calc(100dvh - 76px - 40px - 40px)" }}
      minH="420px"
      rounded="2xl"
      overflow="hidden"
      bg="app.card"
      border="1px solid"
      borderColor="app.border"
    >
      {/* list */}
      <Box
        w={{ base: "full", md: "320px" }}
        flexShrink={0}
        display={{ base: activeId ? "none" : "block", md: "block" }}
        borderRight={{ md: "1px solid" }}
        borderColor="app.border"
        overflowY="auto"
      >
        <Text fontWeight={700} p={4} pb={2}>
          Messages
        </Text>
        <VStack align="stretch" spacing={0}>
          {conversations.map((c) => {
            const p = creatorById(c.withId);
            const active = c.id === current?.id;
            return (
              <Flex
                key={c.id}
                as="button"
                textAlign="left"
                onClick={() => open(c.id)}
                gap={3}
                px={4}
                py={3}
                align="center"
                bg={active ? { base: "transparent", md: "app.cardAlt" } : "transparent"}
                _hover={{ bg: "app.cardAlt" }}
              >
                <Avatar src={p.avatar} name={p.name} size="md" />
                <Box flex="1" minW={0}>
                  <Flex justify="space-between" gap={2}>
                    <Text fontWeight={c.unread ? 700 : 600} fontSize="sm" noOfLines={1}>
                      {p.name}
                    </Text>
                    <Text fontSize="xs" color="app.muted" flexShrink={0}>
                      {last(c).time}
                    </Text>
                  </Flex>
                  <Text fontSize="xs" color="app.muted" noOfLines={1}>
                    {last(c).from === "me" ? "You: " : ""}
                    {last(c).text}
                  </Text>
                </Box>
                {c.unread > 0 && (
                  <Badge rounded="full" bg="app.accent" color="white" minW="20px" textAlign="center">
                    {c.unread}
                  </Badge>
                )}
              </Flex>
            );
          })}
        </VStack>
      </Box>

      {/* chat */}
      <Flex flex="1" minW={0} direction="column" display={{ base: activeId ? "flex" : "none", md: "flex" }}>
        {current && person && (
          <>
            <Flex align="center" gap={3} p={3} borderBottom="1px solid" borderColor="app.border">
              <IconButton
                aria-label="Back to conversations"
                icon={<FiChevronLeft size={20} />}
                variant="ghostApp"
                rounded="full"
                size="sm"
                display={{ base: "inline-flex", md: "none" }}
                onClick={() => setActiveId(null)}
              />
              <Avatar src={person.avatar} name={person.name} size="sm" />
              <Box>
                <Text fontWeight={700} fontSize="sm">
                  {person.name}
                </Text>
                <Text fontSize="xs" color="app.muted">
                  {person.role}
                </Text>
              </Box>
            </Flex>

            <VStack flex="1" overflowY="auto" align="stretch" spacing={2} p={4}>
              {current.messages.map((m) => (
                <Flex key={m.id} justify={m.from === "me" ? "flex-end" : "flex-start"}>
                  <Box
                    maxW="78%"
                    px={3.5}
                    py={2}
                    rounded="2xl"
                    roundedBottomRight={m.from === "me" ? "md" : "2xl"}
                    roundedBottomLeft={m.from === "me" ? "2xl" : "md"}
                    bg={m.from === "me" ? "app.brand" : "app.cardAlt"}
                    color={m.from === "me" ? "app.brandText" : "app.text"}
                    fontSize="sm"
                  >
                    {m.text}
                  </Box>
                </Flex>
              ))}
              <div ref={endRef} />
            </VStack>

            <Flex as="form" onSubmit={send} p={3} gap={2} borderTop="1px solid" borderColor="app.border">
              <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a message…" rounded="full" />
              <IconButton type="submit" aria-label="Send message" icon={<FiSend />} rounded="full" isDisabled={!draft.trim()} />
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
}
