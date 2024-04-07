import { useContext, useState } from 'react'
import { StudentContext } from '../../context/StudentContext.tsx'
import { Box, Button, Center } from '@chakra-ui/react'
import { StepSummary } from './StepSummary.tsx'
import { FormFooterWrapper } from '../FormFooterWrapper/FormFooterWrapper.tsx'
import { StepperContext } from '../../context/StepperContext.tsx'
import { useNavigate } from 'react-router'
import { subscribeService } from '../../services/subscribeService/subscribeService.ts'
import { SESSION_STORAGE_KEYS } from '../../utils/constants.ts'
import { formatDate } from '../../utils/date.ts'

const { ADDRESS, ABOUT_YOU_INFORMATION } = SESSION_STORAGE_KEYS
export const ReviewStep = () => {
  const { goToPrevious, setActiveStep } = useContext(StepperContext)!
  const { address, aboutYouInformation, clearStudentContext } = useContext(StudentContext)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const { responsible, ...aboutYouWithoutResponsible } = aboutYouInformation!

  const aboutYouWithFormattedDate = formatBirthDate(aboutYouWithoutResponsible)

  const responsibleSection = responsible ? [{
    sectionTitle: 'Responsável',
    sectionContent: mapObjectKeysToPortuguese(formatBirthDate(responsible ?? {}))
  }] : undefined

  const sectionSteps = [
    {
      sectionTitle: 'Sobre Você',
      sectionContent: mapObjectKeysToPortuguese(aboutYouWithFormattedDate),
      nested: responsibleSection
    },
    {
      sectionTitle: 'Endereço',
      sectionContent: mapObjectKeysToPortuguese(address ?? {})
    }
  ]

  /**
   * Navigate to the success page.
   */
  async function sendDataAndGoToSuccessPage() {
    if(!aboutYouInformation || !address) {
      console.error('Missing data!')
      return
    }
    setIsLoading(true)

    try {
      await subscribeService.create({ ...aboutYouInformation, ...address })

      sessionStorage.removeItem(ABOUT_YOU_INFORMATION)
      sessionStorage.removeItem(ADDRESS)
      clearStudentContext()
      setActiveStep(0)

      navigate('/success', { replace: true })
    }catch(e) {
      console.error(e)
    }finally {
      setIsLoading(false)
    }
  }

  return <Center flexDirection={'column'}>
    <Box w={'75%'} minW={'600px'}>
      {
        sectionSteps.map(({ sectionContent, sectionTitle, nested }) => (
          <StepSummary mt={4} key={sectionTitle} sectionTitle={sectionTitle} sectionContent={sectionContent} nested={nested}/>
        ))}
    </Box>
    <FormFooterWrapper mt={8}>
      <Button onClick={goToPrevious} isLoading={isLoading}>Voltar</Button>
      <Button onClick={sendDataAndGoToSuccessPage} isLoading={isLoading}>Avançar</Button>
    </FormFooterWrapper>
  </Center>
}

/**
 * Map object keys to Portuguese.
 * @param obj
 */
function mapObjectKeysToPortuguese(obj: Record<string, any>) {
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
  return Object.keys(obj).reduce((acc, key) => {
    acc[allKeys[key]] = obj[key]
    return acc
  }, {} as Record<string, string>)
}

/**
 * Format the birthdate of an object.
 */
function formatBirthDate(object: Record<string, any>) {
  return {
    ...object,
    birthDate: formatDate(object.birthDate)
  }
}
