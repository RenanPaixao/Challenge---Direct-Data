import { DateTime } from 'luxon'
import { generate } from 'gerador-validador-cpf'

const formValues = {
  name: 'tereza',
  lastName: 'maria',
  birthDate: DateTime.now().minus({ years: 18 }).set({ day: 1 }).toFormat('dd/MM/yyyy'),
  weight: '90',
  height: '1,84',
  email: 'test@e2e.com',
  phone: '(12) 91234-5678',
  cep: '68901-270',
  street: 'Rua Santos Dumont',
  number: '11',
  district: 'Santa Rita',
  city: 'Macapá',
  state: 'AP',
  complement: 'Casa rosa'
}

describe('Subscription Flow', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.findByRole('button', { name: /Comece agora! Punch/i }).click()
  })

  it('subscription without responsible', () => {
    // The test can fail if we generate an existent cpf. We don't have a way to delete the user from the database or a
    // bypass to use the same CPF.
    const cpf = generate({ format: true })

    fillAboutYouCommonFields(formValues.birthDate, cpf)
    cy.findByRole('button', { name: /avançar/i }).click()

    // Address
    fillAddressFields()
    cy.findByRole('button', { name: /avançar/i }).click()

    // Review
    cy.wrap(Object.values(formValues)).each((value: string) => cy.findByText(`: ${value}`).should('be.visible'))
    cy.findByText(`: ${cpf}`).should('be.visible')
    cy.findByRole('button', { name: /avançar/i }).click()

    // Success
    cy.url().should('contain', '/success')
  })
  it('subscription with responsible', () => {
    const birthDate = DateTime.now().minus({ years: 17 }).set({ day: 1 }).toFormat('dd/MM/yyyy')
    const cpf = generate({ format: true })
    const responsibleValues = {
      cpf: generate({ format: true }),
      birthDate: DateTime.now().minus({ years: 30 }).set({ day: 1 }).toFormat('dd/MM/yyyy'),
      name: 'josé',
      lastName: 'carlos'
    }

    fillAboutYouCommonFields(birthDate, cpf)
    cy.findByRole('textbox', { name: /responsibleName/i }).type(responsibleValues.name)
    cy.findByRole('textbox', { name: /responsibleLastName/i }).type(responsibleValues.lastName)
    cy.findByRole('textbox', { name: /responsibleCpf/i }).type(responsibleValues.cpf)
    fillDatePicker(DateTime.fromFormat(responsibleValues.birthDate, 'dd/MM/yyyy'), { index: 1 })

    cy.findByRole('button', { name: /avançar/i }).click()

    // Address
    fillAddressFields()
    cy.findByRole('button', { name: /avançar/i }).click()

    // Review
    cy.wrap(Object.values({ ...formValues, ...responsibleValues }))
      .each((value: string) => cy.findByText(`: ${value}`).should('be.visible'))

    cy.findByRole('button', { name: /avançar/i }).click()
  })
})

const fillAboutYouCommonFields = (birthDate: string, cpf: string) => {
  const birthDateLocal = DateTime.fromFormat(birthDate, 'dd/MM/yyyy')
  cy.findByRole('textbox', { name: 'name' }).type(formValues.name)
  cy.findByRole('textbox', { name: /lastName/i }).type(formValues.lastName)

  fillDatePicker(birthDateLocal, { index: 0 })

  cy.findByRole('textbox', { name: 'cpf' }).type(cpf)
  cy.findByRole('textbox', { name: /weight/i }).type(formValues.weight)
  cy.findByRole('textbox', { name: /height/i }).type(formValues.height)
  cy.findByRole('textbox', { name: /email/i }).type(formValues.email)
  cy.findByRole('textbox', { name: /phone/i }).type(formValues.phone)
}

const fillAddressFields = () => {
  cy.findByRole('textbox', { name: /cep/i }).type(formValues.cep)
  cy.findByRole('textbox', { name: /street/i }).should('have.value', formValues.street)
  cy.findByRole('textbox', { name: /district/i }).should('have.value', formValues.district)
  cy.findByRole('textbox', { name: /city/i }).should('have.value', formValues.city)
  cy.findByRole('textbox', { name: /state/i }).should('have.value', formValues.state)
  cy.findByRole('textbox', { name: /number/i }).type(formValues.number)
  cy.findByRole('textbox', { name: /complement/i }).clear().type(formValues.complement)
}

const fillDatePicker = (birthDate: DateTime, options?: { index: number}) => {
  const { index = 0 } = options ?? {}
  cy.findAllByPlaceholderText('Selecione uma data').eq(index).click()
  cy.get('.chakra-select__wrapper').filter(`:contains("${DateTime.now().year}")`)
    .find('.chakra-select').filter(':visible').select(`${birthDate.year}`)
  cy.findByRole('button', { name: `${birthDate.day}` }).click()
  cy.findByRole('button', { name: /close/i }).click()
}
