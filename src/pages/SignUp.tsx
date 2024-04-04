import { Center } from '@chakra-ui/react'
import { AboutYouForm } from '../components/AboutYouForm/AboutYouForm.tsx'
import { TheStepper } from '../components/TheStepper/TheStepper.tsx'
import { ReactElement, useContext } from 'react'
import { StepperContext } from '../context/StepperContext.tsx'
import { AddressForm } from '../components/AddressForm/AddressForm.tsx'
export const SignUp = () => {
  const { steps, activeStep } = useContext(StepperContext)!

  return <Center flexDirection={'column'}>
    <TheStepper steps={steps} activeStep={activeStep} mb={16} w={'75%'} minW={'600px'}/>
    {
      renderAccordingToStepper(activeStep, [
        <AboutYouForm key={activeStep}/>,
        <AddressForm key={activeStep}/>,
        <div>Third step</div>
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
