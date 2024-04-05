import { AgGridReact, AgGridReactProps } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

import { Box } from '@chakra-ui/react'

export type DataTableProps = {
  height?: number;
};

export const DataTable = ({ rowData, columnDefs, height = 500, ...rest }: DataTableProps & AgGridReactProps) => {
  return <Box h={height}>
    <AgGridReact
      className={'ag-theme-quartz'}
      rowData={rowData}
      columnDefs={columnDefs}
      reactiveCustomComponents={true} /*@see https://www.ag-grid.com/react-data-grid/cell-editors/#custom-components*/
      defaultColDef={{
        filter: true,
        editable: true,
        floatingFilter: true,
        sortable: true,
        suppressHeaderFilterButton: true,
        suppressFloatingFilterButton: true,
        valueFormatter: params => params.value ?? '-'
      }}
      columnMenu={'new'}
      {...rest}
    />
  </Box>
}
