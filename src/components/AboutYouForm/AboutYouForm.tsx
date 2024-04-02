import { Center, FormControl, FormLabel, Input, SimpleGrid } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { PropsWithChildren } from 'react'

interface AboutYouValues {
  name: string
  lastName: string
  birthDate: string
  cpf: string
  weight: number
  height: number
  email: string
  phone: string
}

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
    type: 'number',
    label: 'Peso'
  },
  {
    key: 'height',
    type: 'number',
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
      weight: 0,
      height: 0,
      email: '',
      phone: ''
    },
    onSubmit: values => {
      console.log(values)
    }
  })

  return <Center as={'form'}>
    <SimpleGrid columns={2} spacing={8}>
      {fieldsConfig.map(({ key, type, label }) => {
        return <FormControl key={key}>
          <FormLabel htmlFor={key}>{label}</FormLabel>
          <Input
            type={type}
            name={key}
            aria-label={key}
            onChange={formik.handleChange}
            value={formik.values[key]}
            onBlur={formik.handleBlur}
          />
        </FormControl>
      })}
    </SimpleGrid>
    {children}
  </Center>
}
