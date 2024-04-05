import { StudentModel, SubscribeInformation } from '../services/types'

/**
 * Map the subscribe information to the student model.
 * @param subscribeInformation
 */
export function mapSubscribeInformationToModel(subscribeInformation: Partial<SubscribeInformation>): Partial<StudentModel> {
  const { responsible } = subscribeInformation
  return {
    nome: subscribeInformation.name,
    sobrenome: subscribeInformation.lastName,
    dataNascimento: subscribeInformation.birthDate,
    cpf: subscribeInformation.cpf,
    responsavel: responsible ? {
      nome: responsible.name,
      sobrenome: responsible.lastName,
      dataNascimento: responsible.birthDate,
      cpf: responsible.cpf
    }
      : null,
    peso: Number(subscribeInformation.weight),
    altura: Number(subscribeInformation.height),
    email: subscribeInformation.email,
    telefoneContato: subscribeInformation.phone,
    logradouro: subscribeInformation.street,
    numero: Number(subscribeInformation.number),
    complemento: subscribeInformation.complement,
    bairro: subscribeInformation.district,
    cep: subscribeInformation.cep,
    cidade: subscribeInformation.city,
    uf: subscribeInformation.state
  }
}

/**
 * Map the subscribe api response to the subscribe information.
 * @param subscribeInfo
 */
export function mapSubscribeApiResponse(subscribeInfo: Partial<StudentModel>): Partial<SubscribeInformation> {
  return {
    name: subscribeInfo.nome,
    lastName: subscribeInfo.sobrenome,
    cep: subscribeInfo.cep,
    district: subscribeInfo.bairro,
    complement: subscribeInfo.complemento,
    city: subscribeInfo.cidade,
    state: subscribeInfo.uf,
    number: subscribeInfo.numero !== undefined ? subscribeInfo.numero.toString() : undefined,
    street: subscribeInfo.logradouro,
    weight: subscribeInfo.peso !== undefined ? subscribeInfo.peso.toString() : undefined,
    height: subscribeInfo.altura !== undefined ? subscribeInfo.altura.toString() : undefined,
    email: subscribeInfo.email,
    cpf: subscribeInfo.cpf,
    birthDate: subscribeInfo.dataNascimento,
    phone: subscribeInfo.telefoneContato,
    responsible: subscribeInfo.responsavel ? {
      name: subscribeInfo.responsavel.nome,
      lastName: subscribeInfo.responsavel.sobrenome,
      cpf: subscribeInfo.responsavel.cpf,
      birthDate: subscribeInfo.responsavel.dataNascimento
    } : null
  }
}
