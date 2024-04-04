
import { fillForm, renderWithStudentContext } from '../../../../tests/test-utils.tsx'
import { Address } from '../../../context/types'
import { AddressForm } from '../AddressForm.tsx'

interface FormField {
  name: string
  value: string
  role: string
}

type FormValues = Record<keyof Omit<Address, 'responsible'>, FormField>

const formValues: FormValues = {
  cep: {
    name: 'cep',
    value: '12345678',
    role: 'textbox'
  },
  number: {
    name: 'number',
    value: '15',
    role: 'textbox'
  },
  city: {
    name: 'city',
    value: 'test city',
    role: 'textbox'
  },
  state: {
    name: 'state',
    value: 'al',
    role: 'textbox'
  },
  complement: {
    name: 'complement',
    value: 'test complement',
    role: 'textbox'
  },
  street: {
    name: 'street',
    value: 'test street',
    role: 'textbox'
  },
  district: {
    name: 'district',
    value: 'test district',
    role: 'textbox'
  }
}

describe('AboutYouForm', () => {
  it('should render', async () => {
    const { container } = renderWithStudentContext(<AddressForm/>)

    expect(container).toMatchSnapshot()
  })

  it('should have masks working', async () => {
    const {  getByRole } = renderWithStudentContext(<AddressForm />)
    const { cep, number, state } = formValues

    await fillForm<FormValues>({
      cep: {
        ...cep,
        value: 'aaa' + cep.value + '2aaa2'
      },
      number: {
        ...number,
        value: 'aaa' + number.value + 'aaa'
      },
      state: {
        ...state,
        value: state.value + 'aaa'
      }
    })

    const cepField = getByRole(cep.role, { name: cep.name })
    const numberField = getByRole(number.role, { name: number.name })
    const stateField = getByRole(state.role, { name: state.name })

    expect(cepField).toHaveValue(cep.value.substring(0,5) + '-' + cep.value.substring(5))
    expect(numberField).toHaveValue(number.value)
    expect(stateField).toHaveValue(state.value)
  })
})
