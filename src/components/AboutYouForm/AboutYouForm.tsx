import { Center, SimpleGrid } from '@chakra-ui/react'
import { FormikProvider, useFormik } from 'formik'
import { PropsWithChildren, useContext, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { FORM_MESSAGES } from '../../utils/constants.ts'
import { StudentContext } from '../../context/StudentContext.tsx'
import { FieldConfig } from './types'
import { DateTime } from 'luxon'
import { TheField } from '../TheField/TheField.tsx'

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
    label: 'Data de nascimento'
  },
  {
    name: 'cpf',
    type: 'text',
    label: 'CPF'
  },
  {
    name: 'weight',
    type: 'text',
    label: 'Peso'
  },
  {
    name: 'height',
    type: 'text',
    label: 'Altura'
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email'
  },
  {
    name: 'phone',
    type: 'tel',
    label: 'Telefone'
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
    type: 'date'
  },
  {
    name: 'responsibleCpf',
    type: 'text',
    label: 'CPF do Responsável'
  }
]

export const AboutYouForm = ({ children }: PropsWithChildren) => {
  const studentContext = useContext(StudentContext)
  const [areOver18, setAreOver18] = useState(true)

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
      responsibleName: '',
      responsibleLastName: '',
      responsibleBirthDate: '',
      responsibleCpf: ''
    },
    onSubmit: values => {
      const { responsibleName, responsibleLastName, responsibleBirthDate, responsibleCpf, ...rest } = values

      const responsible = areOver18 ? null : {
        name: responsibleName,
        lastName: responsibleLastName,
        birthDate: responsibleBirthDate,
        cpf: responsibleCpf
      }

      studentContext.setAboutYouInformation({
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

  return <FormikProvider value={formik}>
    <Center as={'form'}>
      <SimpleGrid columns={[1, 2]} spacing={8}>
        {fieldsConfig.map(({ name, type, label }) => {
          return <TheField key={name} label={label} type={type} name={name} />
        })}
        {
          formik.touched.birthDate && !areOver18 && responsibleFieldsConfig.map(({ name, type, label }) => {
            return <TheField key={name} label={label} type={type} name={name} />
          })
        }
      </SimpleGrid>
      {children}
    </Center>
  </FormikProvider>
}

