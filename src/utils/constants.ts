
export const FORM_MESSAGES = {
  REQUIRED: 'Campo obrigatório',
  INVALID_EMAIL: 'O formato do email está inválido',
  MAX_LENGTH: (max: number) => `O campo deve conter no máximo ${max} caracteres`,
  INVALID_CPF: 'CPF inválido',
  CPF_ALREADY_REGISTERED: 'CPF já cadastrado'
}

export const SESSION_STORAGE_KEYS = {
  ABOUT_YOU_INFORMATION: 'aboutYouInformation',
  ADDRESS: 'address'
}
