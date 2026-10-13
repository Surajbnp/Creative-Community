"use client";

import {
  Box,
  Button,
  Icon,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaCrown } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

export default function ProCard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <>
      <Box
        textAlign="center"
        p={4}
        rounded="2xl"
        bg="app.cardAlt"
        border="1px solid"
        borderColor="app.border"
      >
        <Icon as={FaCrown} color="app.accent" boxSize={5} mb={2} />
        <Text fontWeight={700} fontSize="sm">
          Upgrade to Pro
        </Text>
        <Text fontSize="xs" color="app.muted" mt={1} mb={3}>
          Get more visibility and exclusive opportunities.
        </Text>
        <Button size="sm" w="full" onClick={onOpen}>
          Upgrade
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>Zura Pro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List spacing={3} fontSize="sm">
              {["Priority placement in gig searches", "Verified badge & profile analytics", "Unlimited project applications", "Early access to events"].map((t) => (
                <ListItem key={t}>
                  <ListIcon as={FiCheckCircle} color="app.brand" />
                  {t}
                </ListItem>
              ))}
            </List>
          </ModalBody>
          <ModalFooter>
            <Button
              w="full"
              onClick={() => {
                onClose();
                toast({ title: "Pro checkout coming soon", status: "info", duration: 2200 });
              }}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
