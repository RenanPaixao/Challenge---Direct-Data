import AppRouter from './routes.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from './theme.ts'
import { StudentProvider } from './context/StudentContext.tsx'
import './assets/styles/main.css'

function App() {
  return (
    <StudentProvider>
      <ChakraProvider theme={customTheme}>
          <AppRouter />
      </ChakraProvider>
    </StudentProvider>
  )
}

export default App
