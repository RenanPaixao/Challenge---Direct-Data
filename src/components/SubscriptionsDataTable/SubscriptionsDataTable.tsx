import { AboutYouInformation, Address } from '../../context/types'
import { DataTable } from '../DataTable/DataTable.tsx'
import { Box, BoxProps } from '@chakra-ui/react'
import { ColDef } from 'ag-grid-community'
import { formatDate } from '../../utils/date.ts'

interface Student extends Omit<AboutYouInformation, 'responsible'>, Address{
  responsibleName?: string
  responsibleLastName?: string
  responsibleCpf?: string
  responsibleBirthDate?: string
}

const data: Student[] = [
  {
    name: 'John',
    lastName: 'Doe',
    birthDate: '1990-01-01',
    cpf: '123.456.789-00',
    email: 'a@a.com',
    phone: '123456789',
    street: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    cep: '12345-123',
    number: '123',
    weight: '70',
    height: '1.75',
    district: 'Downtown'
  },
  {
    name: 'Jane',
    lastName: 'Doe',
    birthDate: '1990-01-01',
    cpf: '123.456.789-00',
    email: 'b@a.com',
    phone: '123456789',
    street: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    cep: '12345-123',
    number: '123',
    weight: '70',
    height: '1.75',
    district: 'Downtown'
  }
]

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
  return <Box
    width={'100%'}
    borderRadius={8}
    {...props}
  >
    <DataTable rowData={data} columnDefs={columns} />
  </Box>
}
