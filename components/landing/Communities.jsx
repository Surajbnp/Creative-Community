import { Box, Button, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import Section from './Section'
import { communities } from './data'

export default function Communities() {
  return (
    <Section id="communities" dark py={{ base: 12, md: 16 }}>
      <Flex direction={{ base: 'column', lg: 'row' }} gap={10} align={{ lg: 'center' }}>
        <Stack spacing={3} flexShrink={0} maxW="xs">
          <Heading fontSize={{ base: '3xl', md: '4xl' }}>Find your people. Build something together.</Heading>
          <Text color="whiteAlpha.800">Join communities around your interests.</Text>
        </Stack>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4} flex={1}>
          {communities.map(({ name, members, emoji, from }) => (
            <Box key={name} bg="zura.panel" rounded="xl" overflow="hidden" border="1px solid" borderColor="whiteAlpha.200">
              <Box h={28} display="grid" placeItems="center" fontSize="5xl" bgGradient={`linear(to-br, ${from}, #1c0f09)`}>{emoji}</Box>
              <Flex p={3} align="center" justify="space-between">
                <Box>
                  <Text fontWeight="bold" fontSize="sm">{name}</Text>
                  <Text fontSize="xs" color="whiteAlpha.700">{members} members</Text>
                </Box>
                <Button size="xs">Join</Button>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
    </Section>
  )
}
