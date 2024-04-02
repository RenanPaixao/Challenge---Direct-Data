export interface Student extends IdentityInformation {
  responsavel: IdentityInformation | null,
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

interface IdentityInformation {
  nome: string ,
  sobrenome: string ,
  dataNascimento: string,
  cpf: string
}
