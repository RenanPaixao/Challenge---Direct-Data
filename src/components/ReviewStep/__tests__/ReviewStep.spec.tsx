
import { renderWithStudentContext } from '../../../../tests/test-utils.tsx'
import { ReviewStep } from '../ReviewStep.tsx'
import { AboutYouInformation, Address } from '../../../context/types'
import { expect } from 'vitest'

const aboutYouValues: AboutYouInformation = {
  name: 'test name',
  lastName: 'test last name',
  birthDate: '2015-01-01',
  cpf: '123.456.789-00',
  email: 'test@test.com',
  height: '1.80',
  weight: '70',
  phone: '1234567890',
  responsible: {
    name: 'test responsible name',
    cpf: '123.456.789-00',
    birthDate: '2000-02-03',
    lastName: 'test responsible last name'
  }
}

const addressValues: Address = {
  cep: '12345-123',
  number: '12',
  city: 'test city',
  state: 'al',
  complement: 'test complement',
  street: 'test street',
  district: 'test district'
}

describe('ReviewStep', () => {
  it('should render', async () => {
    const { container } = renderWithStudentContext(<ReviewStep/>, {
      address: addressValues,
      aboutYouInformation: aboutYouValues
    })

    expect(container).toMatchSnapshot()
  })

  it('should render with formatted birthDate', async () => {
    const { getByText } = renderWithStudentContext(<ReviewStep/>, {
      address: addressValues,
      aboutYouInformation: aboutYouValues
    })

    const studentBirthDate = getByText(': 01/01/2015')
    const responsibleBirthDate = getByText(': 03/02/2000')

    expect(studentBirthDate).toBeTruthy()
    expect(responsibleBirthDate).toBeTruthy()
  })
})
