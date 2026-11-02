import { Text } from '@chakra-ui/react'

export default function Eyebrow({ children, ...props }) {
  return (
    <Text fontSize="xs" letterSpacing="0.25em" textTransform="uppercase" color="zura.orange" {...props}>
      {children}
    </Text>
  )
}
