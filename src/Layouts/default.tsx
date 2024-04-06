import { PropsWithChildren } from 'react'
import { Box } from '@chakra-ui/react'

export const DefaultLayout = (props: PropsWithChildren) => {
  return <Box p={16}>
    {props.children}
  </Box>
}
