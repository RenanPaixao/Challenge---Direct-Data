export interface StudentModel extends IdentityInformationModel {
  responsavel: IdentityInformationModel | null,
  peso: number,
  altura: number,
  email: string,
  telefoneContato: string,
  logradouro: string,
  numero: number,
  complemento: string,
  bairro: string,
  cep: string,
  cidade: string,
  uf: string
}

interface IdentityInformationModel {
  nome: string ,
  sobrenome: string ,
  dataNascimento: string,
  cpf: string
}
