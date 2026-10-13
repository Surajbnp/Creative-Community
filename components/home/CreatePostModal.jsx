"use client";

import { useState } from "react";
import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormLabel,
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
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

const MAX = 400;

export default function CreatePostModal() {
  const { createOpen, setCreateOpen, addPost, user } = useApp();
  const toast = useToast();
  const router = useRouter();
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");

  const close = () => setCreateOpen(false);

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addPost({
      text: text.trim(),
      tags: tags
        .split(/[,\s]+/)
        .map((t) => t.replace(/^#/, "").trim())
        .filter(Boolean)
        .slice(0, 5),
      image: image.trim() || undefined,
    });
    setText("");
    setTags("");
    setImage("");
    close();
    toast({ title: "Posted to your feed", status: "success", duration: 2000 });
    router.push("/");
  };

  return (
    <Modal isOpen={createOpen} onClose={close} isCentered size="lg">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={submit} mx={4}>
        <ModalHeader>Create a post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={3}>
            <Avatar src={user?.avatar} name={user?.name} size="sm" />
            <FormControl>
              <Textarea
                autoFocus
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, MAX))}
                placeholder="Share what you're working on, or ask for a collaborator…"
                rows={5}
                resize="none"
              />
              <Text textAlign="right" fontSize="xs" color="app.muted" mt={1}>
                {text.length}/{MAX}
              </Text>
            </FormControl>
          </Flex>
          <FormControl mt={3}>
            <FormLabel fontSize="sm">Tags</FormLabel>
            <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="#Writing, #Illustration" />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel fontSize="sm">Image URL (optional)</FormLabel>
            <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://…" type="url" />
          </FormControl>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="ghostApp" onClick={close}>
            Cancel
          </Button>
          <Button type="submit" px={8} isDisabled={!text.trim()}>
            Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
