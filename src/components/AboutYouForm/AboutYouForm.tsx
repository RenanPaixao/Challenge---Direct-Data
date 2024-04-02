import { Center, FormControl, FormErrorMessage, FormLabel, Input, SimpleGrid } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { PropsWithChildren } from 'react'
import * as Yup from 'yup'
import { FORM_MESSAGES } from '../../utils/constants.ts'
import { hasFormikError } from '../../utils/forms.ts'

const { REQUIRED, INVALID_EMAIL } = FORM_MESSAGES

const schema = Yup.object({
  name: Yup.string().required(REQUIRED),
  lastName: Yup.string().required(REQUIRED),
  birthDate: Yup.string().required(REQUIRED),
  cpf: Yup.string().required(REQUIRED),
  weight: Yup.string().required(REQUIRED),
  height: Yup.string().required(REQUIRED),
  email: Yup.string().required(REQUIRED).email(INVALID_EMAIL),
  phone: Yup.string().required(REQUIRED)
})

type AboutYouValues = Yup.InferType<typeof schema>

const fieldsConfig: {key: keyof AboutYouValues, type: string, label: string}[]  = [
  {
    key: 'name',
    type: 'text',
    label: 'Nome'
  },
  {
    key: 'lastName',
    type: 'text',
    label: 'Sobrenome'
  },
  {
    key: 'birthDate',
    type: 'date',
    label: 'Data de nascimento'
  },
  {
    key: 'cpf',
    type: 'text',
    label: 'CPF'
  },
  {
    key: 'weight',
    type: 'text',
    label: 'Peso'
  },
  {
    key: 'height',
    type: 'text',
    label: 'Altura'
  },
  {
    key: 'email',
    type: 'email',
    label: 'Email'
  },
  {
    key: 'phone',
    type: 'tel',
    label: 'Telefone'
  }
]

export const AboutYouForm = ({ children }: PropsWithChildren) => {
  const formik = useFormik<AboutYouValues>({
    initialValues: {
      name: '',
      lastName: '',
      birthDate: '',
      cpf: '',
      weight: '',
      height: '',
      email: '',
      phone: ''
    },
    onSubmit: values => {
      console.log(values)
    },
    validationSchema: schema,
    validateOnBlur: true
  })

  return <Center as={'form'}>
    <SimpleGrid columns={2} spacing={8}>
      {fieldsConfig.map(({ key, type, label }) => {
        return <FormControl key={key} isInvalid={hasFormikError<AboutYouValues>(key, formik.touched, formik.errors)}>
          <FormLabel htmlFor={key}>{label}</FormLabel>
          <Input
            name={key}
            type={type}
            aria-label={key}
            onChange={formik.handleChange}
            value={formik.values[key]}
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>{formik.errors[key]}</FormErrorMessage>
        </FormControl>
      })}
    </SimpleGrid>
    {children}
  </Center>
}
