import { Box, Icon, Text } from "@chakra-ui/react";
import { FiInbox } from "react-icons/fi";

export default function EmptyState({ title = "Nothing here yet", hint, icon = FiInbox }) {
  return (
    <Box
      textAlign="center"
      py={14}
      px={6}
      border="1px dashed"
      borderColor="app.border"
      rounded="2xl"
      bg="app.card"
    >
      <Icon as={icon} boxSize={8} color="app.muted" mb={3} />
      <Text fontWeight={600}>{title}</Text>
      {hint && (
        <Text fontSize="sm" color="app.muted" mt={1}>
          {hint}
        </Text>
      )}
    </Box>
  );
}
