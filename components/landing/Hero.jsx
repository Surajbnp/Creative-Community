import { AvatarGroup, Avatar, Box, Button, Flex, Heading, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { FiArrowRight, FiPlay } from 'react-icons/fi'
import Section from './Section'
import Eyebrow from './Eyebrow'
import { categories, communities } from './data'

function Phone({ title, children, ...props }) {
  return (
    <Box w={{ base: '190px', lg: '230px' }} rounded="3xl" border="6px solid #0e0704" bg="zura.panel" p={4} boxShadow="0 30px 60px rgba(0,0,0,.5)" {...props}>
      <Text fontWeight="bold" fontSize="sm" mb={3}>{title}</Text>
      <Stack spacing={3}>{children}</Stack>
    </Box>
  )
}

function Scene() {
  const words = ['Ideas', 'People', 'Projects', 'Opportunities']
  const signs = ['Create', 'Connect', 'Collaborate', 'Grow']
  return (
    <Box position="relative" w="full" minH="420px" rounded="3xl" overflow="hidden" bgGradient="radial(circle at 40% 40%, #7a3d1a 0%, #3a1c0e 55%, #1c0f09 100%)">
      <Stack position="absolute" top={6} left={6} spacing={0} fontFamily="heading" fontStyle="italic" color="zura.peach" fontSize="lg">
        {words.map((w) => <Text key={w}>{w}</Text>)}
      </Stack>
      <Stack position="absolute" top={8} right="38%" spacing={2} display={{ base: 'none', xl: 'flex' }}>
        {signs.map((s) => (
          <Text key={s} bg="zura.sand" color="zura.rust" fontSize="xs" fontWeight="bold" px={3} py={1} rounded="sm" textTransform="uppercase">{s}</Text>
        ))}
      </Stack>
      <Text position="absolute" bottom={10} left="12%" fontSize="7xl" aria-hidden>🧑‍💻</Text>
      <Phone title="Communities" position="absolute" top={6} right={6}>
        {communities.slice(0, 3).map((c) => (
          <Flex key={c.name} align="center" justify="space-between" bg="whiteAlpha.100" rounded="xl" p={2}>
            <Box>
              <Text fontSize="xs" fontWeight="bold">{c.name}</Text>
              <Text fontSize="10px" color="whiteAlpha.700">{c.members} members</Text>
            </Box>
            <Button size="xs">Join</Button>
          </Flex>
        ))}
      </Phone>
      <Box position="absolute" bottom={6} right={4} bg="zura.sand" color="zura.bg" p={4} rounded="md" transform="rotate(4deg)" maxW="150px" fontFamily="heading" fontSize="lg" lineHeight={1.2}>
        Same passion. Different people.
      </Box>
    </Box>
  )
}

export default function Hero() {
  return (
    <Section id="home" dark pb={0} pt={{ base: 10, md: 12 }} bgGradient="radial(circle at 65% 30%, #3a1c0e 0%, #1c0f09 65%)">
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10} alignItems="center">
        <Stack spacing={6}>
          <Eyebrow>A home for creators</Eyebrow>
          <Heading as="h1" fontSize={{ base: '5xl', md: '7xl' }} lineHeight={1} color="zura.sand">
            Create.<br />Connect.<br />Collaborate.<br />
            <Box as="span" color="zura.orange">Grow.</Box>
          </Heading>
          <Text maxW="md" color="whiteAlpha.800" fontSize="lg">
            ZURA is a creative community platform where creators, builders and dreamers come together to share, learn, collaborate and find opportunities.
          </Text>
          <HStack spacing={4} flexWrap="wrap">
            <Button size="lg" rightIcon={<FiArrowRight />}>Get Started Free</Button>
            <Button size="lg" variant="outline" leftIcon={<FiPlay />}>Watch Video</Button>
          </HStack>
          <HStack>
            <AvatarGroup size="sm" max={4}>
              {['A', 'B', 'C', 'D'].map((n) => <Avatar key={n} name={n} bg="zura.rust" color="white" />)}
            </AvatarGroup>
            <Text fontSize="sm" color="whiteAlpha.800">10K+ creators already joined</Text>
          </HStack>
        </Stack>
        <Box display={{ base: 'none', md: 'block' }}><Scene /></Box>
      </SimpleGrid>

      <Box mt={12} bg="zura.cream" color="zura.bg" roundedTop="3xl" px={{ base: 4, md: 8 }} py={5}>
        <SimpleGrid columns={{ base: 3, md: 7 }} gap={4} alignItems="center">
          {categories.map(({ label, icon: Icon }) => (
            <Stack key={label} align="center" spacing={1}>
              <Box as={Icon} boxSize={6} />
              <Text fontSize="xs" fontWeight="semibold">{label}</Text>
            </Stack>
          ))}
          <Text fontSize="xs" textAlign="center" display={{ base: 'none', md: 'block' }}>and more...</Text>
        </SimpleGrid>
      </Box>
    </Section>
  )
}
