import axios from 'axios'
import { CepInfo } from '../types'
import { Address } from '../../context/types'

type MappedCep = Omit<Address, 'number'>
const mapCepResponse = (cep: CepInfo): MappedCep  => {
  return {
    cep: cep.cep,
    street: cep.logradouro,
    district: cep.bairro,
    city: cep.localidade,
    state: cep.uf,
    complement: cep.complemento
  }
}

class CepServiceImpl {
  private instance = axios.create({
    baseURL: 'https://viacep.com.br/ws/',
    timeout: 3000
  })

  async getCep(cep: string): Promise<MappedCep> {
    const { data } = await this.instance.get(`${cep}/json`)

    if (!data) {
      throw new Error('CEP não encontrado')
    }

    return mapCepResponse(data)
  }
}

export const cepService = new CepServiceImpl()
