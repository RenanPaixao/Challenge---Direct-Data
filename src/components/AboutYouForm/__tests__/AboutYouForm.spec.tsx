import {
  fillForm,
  FormField,
  renderWithStudentContext
} from '../../../../tests/test-utils.tsx'
import { AboutYouForm } from '../AboutYouForm.tsx'
import { AboutYouInformation } from '../../../context/types'
import { cepService } from '../../../services/cepService/cepService.ts'

type FormValues = Record<keyof Omit<AboutYouInformation, 'responsible'>, FormField>
cepService.getCep = vi.fn().mockReturnValue(Promise.resolve({}))

const formValues: FormValues = {
  name: {
    name: 'name',
    value: 'John',
    role: 'textbox'
  },
  lastName: {
    value: 'Doe',
    role: 'textbox',
    name: 'lastName'
  },
  cpf: {
    value: '09182085056',
    role: 'textbox',
    name: 'cpf'
  },
  email: {
    value: 'a@a.com',
    role: 'textbox',
    name: 'email'
  },
  height: {
    value: '1.80',
    role: 'textbox',
    name: 'height'
  },
  weight: {
    value: '80',
    role: 'textbox',
    name: 'weight'
  },
  birthDate: {
    value: '1990-01-01',
    role: 'Date',
    name: 'birthDate'
  },
  phone: {
    value: '12345678910',
    role: 'textbox',
    name: 'phone'
  }
}

describe('AboutYouForm', () => {
  it('should render', async () => {
    const { container } = renderWithStudentContext(<AboutYouForm />)

    expect(container).toMatchSnapshot()
  })

  it('should render and show responsible fields', async () => {
    const { container } = renderWithStudentContext(<AboutYouForm />)
    await fillForm<FormValues>({
      ...formValues,
      birthDate: { ...formValues.birthDate, value: '2015-12-12' }
    })

    expect(container).toMatchSnapshot()
  })
})

