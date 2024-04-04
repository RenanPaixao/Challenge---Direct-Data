import { render, RenderOptions } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { PropsWithChildren, ReactElement } from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from '@remix-run/router'
import { userEvent } from '@testing-library/user-event'
import { StudentContext, StudentContextProps } from '../src/context/StudentContext.tsx'
import { StepperProvider } from '../src/context/StepperContext.tsx'
import { IStep } from '../src/components/TheStepper/TheStepper.tsx'
import { screen } from '@testing-library/dom'

export interface FormField {
  name: string
  value: string
  role: string
}

const testingHistory = createMemoryHistory()
const user = userEvent.setup()

// Disabled due to not needing to export a component.
// eslint-disable-next-line react-refresh/only-export-components
const Wrapper = ({ children }: PropsWithChildren) => {
  return <ChakraProvider>
    {/*Creates a fake router for testing.*/}
    <Router location={testingHistory.location} navigator={testingHistory}>
      {children}
    </Router>
  </ChakraProvider>
}

/**
 * Custom render function that wraps the component with All Providers.
 * @param ui
 * @param options
 */
function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: Wrapper, ...options })
}

/**
 * Custom render function that wraps the component with UserContext and other common contexts.
 * @param ui
 * @param contextValues
 */
function renderWithStudentContext(ui: ReactElement, contextValues?: Partial<StudentContextProps>) {
  const steps: IStep[] = Array(3).map((_, index) => ({ title: `step ${index}` }))

  return customRender(
    <StudentContext.Provider value={{
      aboutYouInformation: {
        name: '',
        lastName: '',
        cpf: '',
        email: '',
        height: '',
        weight: '',
        birthDate: '',
        phone: '',
        responsible: null,
        ...contextValues?.aboutYouInformation
      },
      setAboutYouInformation: contextValues?.setAboutYouInformation || (() => {}),
      address: {
        cep: '',
        district: '',
        street: '',
        complement: '',
        state: '',
        city: '',
        number: '',
        ...contextValues?.address
      },
      setAddress: contextValues?.setAddress || (() => {})
    }}>
      <StepperProvider
        steps={steps}
        goToNext={vi.fn()}
        activeStep={0}
        activeStepPercent={0}
        getStatus={vi.fn()}
        goToPrevious={vi.fn()}
        isActiveStep={vi.fn()}
        isCompleteStep={vi.fn()}
        isIncompleteStep={vi.fn()}
        setActiveStep={vi.fn()
        }
      >
        {ui}
      </StepperProvider>
    </StudentContext.Provider>
  )
}

/**
 * Fill form fields with the given values.
 * @param formValues
 */
async function fillForm<T extends Record<string, unknown>>(formValues: Partial<T>) {
  const { getByRole, getByTestId } = screen

  for (const { name, role, value } of Object.values(formValues)) {
    const input = role === 'Date' ? getByTestId(name) : getByRole(role, { name: new RegExp(`\\b${name}\\b`) })
    await user.type(input, value)
  }
}

export {
  customRender,
  renderWithStudentContext,
  testingHistory,
  user,
  fillForm
}
