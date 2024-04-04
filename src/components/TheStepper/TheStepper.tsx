import {
  Box,
  BoxProps,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle
} from '@chakra-ui/react'

export interface IStep {
  title: string
  description?: string
}

interface IProps extends BoxProps{
  steps: IStep[]
  activeStep: number
}

export const TheStepper = ({ steps, activeStep, ...rest }: IProps) => {
  return <Box
    border={'thin solid var(--chakra-colors-gray-300)'}
    borderRadius={8}
    p={8}
    {...rest}
  >
    <Stepper
      size={['md', null, 'lg']}
      index={activeStep}
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  </Box>
}
