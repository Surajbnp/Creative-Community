"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FiEdit2, FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import Verified from "@/components/ui/Verified";
import SectionHeader from "@/components/ui/SectionHeader";
import PostCard from "@/components/cards/PostCard";
import EmptyState from "@/components/ui/EmptyState";
import { useApp } from "@/context/AppContext";

export default function ProfilePage() {
  const router = useRouter();
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, posts, flags, updateUser, logout } = useApp();
  const edit = useDisclosure();
  const [form, setForm] = useState({ name: user?.name || "", role: user?.role || "", bio: user?.bio || "" });

  const mine = posts.filter((p) => p.authorId === "me");

  if (!user) return null; // not loaded yet / logged out (AppShell redirects)

  const save = (e) => {
    e.preventDefault();
    updateUser({ name: form.name.trim() || user.name, role: form.role.trim() || user.role, bio: form.bio.trim() });
    edit.onClose();
    toast({ title: "Profile updated", status: "success", duration: 1800 });
  };

  return (
    <Box maxW="860px">
      <Box rounded="2xl" overflow="hidden" bg="app.card" border="1px solid" borderColor="app.border">
        <Box h={{ base: "100px", md: "140px" }} bgGradient="linear(to-r, #4A2412, #7B4527 60%, #B8703D)" />
        <Box px={{ base: 4, md: 6 }} pb={5}>
          <Flex align="flex-end" justify="space-between" mt={{ base: "-36px", md: "-44px" }} gap={3}>
            <Avatar src={user.avatar} name={user.name} boxSize={{ base: "76px", md: "92px" }} border="4px solid" borderColor="app.card" />
            <HStack>
              <Button size="sm" variant="soft" leftIcon={<FiEdit2 />} onClick={edit.onOpen}>
                Edit profile
              </Button>
            </HStack>
          </Flex>
          <Flex align="center" gap={1.5} mt={3}>
            <Text fontWeight={800} fontSize="xl">
              {user.name}
            </Text>
            {user.verified && <Verified boxSize={5} />}
          </Flex>
          <Text fontSize="sm" color="app.muted">
            @{user.handle} · {user.role}
          </Text>
          <Text fontSize="sm" mt={3} maxW="560px" lineHeight="tall">
            {user.bio}
          </Text>
          <HStack spacing={8} mt={4}>
            {[
              [user.followers, "Followers"],
              [user.following + flags.following.length, "Following"],
              [mine.length, "Posts"],
            ].map(([n, l]) => (
              <Box key={l}>
                <Text fontWeight={800}>{n.toLocaleString()}</Text>
                <Text fontSize="xs" color="app.muted">
                  {l}
                </Text>
              </Box>
            ))}
          </HStack>
        </Box>
      </Box>

      <HStack mt={4} spacing={3} flexWrap="wrap">
        <Button variant="soft" size="sm" leftIcon={colorMode === "light" ? <FiMoon /> : <FiSun />} onClick={toggleColorMode}>
          {colorMode === "light" ? "Dark mode" : "Light mode"}
        </Button>
        <Button
          variant="outlineApp"
          size="sm"
          leftIcon={<FiLogOut />}
          onClick={() => {
            logout();
            router.replace("/login");
          }}
        >
          Log out
        </Button>
      </HStack>

      <Box mt={7}>
        <SectionHeader title="Your posts" />
        <VStack align="stretch" spacing={4}>
          {mine.length ? (
            mine.map((p) => <PostCard key={p.id} post={p} />)
          ) : (
            <EmptyState title="You haven't posted yet" hint="Tap Create to share your first post." />
          )}
        </VStack>
      </Box>

      <Modal isOpen={edit.isOpen} onClose={edit.onClose} isCentered>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={save} mx={4}>
          <ModalHeader>Edit profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              <FormControl>
                <FormLabel fontSize="sm">Name</FormLabel>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">Role</FormLabel>
                <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">Bio</FormLabel>
                <Textarea rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button variant="ghostApp" onClick={edit.onClose}>
              Cancel
            </Button>
            <Button type="submit" px={8}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
