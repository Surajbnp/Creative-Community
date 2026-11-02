import { Box, Container } from '@chakra-ui/react'

export default function Section({ id, dark, children, ...props }) {
  return (
    <Box id={id} bg={dark ? 'zura.bg' : undefined} color={dark ? 'zura.cream' : undefined} py={{ base: 14, md: 20 }} {...props}>
      <Container maxW="container.xl">{children}</Container>
    </Box>
  )
}
