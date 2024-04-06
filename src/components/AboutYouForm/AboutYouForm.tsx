import { Button, Center, SimpleGrid, SimpleGridProps } from '@chakra-ui/react'
import { FormikProvider, useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { FORM_MESSAGES } from '../../utils/constants.ts'
import { StudentContext } from '../../context/StudentContext.tsx'
import { FieldConfig } from './types'
import { DateTime } from 'luxon'
import { StepperContext } from '../../context/StepperContext.tsx'
import { FormFooterWrapper } from '../FormFooterWrapper/FormFooterWrapper.tsx'
import { renderInputsBaseOnConfigs } from '../../utils/forms.tsx'

const { REQUIRED, INVALID_EMAIL, MAX_LENGTH } = FORM_MESSAGES

const schema = Yup.object({
  name: Yup.string().required(REQUIRED).max(50, MAX_LENGTH(50)),
  lastName: Yup.string().required(REQUIRED).max(50, MAX_LENGTH(50)),
  birthDate: Yup.string().required(REQUIRED),
  cpf: Yup.string().required(REQUIRED),
  weight: Yup.string().required(REQUIRED),
  height: Yup.string().required(REQUIRED),
  email: Yup.string().required(REQUIRED).email(INVALID_EMAIL),
  phone: Yup.string().required(REQUIRED),
  responsibleName: Yup.string().required(REQUIRED).max(50, MAX_LENGTH(50)),
  responsibleLastName: Yup.string().required(REQUIRED).max(50, MAX_LENGTH(50)),
  responsibleBirthDate: Yup.string().required(REQUIRED),
  responsibleCpf: Yup.string().required(REQUIRED)
})

export type AboutYouValues = Yup.InferType<typeof schema>

const fieldsConfig: FieldConfig[]  = [
  {
    name: 'name',
    type: 'text',
    label: 'Nome'
  },
  {
    name: 'lastName',
    type: 'text',
    label: 'Sobrenome'
  },
  {
    name: 'birthDate',
    type: 'date',
    label: 'Data de nascimento',
    get 'data-testid'() {
      return this.name
    }
  },
  {
    name: 'cpf',
    type: 'text',
    label: 'CPF',
    mask: '000.000.000-00'
  },
  {
    name: 'weight',
    type: 'text',
    label: 'Peso',
    mask: Number,
    helpMessage: 'Exemplo: 70,00'
  },
  {
    name: 'height',
    type: 'text',
    label: 'Altura',
    mask: '0,00',
    helpMessage: 'Exemplo: 1,70'
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email'
  },
  {
    name: 'phone',
    type: 'tel',
    label: 'Telefone',
    mask: '(00) 00000-0000'
  }
]

const responsibleFieldsConfig: FieldConfig[] = [
  {
    name: 'responsibleName',
    type: 'text',
    label: 'Nome do Responsável'
  },
  {
    name: 'responsibleLastName',
    type: 'text',
    label: 'Sobrenome do Responsável'
  },
  {
    name: 'responsibleBirthDate',
    label: 'Data de nascimento do Responsável',
    type: 'date',
    get 'data-testid'() {
      return this.name
    }
  },
  {
    name: 'responsibleCpf',
    type: 'text',
    label: 'CPF do Responsável',
    mask: '000.000.000-00'
  }
]

export const AboutYouForm = (props: SimpleGridProps) => {
  const { goToNext } = useContext(StepperContext)!
  const { aboutYouInformation, setAboutYouInformation } = useContext(StudentContext)
  const [areOver18, setAreOver18] = useState(true)

  const { responsible = null, ...aboutYou } = aboutYouInformation ?? {}
  const formik = useFormik<AboutYouValues>({
    initialValues: {
      name: '',
      lastName: '',
      birthDate: '',
      cpf: '',
      weight: '',
      height: '',
      email: '',
      phone: '',
      responsibleName: responsible?.name ?? '',
      responsibleLastName: responsible?.lastName ?? '',
      responsibleBirthDate: responsible?.birthDate ?? '',
      responsibleCpf: responsible?.cpf ?? '',
      ...aboutYou
    },
    onSubmit: values => {
      const { responsibleName, responsibleLastName, responsibleBirthDate, responsibleCpf, ...rest } = values

      const responsible = areOver18 ? null : {
        name: responsibleName,
        lastName: responsibleLastName,
        birthDate: responsibleBirthDate,
        cpf: responsibleCpf
      }

      setAboutYouInformation({
        ...rest,
        responsible
      })

      goToNext()
      formik.setSubmitting(false)
    },
    validationSchema: schema,
    validateOnBlur: true
  })

  useEffect(() => {
    if(!formik.values.birthDate) {
      return
    }

    const age = DateTime.now().diff(DateTime.fromISO(formik.values.birthDate), 'years').years
    setAreOver18(age > 18)
  }, [formik.values.birthDate])

  return <FormikProvider value={formik}>
    <Center as={'form'} onSubmit={formik.handleSubmit} flexDirection={'column'}>
      <SimpleGrid {...props} columns={[1, 2]} spacing={8}>
        {renderInputsBaseOnConfigs(fieldsConfig)}
        {
          !areOver18 &&
          renderInputsBaseOnConfigs(responsibleFieldsConfig)
        }
      </SimpleGrid>
      <FormFooterWrapper pt={10} justifyContent={'end'}>
        <Button type={'submit'} isLoading={formik.isSubmitting}>
          Avançar
        </Button>
      </FormFooterWrapper>
    </Center>
  </FormikProvider>
}

