import axios from 'axios'
import { SubscribeInformation } from '../types'
import { mapSubscribeApiResponse, mapSubscribeInformationToModel } from '../../helpers/mapToModel.ts'

class SubscribeServiceImpl {
  private instance =  axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Token: import.meta.env.VITE_API_TOKEN
    }
  })

  private endpoint = '/Subscribe'

  async getAll() {
    const { data }  = await this.instance.get<{ mensagem: string, retorno: SubscribeInformation[] }>(this.endpoint)

    // This is a workaround to remove the empty objects from the response that I had to do because wrong data added.
    // I could remove it, but I don't have access to a delete endpoint or a way to remove the data from the database.
    const returnWithoutGarbage = data.retorno.filter(subscribeInfo => Object.keys(subscribeInfo).length)

    return returnWithoutGarbage.map(subscribeInfo => mapSubscribeApiResponse(subscribeInfo)) as SubscribeInformation[]
  }

  async getByCpf(cpf: string) {
    const { data } = await this.instance.get(`${this.endpoint}/${cpf}`)

    return data
  }

  async create(data: SubscribeInformation) {
    const mappedData = mapSubscribeInformationToModel(data)
    return this.instance.post(this.endpoint, mappedData)
  }

  async update(id: string, data: Partial<SubscribeInformation>) {
    const mappedData = mapSubscribeInformationToModel(data)
    return this.instance.patch(`${this.endpoint}/${id}`, mappedData)
  }
}

export const subscribeService = new SubscribeServiceImpl()
