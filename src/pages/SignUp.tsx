import { Center } from '@chakra-ui/react'
import { AboutYouForm } from '../components/AboutYouForm/AboutYouForm.tsx'
import { TheStepper } from '../components/TheStepper/TheStepper.tsx'
import { useContext } from 'react'
import { StepperContext } from '../context/StepperContext.tsx'
export const SignUp = () => {
  const { steps, activeStep } = useContext(StepperContext)!

  return <Center flexDirection={'column'}>
    <TheStepper steps={steps} activeStep={activeStep} mb={16} w={'75%'} minW={'600px'}/>
    <AboutYouForm/>
  </Center>
}
