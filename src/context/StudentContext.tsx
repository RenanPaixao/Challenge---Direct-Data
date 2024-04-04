import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { AboutYouInformation, Address } from './types'
import { persistOnSessionStorage, retrieveFromSessionStorage } from '../utils/persistence.ts'
import { SESSION_STORAGE_KEYS } from '../utils/constants.ts'

const { ADDRESS,ABOUT_YOU_INFORMATION } = SESSION_STORAGE_KEYS
export interface StudentContextProps {
  aboutYouInformation: AboutYouInformation | null
  setAboutYouInformation: (aboutYouInformation: AboutYouInformation) => void
  address: Address | null
  setAddress: (address: Address) => void
}

export const StudentContext = createContext<StudentContextProps>({
  aboutYouInformation: null,
  setAboutYouInformation: () => {},
  address: null,
  setAddress: () => {}
})

StudentContext.displayName = 'StudentContext'

export const StudentProvider = ({ children }: PropsWithChildren) => {
  const [aboutYouInformation, setAboutYouInformation] = useState<AboutYouInformation | null>(() => {
    return retrieveFromSessionStorage(ABOUT_YOU_INFORMATION)
  })

  const [address, setAddress] = useState<Address | null>(() => {
    return retrieveFromSessionStorage(ADDRESS)
  })

  useEffect(() => {
    persistOnSessionStorage(ABOUT_YOU_INFORMATION, aboutYouInformation)
    persistOnSessionStorage(ADDRESS, address)
  }, [aboutYouInformation, address])

  return <StudentContext.Provider value={{
    aboutYouInformation,
    setAboutYouInformation,
    address,
    setAddress
  }}>
    {children}
  </StudentContext.Provider>
}
