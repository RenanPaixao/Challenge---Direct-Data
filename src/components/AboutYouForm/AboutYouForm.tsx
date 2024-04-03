import { Center, SimpleGrid } from '@chakra-ui/react'
import { FormikProvider, useFormik } from 'formik'
import { PropsWithChildren, useContext, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { FORM_MESSAGES } from '../../utils/constants.ts'
import { StudentContext } from '../../context/StudentContext.tsx'
import { FieldConfig } from './types'
import { DateTime } from 'luxon'
import { TheField } from '../TheField/TheField.tsx'
import { IMaskInput } from 'react-imask'

const { REQUIRED, INVALID_EMAIL } = FORM_MESSAGES

const schema = Yup.object({
  name: Yup.string().required(REQUIRED),
  lastName: Yup.string().required(REQUIRED),
  birthDate: Yup.string().required(REQUIRED),
  cpf: Yup.string().required(REQUIRED),
  weight: Yup.string().required(REQUIRED),
  height: Yup.string().required(REQUIRED),
  email: Yup.string().required(REQUIRED).email(INVALID_EMAIL),
  phone: Yup.string().required(REQUIRED),
  responsibleName: Yup.string().required(REQUIRED),
  responsibleLastName: Yup.string().required(REQUIRED),
  responsibleBirthDate: Yup.string().required(REQUIRED),
  responsibleCpf: Yup.string().required(REQUIRED)
})

export type AboutYouValues = Yup.InferType<typeof schema>

const fieldsConfig: FieldConfig<AboutYouValues>[]  = [
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
    mask: ['000,00', '00,00'],
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

const responsibleFieldsConfig: FieldConfig<AboutYouValues>[] = [
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

export const AboutYouForm = ({ children }: PropsWithChildren) => {
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
        cpf: responsibleCpf,
        ...aboutYouInformation
      }

      setAboutYouInformation({
        ...rest,
        responsible
      })
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

  /**
   * Render inputs based on the input configs, with all props needed .
   * @param configs
   */
  function renderInputsBaseOnConfigs(configs: FieldConfig<AboutYouValues>[]) {
    return configs.map(({ name, mask, ...rest }) => {
      return <TheField
        as={mask ? IMaskInput : undefined}
        key={name}
        mask={mask}
        name={name}
        {...rest}
      />
    })
  }

  return <FormikProvider value={formik}>
    <Center as={'form'} onSubmit={formik.handleSubmit} flexDirection={'column'}>
      <SimpleGrid columns={[1, 2]} spacing={8}>
        {renderInputsBaseOnConfigs(fieldsConfig)}
        {
          !areOver18 &&
          renderInputsBaseOnConfigs(responsibleFieldsConfig)
        }
      </SimpleGrid>
      {children}
    </Center>
  </FormikProvider>
}

