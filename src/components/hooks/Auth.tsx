import type Liff from '@line/liff'
import { SendMessagesParams } from '@line/liff/dist/lib/api/sendMessages'
import { ShareTargetPickerResult } from '@line/liff/dist/lib/api/shareTargetPicker/def'
import { createContext, FC, useContext, useEffect, useState } from 'react'

const AuthContext = createContext<typeof Liff>(undefined)

export const AuthProvider: FC = ({ children }) => {
  const [liff, setLiff] = useState<typeof Liff>()

  useEffect(() => {
    let unmounted = false
    const func = async () => {
      const liff = (await import('@line/liff')).default
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
      if (!unmounted) {
        setLiff(liff)
      }
    }
    func()
    const cleanup = () => {
      unmounted = true
    }
    return cleanup
  }, [])

  return <AuthContext.Provider value={liff}>{children}</AuthContext.Provider>
}

export type ShareTargetPicker = (messages: SendMessagesParams) => Promise<void | ShareTargetPickerResult>
export type IsApiAvailable = (apiName: string) => boolean

type UseAuthReturn = {
  initialized: boolean
  loggedIn: boolean
  login: () => void
  getIDToken: () => void
  isApiAvailable: IsApiAvailable
  shareTargetPicker: ShareTargetPicker
}

export const useAuth = (): UseAuthReturn => {
  const liff = useContext(AuthContext)

  if (!liff) {
    return {
      initialized: false,
      loggedIn: false,
      login: () => null,
      getIDToken: () => null,
      isApiAvailable: () => false,
      shareTargetPicker: () => new Promise(null),
    }
  }

  return {
    initialized: true,
    loggedIn: liff.isLoggedIn(),
    login: liff.login,
    getIDToken: liff.getIDToken,
    isApiAvailable: liff.isApiAvailable,
    shareTargetPicker: liff.shareTargetPicker,
  }
}
