import type Liff from '@line/liff'
import { useEffect, useState } from 'react'

const liffId = process.env.NEXT_PUBLIC_LIFF_ID

export const useLiff = async () => {
  //   const [liff, setLiff] = useState<typeof Liff>()
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    const getLiffInfo = async () => {
      const liff = (await import('@line/liff')).default
      try {
        await liff.init({ liffId })

        const { userId } = await initializeApp(liff)
        setUserId(userId)
      } catch (error) {
        console.error('liff init error', error.message)
      }
      if (!liff.isLoggedIn()) {
        liff.login()
      }
    }
    const initializeApp = async (liff: typeof Liff) => {
      const userId = await liff.getProfile().then(async (profile) => profile.userId)
      return { userId }
    }

    getLiffInfo()
  })
  return { userId }
}
