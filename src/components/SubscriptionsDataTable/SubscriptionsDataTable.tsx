import { AboutYouInformation, Address } from '../../context/types'
import { DataTable } from '../DataTable/DataTable.tsx'
import { Box, BoxProps } from '@chakra-ui/react'
import { ColDef } from 'ag-grid-community'
import { formatDate } from '../../utils/date.ts'
import { useEffect, useState } from 'react'
import { subscribeService } from '../../services/subscribeService/subscribeService.ts'

interface Student extends Omit<AboutYouInformation, 'responsible'>, Address{
  responsibleName?: string
  responsibleLastName?: string
  responsibleCpf?: string
  responsibleBirthDate?: string
}

const columns: ColDef<Student>[] = [
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
    headerName: 'CPF'
  },
  {
    field: 'email',
    headerName: 'Email'
  },
  {
    field: 'phone',
    headerName: 'Telefone'
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
    headerName: 'Complemento'
  },
  {
    field: 'responsibleName',
    headerName: 'Nome do Responsável'
  },
  {
    field: 'responsibleLastName',
    headerName: 'Sobrenome do Responsável'
  },
  {
    field: 'responsibleCpf',
    headerName: 'CPF do Responsável'
  },
  {
    field: 'responsibleBirthDate',
    headerName: 'Data de Nascimento do Responsável',
    valueFormatter: params => params.value ? formatDate(params.value as string) : '-'
  }
]

export const SubscriptionsDataTable = (props: BoxProps) => {
  const [data, setData] = useState<Student[]>([])

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
    <DataTable rowData={data} columnDefs={columns} />
  </Box>
}
