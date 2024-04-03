import { UseStepsReturn } from '@chakra-ui/react'
import { createContext, PropsWithChildren } from 'react'
import { IStep } from '../components/TheStepper/TheStepper.tsx'

interface IProps extends UseStepsReturn {
  steps: IStep[]
}
export const StepperContext = createContext<IProps | null>(null)

StepperContext.displayName = 'StepperContext'

export const StepperProvider = ({ children, ...rest }: PropsWithChildren<IProps>) => {
  return <StepperContext.Provider value={{ ...rest }}>
    {children}
  </StepperContext.Provider>
}

