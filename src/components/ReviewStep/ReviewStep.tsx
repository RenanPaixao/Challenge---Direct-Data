import { useContext } from 'react'
import { StudentContext } from '../../context/StudentContext.tsx'
import { Box, Button, Center } from '@chakra-ui/react'
import { StepSummary } from './StepSummary.tsx'
import { FormFooterWrapper } from '../FormFooterWrapper/FormFooterWrapper.tsx'
import { StepperContext } from '../../context/StepperContext.tsx'
import { DateTime } from 'luxon'
import { useNavigate } from 'react-router'

export const ReviewStep = () => {
  const { goToPrevious } = useContext(StepperContext)!
  const { address, aboutYouInformation } = useContext(StudentContext)
  const navigate = useNavigate()
  const { responsible, ...aboutYouWithoutResponsible } = aboutYouInformation!

  const aboutYouWithFormattedDate = formatBirthDate(aboutYouWithoutResponsible)
  const responsibleWithFormattedDate = formatBirthDate(responsible ?? {})

  const sectionSteps = [
    {
      sectionTitle: 'Sobre Você',
      sectionContent: mapObjectKeysToPortuguese(aboutYouWithFormattedDate),
      nested: [
        {
          sectionTitle: 'Responsável',
          sectionContent: mapObjectKeysToPortuguese(responsibleWithFormattedDate)
        }
      ]
    },
    {
      sectionTitle: 'Endereço',
      sectionContent: mapObjectKeysToPortuguese(address ?? {})
    }
  ]

  /**
   * Navigate to the success page.
   */
  function goToSuccessPage() {
    navigate('/success')
  }

  return <Center flexDirection={'column'}>
    <Box w={'75%'} minW={'600px'}>
      {
        sectionSteps.map(({ sectionContent, sectionTitle, nested }) => (
          <StepSummary mt={4} key={sectionTitle} sectionTitle={sectionTitle} sectionContent={sectionContent} nested={nested}/>
        ))}
    </Box>
    <FormFooterWrapper mt={8}>
      <Button onClick={goToPrevious}>Voltar</Button>
      <Button onClick={goToSuccessPage}>Avançar</Button>
    </FormFooterWrapper>
  </Center>
}

/**
 * Map object keys to Portuguese.
 * @param object
 */
function mapObjectKeysToPortuguese(object: Record<string, any>) {
  const allKeys: Record<string, string> = {
    name: 'Nome',
    lastName: 'Sobrenome',
    birthDate: 'Data de nascimento',
    cpf: 'CPF',
    weight: 'Peso',
    height: 'Altura',
    email: 'Email',
    phone: 'Telefone',
    responsibleName: 'Nome do responsável',
    responsibleLastName: 'Sobrenome do responsável',
    responsibleBirthDate: 'Data de nascimento do responsável',
    responsibleCpf: 'CPF do responsável',
    responsibleEmail: 'Email do responsável',
    responsiblePhone: 'Telefone do responsável',
    cep: 'CEP',
    street: 'Rua',
    number: 'Número',
    complement: 'Complemento',
    district: 'Bairro',
    city: 'Cidade',
    state: 'Estado'
  }
  return Object.keys(object).reduce((acc, key) => {
    acc[allKeys[key]] = object[key]
    return acc
  }, {} as Record<string, string>)
}

/**
 * Format the birthdate of an object.
 */
function formatBirthDate(object: Record<string, any>) {
  return {
    ...object,
    birthDate: DateTime.fromISO(object.birthDate).toFormat('dd/MM/yyyy')
  }
}
