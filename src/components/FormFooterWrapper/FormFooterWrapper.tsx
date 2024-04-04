import { Flex, FlexProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const FormFooterWrapper = ({ children, ...rest }: PropsWithChildren<FlexProps>) => {
  return <Flex justifyContent={'space-between'} w={'100%'} {...rest}>
    {children}
  </Flex>
}
