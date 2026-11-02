import { Box, Button, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { FiArrowRight } from 'react-icons/fi'
import Eyebrow from './Eyebrow'
import { features } from './data'

export default function Features() {
  return (
    <Stack id="features" spacing={6}>
      <Stack spacing={3}>
        <Eyebrow>Features</Eyebrow>
        <Heading fontSize={{ base: '3xl', md: '4xl' }}>Everything a creator needs, in one place.</Heading>
        <Text color="muted" maxW="md">From showcasing your work to finding opportunities — ZURA gives you the tools to grow and belong.</Text>
        <Button variant="dark" alignSelf="flex-start" rightIcon={<FiArrowRight />}>Explore All Features</Button>
      </Stack>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
        {features.map(({ icon: Icon, tint, title, text }) => (
          <Stack key={title} bg="card" border="1px solid" borderColor="line" rounded="xl" p={4} spacing={2} align="center" textAlign="center">
            <Box bg={tint} color="zura.rust" p={3} rounded="lg"><Icon size={20} /></Box>
            <Text fontWeight="bold" fontSize="sm">{title}</Text>
            <Text fontSize="xs" color="muted">{text}</Text>
          </Stack>
        ))}
      </SimpleGrid>
    </Stack>
  )
}
