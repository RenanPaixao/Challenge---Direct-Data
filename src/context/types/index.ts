
export interface AboutYouInformation extends IdentityInformation {
  responsible: IdentityInformation | null
  weight: string
  height: string
  email: string
  phone: string
}

export interface Address {
  street: string,
  number: string,
  complement?: string,
  district: string,
  cep: string,
  city: string,
  state: string
}

export interface IdentityInformation {
  name: string ,
  lastName: string ,
  birthDate: string,
  cpf: string
}
