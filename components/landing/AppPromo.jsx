import { Avatar, Box, Button, Flex, Heading, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { FaApple, FaGooglePlay } from 'react-icons/fa'
import Section from './Section'
import Eyebrow from './Eyebrow'
import { gigs } from './data'

export default function AppPromo() {
  return (
    <Section dark py={{ base: 12, md: 16 }} borderTop="1px solid" borderColor="whiteAlpha.100">
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={12} alignItems="center">
        <Stack spacing={5} maxW="md">
          <Eyebrow>Mobile app</Eyebrow>
          <Heading fontSize={{ base: '3xl', md: '5xl' }}>Take ZURA with you everywhere.</Heading>
          <Text color="whiteAlpha.800">Stay connected, chat, explore communities and never miss an opportunity.</Text>
          <HStack spacing={3} flexWrap="wrap">
            <Button variant="outline" leftIcon={<FaApple />} size="lg">App Store</Button>
            <Button variant="outline" leftIcon={<FaGooglePlay />} size="lg">Google Play</Button>
          </HStack>
        </Stack>

        <Flex gap={4} justify="center">
          <Stack w="200px" bg="zura.panel" rounded="3xl" border="6px solid #0e0704" p={4} align="center" spacing={2}>
            <Avatar size="lg" name="Code Ferret" bg="zura.rust" color="white" />
            <Text fontWeight="bold" fontSize="sm">CodeFerret</Text>
            <Text fontSize="xs" color="whiteAlpha.700">Full Stack Dev</Text>
            <HStack spacing={4} fontSize="xs"><Text>24 Posts</Text><Text>1.2K Followers</Text></HStack>
            <Button size="sm" w="full">Follow</Button>
          </Stack>
          <Stack w="220px" bg="zura.panel" rounded="3xl" border="6px solid #0e0704" p={4} spacing={3} mt={8}>
            <Text fontWeight="bold" textAlign="center" fontSize="sm">Gigs</Text>
            {gigs.map(({ role, pay }) => (
              <Flex key={role} bg="whiteAlpha.100" rounded="lg" p={2} justify="space-between" align="center">
                <Box>
                  <Text fontSize="xs" fontWeight="bold">{role}</Text>
                  <Text fontSize="10px" color="whiteAlpha.700">{pay}</Text>
                </Box>
                <Button size="xs">Apply</Button>
              </Flex>
            ))}
          </Stack>
        </Flex>
      </SimpleGrid>
    </Section>
  )
}
