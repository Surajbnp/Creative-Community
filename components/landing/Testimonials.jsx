'use client'

import { Avatar, Box, Flex, Heading, HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import { useRef } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import Eyebrow from './Eyebrow'
import { stories } from './data'

export default function Testimonials() {
  const track = useRef(null)
  const scroll = (dir) => track.current?.scrollBy({ left: dir * 280, behavior: 'smooth' })

  return (
    <Stack spacing={5}>
      <Flex justify="space-between" align="flex-end" gap={4}>
        <Stack spacing={2}>
          <Eyebrow>Creator stories</Eyebrow>
          <Heading fontSize={{ base: '2xl', md: '3xl' }}>Loved by creators like you.</Heading>
        </Stack>
        <HStack>
          <IconButton aria-label="Previous" icon={<FiArrowLeft />} onClick={() => scroll(-1)} variant="outlineInk" size="sm" />
          <IconButton aria-label="Next" icon={<FiArrowRight />} onClick={() => scroll(1)} variant="dark" size="sm" />
        </HStack>
      </Flex>

      <Flex ref={track} gap={4} overflowX="auto" sx={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
        {stories.map(({ name, role, quote }) => (
          <Stack key={name} flex="0 0 260px" scrollSnapAlign="start" bg="card" border="1px solid" borderColor="line" rounded="xl" p={4} spacing={4} justify="space-between">
            <Text fontSize="sm" color="muted">“{quote}”</Text>
            <HStack>
              <Avatar size="sm" name={name} bg="zura.rust" color="white" />
              <Box>
                <Text fontWeight="bold" fontSize="sm">{name}</Text>
                <Text fontSize="xs" color="muted">{role}</Text>
              </Box>
            </HStack>
          </Stack>
        ))}
      </Flex>
    </Stack>
  )
}
