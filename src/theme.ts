import { extendTheme, withDefaultColorScheme, withDefaultVariant } from '@chakra-ui/react'

const customTheme = extendTheme(
  withDefaultVariant({
    variant: 'filled',
    components: ['Input']
  }),
  withDefaultColorScheme({ colorScheme: 'purple' })
)

export default customTheme
