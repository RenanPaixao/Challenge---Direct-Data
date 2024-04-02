import AppRouter from './routes.tsx'
import { Box, ChakraProvider } from '@chakra-ui/react'
import customTheme from './theme.ts'

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      {/*Layout spacing*/}
      <Box p={16}>
        <AppRouter />
      </Box>
    </ChakraProvider>
  )
}

export default App
