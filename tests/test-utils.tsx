import { render, RenderOptions } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { PropsWithChildren, ReactElement } from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from '@remix-run/router'
import { userEvent } from '@testing-library/user-event'
import { StudentContext, IProps as StudentContextProps } from '../src/context/StudentContext.tsx'

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
  return customRender(
    <StudentContext.Provider value={{
      aboutYouInformation: {
        name: 'John',
        lastName: 'Doe',
        cpf: '123456789',
        email: 'test@test.com',
        height: '1.80',
        weight: '80',
        birthDate: '1990-01-01',
        phone: '12345678910',
        responsible: null,
        ...contextValues?.aboutYouInformation
      },
      setAboutYouInformation: contextValues?.setAboutYouInformation || (() => {})
    }}>
      {ui}
    </StudentContext.Provider>
  )
}

export {
  customRender,
  renderWithStudentContext,
  testingHistory,
  user
}
