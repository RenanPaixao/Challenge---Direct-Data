import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { AboutYouInformation } from './types'
import { persistOnSessionStorage, retrieveFromSessionStorage } from '../utils/persistence.ts'

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
  const sessionStorageKey = 'aboutYouInformation'
  const [aboutYouInformation, setAboutYouInformation] = useState<AboutYouInformation | null>(() => {
    return retrieveFromSessionStorage(sessionStorageKey)
  })

  useEffect(() => {
    persistOnSessionStorage(sessionStorageKey, aboutYouInformation)
  }, [aboutYouInformation])

  return <StudentContext.Provider value={{
    aboutYouInformation,
    setAboutYouInformation
  }}>
    {children}
  </StudentContext.Provider>
}
