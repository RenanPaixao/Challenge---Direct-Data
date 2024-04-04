import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { AboutYouInformation, Address } from './types'
import { persistOnSessionStorage, retrieveFromSessionStorage } from '../utils/persistence.ts'

export interface IProps {
  aboutYouInformation: AboutYouInformation | null
  setAboutYouInformation: (aboutYouInformation: AboutYouInformation) => void
  address: Address | null
  setAddress: (address: Address) => void
}

export const StudentContext = createContext<IProps>({
  aboutYouInformation: null,
  setAboutYouInformation: () => {},
  address: null,
  setAddress: () => {}
})

StudentContext.displayName = 'StudentContext'

export const StudentProvider = ({ children }: PropsWithChildren) => {
  const aboutYouStorageKey = 'aboutYouInformation'
  const addressStorageKey = 'address'

  const [aboutYouInformation, setAboutYouInformation] = useState<AboutYouInformation | null>(() => {
    return retrieveFromSessionStorage(aboutYouStorageKey)
  })

  const [address, setAddress] = useState<Address | null>(() => {
    return retrieveFromSessionStorage(addressStorageKey)
  })

  useEffect(() => {
    persistOnSessionStorage(aboutYouStorageKey, aboutYouInformation)
    persistOnSessionStorage(addressStorageKey, address)
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
