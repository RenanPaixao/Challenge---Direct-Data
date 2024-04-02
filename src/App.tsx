import AppRouter from './routes.tsx'
import { Box, ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      {/*Layout spacing*/}
      <Box p={16}>
        <AppRouter />
      </Box>
    </ChakraProvider>
  )
}

export default App
