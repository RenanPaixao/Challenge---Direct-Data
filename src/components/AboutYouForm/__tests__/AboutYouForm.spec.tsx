import { customRender, user } from '../../../../tests/test-utils.tsx'
import { AboutYouForm } from '../AboutYouForm.tsx'
import { AboutYouInformation } from '../../../context/types'
import {  screen } from '@testing-library/dom'
import { DateTime } from 'luxon'

interface FormField {
  name: string
  value: string
  role: string
}
type FormValues = Record<keyof Omit<AboutYouInformation, 'responsible'>, FormField>

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
    value: '123456789',
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
    const { container } = customRender(<AboutYouForm />)

    expect(container).toMatchSnapshot()
  })

  it('should render and show responsible fields', async () => {
    const { container } = customRender(<AboutYouForm />)
    await fillForm({
      ...formValues,
      birthDate: { ...formValues.birthDate, value: DateTime.now().minus({ years: 17 }).toISODate() }
    })

    expect(container).toMatchSnapshot()
  })
})

/**
 * Fill the form with the given values.
 * @param formValues
 */
async function fillForm(formValues: Partial<FormValues>) {
  const { getByRole, getByTestId } = screen

  for (const { name, role, value } of Object.values(formValues)) {
    const input = role === 'Date' ? getByTestId(name) : getByRole(role, { name: new RegExp(`\\b${name}\\b`) })
    await user.type(input, value)
  }
}
