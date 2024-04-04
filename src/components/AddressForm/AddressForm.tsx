import { Button, Center, SimpleGrid, SimpleGridProps } from '@chakra-ui/react'
import { renderInputsBaseOnConfigs } from '../../utils/forms.tsx'
import { FormFooterWrapper } from '../FormFooterWrapper/FormFooterWrapper.tsx'
import { FormikProvider, useFormik } from 'formik'
import { useContext } from 'react'
import { StepperContext } from '../../context/StepperContext.tsx'
import { FieldConfig } from '../AboutYouForm/types'
import * as Yup from 'yup'
import { FORM_MESSAGES } from '../../utils/constants.ts'
import { StudentContext } from '../../context/StudentContext.tsx'

const { REQUIRED, STATE_MIN_LENGTH } = FORM_MESSAGES

const schema = Yup.object({
  cep: Yup.string().required(REQUIRED),
  street: Yup.string().required(REQUIRED),
  district: Yup.string().required(REQUIRED),
  number: Yup.string().required(REQUIRED),
  city: Yup.string().required(REQUIRED),
  state: Yup.string().required(REQUIRED).min(2, STATE_MIN_LENGTH),
  complement: Yup.string()
})

type FormValues = Yup.InferType<typeof schema>

const fieldsConfig: FieldConfig[] = [
  {
    name: 'cep',
    type: 'text',
    label: 'CEP',
    mask: '00000-000'
  },
  {
    name: 'street',
    type: 'text',
    label: 'Logradouro'
  },
  {
    name: 'district',
    type: 'text',
    label: 'Bairro'
  },
  {
    name: 'number',
    type: 'text',
    label: 'Número',
    mask: Number
  },
  {
    name: 'city',
    type: 'text',
    label: 'Cidade'
  },
  {
    name: 'state',
    type: 'text',
    label: 'Estado',
    mask: 'aa'
  },
  {
    name: 'complement',
    type: 'text',
    label: 'Complemento'
  }
]
export const AddressForm = (props: SimpleGridProps) => {
  const { goToPrevious, goToNext } = useContext(StepperContext)!
  const { address, setAddress } = useContext(StudentContext)

  const formik = useFormik<FormValues>({
    initialValues: {
      cep: '',
      city: '',
      complement: '',
      district: '',
      street: '',
      state: '',
      number: '',
      ...address
    },
    onSubmit: values => {
      setAddress(values)
      goToNext()
    },
    validationSchema: schema
  })

  return <FormikProvider value={formik}>
    <Center as={'form'} onSubmit={formik.handleSubmit} flexDirection={'column'}>
      <SimpleGrid {...props} columns={[1, 2]} spacing={8}>
        {renderInputsBaseOnConfigs(fieldsConfig)}
      </SimpleGrid>
      <FormFooterWrapper pt={10}>
        <Button onClick={goToPrevious}>
          Voltar
        </Button>
        <Button type={'submit'} isLoading={formik.isSubmitting}>
        Avançar
        </Button>
      </FormFooterWrapper>
    </Center>
  </FormikProvider>
}
