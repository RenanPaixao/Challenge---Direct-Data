import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NotFound } from './pages/NotFound.tsx'
import { SignUp } from './pages/SignUp.tsx'
import { StepperProvider } from './context/StepperContext.tsx'
import { useSteps } from '@chakra-ui/react'

const signUpSteps = [
  { title: 'Sobre Você' },
  { title: 'Endereço' },
  { title: 'Confirmação'  }
]

/**
 * Creates a router for the application.
 */
export default function AppRouter() {
  const signUpStepHandler = useSteps({
    index: 0,
    count: signUpSteps.length
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={
          <StepperProvider {...signUpStepHandler} steps={signUpSteps}>
            <SignUp />
          </StepperProvider>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

