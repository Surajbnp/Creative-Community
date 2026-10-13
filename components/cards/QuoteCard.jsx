import { Box, Icon, Text } from "@chakra-ui/react";
import { BsStars } from "react-icons/bs";
import { QUOTE } from "@/data/mock";

export default function QuoteCard() {
  return (
    <Box
      position="relative"
      overflow="hidden"
      p={6}
      minH="150px"
      rounded="2xl"
      border="1px solid"
      borderColor="app.border"
      bgGradient="linear(to-br, app.cardAlt, app.card)"
    >
      {/* decorative leaves */}
      <Box
        position="absolute"
        right="-26px"
        bottom="-30px"
        boxSize="150px"
        rounded="70% 0 70% 0"
        bg="app.brand"
        opacity={0.12}
        transform="rotate(-18deg)"
      />
      <Box
        position="absolute"
        right="26px"
        bottom="-40px"
        boxSize="110px"
        rounded="70% 0 70% 0"
        bg="app.accent"
        opacity={0.14}
        transform="rotate(12deg)"
      />
      <Icon as={BsStars} color="app.accent" boxSize={5} mb={2} />
      <Text fontFamily="heading" fontSize="xl" lineHeight="1.35" color="app.text" position="relative" maxW="220px">
        “{QUOTE}”
      </Text>
    </Box>
  );
}
