import AppRouter from './routes.tsx'
import { Box, ChakraProvider } from '@chakra-ui/react'
import customTheme from './theme.ts'
import { StudentProvider } from './context/StudentContext.tsx'
import './assets/styles/main.css'

function App() {
  return (
    <StudentProvider>
      <ChakraProvider theme={customTheme}>
        {/*Layout spacing*/}
        <Box p={16}>
          <AppRouter />
        </Box>
      </ChakraProvider>
    </StudentProvider>
  )
}

export default App
