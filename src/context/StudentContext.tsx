import { createContext, PropsWithChildren, useState } from 'react'
import { AboutYouInformation } from './types'

export interface IProps {
  aboutYouInformation: AboutYouInformation | null
  setAboutYouInformation: (aboutYouInformation: AboutYouInformation) => void
}

export const StudentContext = createContext<IProps>({
  aboutYouInformation: null,
  setAboutYouInformation: () => {}
})

StudentContext.displayName = 'StudentContext'

export const StudentProvider = ({ children }: PropsWithChildren) => {
  const [aboutYouInformation, setAboutYouInformation] = useState<AboutYouInformation | null>(null)

  return <StudentContext.Provider value={{
    aboutYouInformation,
    setAboutYouInformation
  }}>
    {children}
  </StudentContext.Provider>
}
