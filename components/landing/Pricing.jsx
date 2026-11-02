import { Badge, Box, Button, Heading, HStack, List, ListIcon, ListItem, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { FiCheck } from 'react-icons/fi'
import Eyebrow from './Eyebrow'
import { plans } from './data'

export default function Pricing() {
  return (
    <Stack id="pricing" bg="card" border="1px solid" borderColor="line" rounded="2xl" p={{ base: 5, md: 6 }} spacing={6}>
      <Stack textAlign="center" spacing={1} align="center">
        <Eyebrow fontSize="10px">Pricing</Eyebrow>
        <Heading fontSize={{ base: '2xl', md: '3xl' }}>Simple and transparent pricing.</Heading>
        <Text fontSize="sm" color="muted">Start for free and upgrade when you need more power.</Text>
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
        {plans.map(({ name, price, perks, cta, popular }) => (
          <Stack key={name} position="relative" rounded="xl" p={4} spacing={4} border="2px solid" borderColor={popular ? 'zura.rust' : 'line'}>
            {popular && (
              <Badge position="absolute" top={-3} left="50%" transform="translateX(-50%)" bg="zura.rust" color="white" rounded="full" px={3} py={0.5} fontSize="10px" whiteSpace="nowrap">
                Most Popular
              </Badge>
            )}
            <Box>
              <Heading size="md">{name}</Heading>
              <HStack align="baseline" spacing={1}>
                <Heading fontSize="2xl">₹{price}</Heading>
                <Text fontSize="xs" color="muted">/ month</Text>
              </HStack>
            </Box>
            <List spacing={1.5} flex={1}>
              {perks.map((p) => (
                <ListItem key={p} fontSize="xs"><ListIcon as={FiCheck} color="green.500" />{p}</ListItem>
              ))}
            </List>
            <Button size="sm" variant={popular ? 'dark' : 'outlineInk'}>{cta}</Button>
          </Stack>
        ))}
      </SimpleGrid>
    </Stack>
  )
}
