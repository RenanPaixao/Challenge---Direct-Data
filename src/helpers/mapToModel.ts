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
