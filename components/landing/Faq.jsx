import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { FiArrowRight } from 'react-icons/fi'
import Eyebrow from './Eyebrow'
import { faqs } from './data'

export default function Faq() {
  return (
    <Stack id="faq" bg="card" border="1px solid" borderColor="line" rounded="2xl" p={{ base: 5, md: 6 }} spacing={5}>
      <Stack spacing={2} align="flex-start">
        <Eyebrow fontSize="10px">FAQ</Eyebrow>
        <Heading fontSize={{ base: '2xl', md: '3xl' }}>Got questions?</Heading>
        <Text fontSize="sm" color="muted">Here are some quick answers.</Text>
      </Stack>

      <Accordion allowToggle>
        {faqs.map(({ q, a }) => (
          <AccordionItem key={q} borderColor="line">
            <AccordionButton py={3} px={0}>
              <Box flex={1} textAlign="left" fontSize="sm" fontWeight="semibold">{q}</Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel px={0} fontSize="sm" color="muted">{a}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      <Button variant="dark" alignSelf="flex-start" rightIcon={<FiArrowRight />}>View All FAQ</Button>
    </Stack>
  )
}
