import { useContext } from 'react'
import { StudentContext } from '../../context/StudentContext.tsx'
import { Box, Button, Center } from '@chakra-ui/react'
import { StepSummary } from './StepSummary.tsx'
import { FormFooterWrapper } from '../FormFooterWrapper/FormFooterWrapper.tsx'
import { StepperContext } from '../../context/StepperContext.tsx'

export const ReviewStep = () => {
  const { goToPrevious } = useContext(StepperContext)!
  const { address, aboutYouInformation } = useContext(StudentContext)

  const { responsible, ...aboutYouInformationWithoutResponsible } = aboutYouInformation!

  const sectionSteps = [
    {
      sectionTitle: 'Sobre Você',
      sectionContent: aboutYouInformationWithoutResponsible,
      nested: [
        {
          sectionTitle: 'Responsável',
          sectionContent: { ...responsible }
        }
      ]
    },
    { sectionTitle: 'Address', sectionContent: address !== null ? address : {} }
  ]

  return <Center flexDirection={'column'}>
    <Box w={'75%'} minW={'600px'}>
      {
        sectionSteps.map(({ sectionContent, sectionTitle, nested }) => (
          <StepSummary mt={4} key={sectionTitle} sectionTitle={sectionTitle} sectionContent={sectionContent} nested={nested}/>
        ))}
    </Box>
    <FormFooterWrapper mt={8}>
      <Button onClick={goToPrevious}>Voltar</Button>
      <Button>Avançar</Button>
    </FormFooterWrapper>
  </Center>
}
