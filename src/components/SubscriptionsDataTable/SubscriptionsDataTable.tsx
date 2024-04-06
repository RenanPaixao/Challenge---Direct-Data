import { DataTable } from '../DataTable/DataTable.tsx'
import { Box, BoxProps } from '@chakra-ui/react'
import { CellValueChangedEvent, ColDef } from 'ag-grid-community'
import { formatDate } from '../../utils/date.ts'
import { useEffect, useState } from 'react'
import { subscribeService } from '../../services/subscribeService/subscribeService.ts'
import { SubscribeInformation } from '../../services/types'

const cpfFormatter = (cpf: string) => {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
}

const phoneFormatter = (phone: string) => {
  return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
}

const columns: ColDef<SubscribeInformation>[] = [
  {
    field: 'name',
    headerName: 'Nome'
  },
  {
    field: 'lastName',
    headerName: 'Sobrenome'
  },
  {
    field: 'birthDate',
    headerName: 'Data de Nascimento',
    valueFormatter: params => formatDate(params.value as string)
  },
  {
    field: 'cpf',
    headerName: 'CPF',
    valueGetter: params => cpfFormatter(params.data?.cpf as string)
  },
  {
    field: 'email',
    headerName: 'Email'
  },
  {
    field: 'phone',
    headerName: 'Telefone',
    valueFormatter: params => phoneFormatter(params.value as string)
  },
  {
    field: 'street',
    headerName: 'Rua'
  },
  {
    field: 'city',
    headerName: 'Cidade'
  },
  {
    field: 'state',
    headerName: 'Estado'
  },
  {
    field: 'cep',
    headerName: 'CEP'
  },
  {
    field: 'number',
    headerName: 'Número',
    filter: 'agNumberColumnFilter'
  },
  {
    field: 'weight',
    headerName: 'Peso',
    filter: 'agNumberColumnFilter'
  },
  {
    field: 'height',
    headerName: 'Altura',
    filter: 'agNumberColumnFilter'
  },
  {
    field: 'district',
    headerName: 'Bairro'
  },
  {
    field: 'complement',
    headerName: 'Complemento',
    valueFormatter: params => params.value ? params.value : '-'
  },
  {
    field: 'responsible.name',
    headerName: 'Nome do Responsável'
  },
  {
    field: 'responsible.lastName',
    headerName: 'Sobrenome do Responsável'
  },
  {
    field: 'responsible.cpf',
    headerName: 'CPF do Responsável',
    valueGetter: params => params.data?.cpf ? cpfFormatter(params.data?.cpf as string) : '-'
  },
  {
    field: 'responsible.birthDate',
    headerName: 'Data de Nascimento do Responsável',
    valueFormatter: params => params.value ? formatDate(params.value as string) : '-'
  }
]

export const SubscriptionsDataTable = (props: BoxProps) => {
  const [data, setData] = useState<SubscribeInformation[]>([])

  useEffect(() => {
    /**
     * Fetch the data from the api to populate the table.
     */
    async function fetchData() {
      const response = await subscribeService.getAll()

      setData(response)
    }

    fetchData()
  }, [])

  return <Box
    width={'100%'}
    borderRadius={8}
    {...props}
  >
    <DataTable rowData={data} columnDefs={columns} onCellValueChanged={onCellValueChanged}/>
  </Box>
}

/**
 * Update the data on the api when a cell value is changed.
 * @param e
 */
async function onCellValueChanged(e: CellValueChangedEvent<SubscribeInformation>) {
  // By some reason, the patch is updating the whole object, not a part of it. So I have to send the whole object.
  await subscribeService.update(e.data.cpf, {
    cpf: e.data.cpf,
    name: e.data.name,
    lastName: e.data.lastName,
    birthDate: e.data.birthDate,
    email: e.data.email,
    phone: e.data.phone,
    street: e.data.street,
    city: e.data.city,
    state: e.data.state,
    cep: e.data.cep,
    number: e.data.number,
    weight: e.data.weight,
    height: e.data.height,
    district: e.data.district,
    complement: e.data.complement,
    responsible:  e.data.responsible ? {
      cpf: e.data.responsible.cpf,
      name: e.data.responsible.name,
      lastName: e.data.responsible.lastName,
      birthDate: e.data.responsible.birthDate
    } : null
  })
}
