import type Liff from '@line/liff'
import { createContext, FC, useContext, useEffect, useState } from 'react'

const LiffContext = createContext<typeof Liff>(undefined)

export const LiffProvider: FC = ({ children }) => {
  const [liff, setLiff] = useState<typeof Liff>()

  useEffect(() => {
    let unmounted = false
    const mountLiff = async () => {
      // eslint-disable-next-line no-console
      console.log('liff')
      const liff = (await import('@line/liff')).default
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
      if (!unmounted) {
        setLiff(liff)
      }
    }
    mountLiff()
    const cleanup = () => {
      unmounted = true
    }
    return cleanup
  }, [])

  return <LiffContext.Provider value={liff}>{children}</LiffContext.Provider>
}

type UseLiffReturn = {
  initialized: boolean
  loggedIn: boolean
  login: () => void
  userId?: string
}

export const useLiff = (): UseLiffReturn => {
  const liff = useContext(LiffContext)

  if (!liff) {
    return {
      initialized: false,
      loggedIn: false,
      login: () => null,
    }
  }

  return {
    initialized: true,
    loggedIn: liff.isLoggedIn(),
    login: liff.login,
    userId: liff.getContext().userId,
  }
}
