import { Center } from '@chakra-ui/react'
import { AboutYouForm } from '../components/AboutYouForm/AboutYouForm.tsx'
import { TheStepper } from '../components/TheStepper/TheStepper.tsx'
import { ReactElement, useContext, useEffect } from 'react'
import { StepperContext } from '../context/StepperContext.tsx'
import { AddressForm } from '../components/AddressForm/AddressForm.tsx'
import { ReviewStep } from '../components/ReviewStep/ReviewStep.tsx'
import { removeFromSessionStorage } from '../utils/persistence.ts'
import { SESSION_STORAGE_KEYS } from '../utils/constants.ts'
import { StudentContext } from '../context/StudentContext.tsx'

const { ADDRESS, ABOUT_YOU_INFORMATION } = SESSION_STORAGE_KEYS
export const SignUp = () => {
  const { clearStudentContext } = useContext(StudentContext)
  const { steps, activeStep } = useContext(StepperContext)!

  useEffect(() => {
    return () => {
      clearStudentContext()
      removeFromSessionStorage(ABOUT_YOU_INFORMATION)
      removeFromSessionStorage(ADDRESS)
    }
  }, [])

  return <Center flexDirection={'column'}>
    <TheStepper steps={steps} activeStep={activeStep} mb={16} w={'75%'} minW={'600px'}/>
    {
      renderAccordingToStepper(activeStep, [
        <AboutYouForm key={activeStep}/>,
        <AddressForm key={activeStep}/>,
        <ReviewStep key={activeStep}/>
      ])
    }
  </Center>
}

/**
 * Render the component according to the active step.
 * @param activeStep
 * @param componentsInOrder
 */
function renderAccordingToStepper(activeStep: number, componentsInOrder: ReactElement[]) {
  return componentsInOrder.map((component, index) => {
    if (index === activeStep) {
      return component
    }
  })
}
