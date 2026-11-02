import { Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import Eyebrow from './Eyebrow'
import { stats } from './data'

export default function Stats() {
  return (
    <Stack bg="zura.bg" color="zura.cream" rounded="2xl" p={{ base: 6, md: 8 }} spacing={6} align="center">
      <Eyebrow color="zura.peach" fontSize="10px">A growing creative ecosystem</Eyebrow>
      <SimpleGrid columns={{ base: 2, md: 4 }} gap={6} w="full">
        {stats.map(({ value, label }) => (
          <Stack key={label} align="center" spacing={0}>
            <Heading fontSize={{ base: '3xl', md: '4xl' }}>{value}</Heading>
            <Text fontSize="sm" color="whiteAlpha.700">{label}</Text>
          </Stack>
        ))}
      </SimpleGrid>
    </Stack>
  )
}
