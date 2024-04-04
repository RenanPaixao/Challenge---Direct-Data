import axios from 'axios'
import { SubscribeInformation } from '../types'
import { mapSubscribeInformationToModel } from '../../helpers/mapToModel.ts'

class SubscribeServiceImpl {
  instance =  axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Token: import.meta.env.VITE_API_TOKEN
    }
  })

  endpoint = '/subscribe'

  async getAll() {
    return this.instance.get(this.endpoint)
  }

  async getByCpf(cpf: string) {
    return this.instance.get(`${this.endpoint}/${cpf}`)
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
