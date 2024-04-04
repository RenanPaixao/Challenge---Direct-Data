import { Box, BoxProps, Flex, Heading, Text } from '@chakra-ui/react'

interface SummarySection {
  sectionTitle: string
  sectionContent: {
    [key: string]: string
  }
}
interface IProps extends BoxProps, SummarySection{
  nested?: SummarySection[]
}

export const StepSummary = ({ sectionTitle, sectionContent, nested, ...rest }: IProps) => {
  const entries = Object.entries(sectionContent)

  return <Box {...rest}>
    <Heading as={'h3'} size={'md'} textAlign={'start'} >{sectionTitle}</Heading>
    <Box p={8} mt={4} border={'thin solid var(--chakra-colors-gray-300)'} borderRadius={8}>
      {
        entries.map(([key, value]) => (
          <Flex key={key}>
            <Text aria-label={`${sectionTitle} - ${key}`}><strong>{key}</strong></Text>: {value}
          </Flex>
        ))
      }
      {
        nested && nested.map(({ sectionTitle, sectionContent }) => (
          <>
            <Heading as={'h4'} color={'var(--chakra-colors-purple-500)'} mt={8} mb={2} size={'sm'} textAlign={'start'}>
              <strong>{sectionTitle}</strong>
            </Heading>
            {
              Object.entries(sectionContent).map(([key, value]) => (
                <Flex key={key}>
                  <Text aria-label={`${sectionTitle} - ${key}`}><strong>{key}</strong></Text>: {value}
                </Flex>
              ))
            }
          </>
        ))
      }
    </Box>
  </Box>
}
