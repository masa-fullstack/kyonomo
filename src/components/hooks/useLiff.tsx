import type Liff from '@line/liff'
import { useEffect, useState } from 'react'

const liffId = process.env.NEXT_PUBLIC_LIFF_ID

export const useLiff = () => {
  const [liff, setLiff] = useState<typeof Liff>()

  useEffect(() => {
    const mounteLiff = async () => {
      const liff = (await import('@line/liff')).default
      try {
        await liff.init({ liffId })
        setLiff(liff)
      } catch (error) {
        console.error('liff init error', error.message)
      }
      if (!liff.isLoggedIn()) {
        liff.login()
      }
    }
    mounteLiff()
  })

  if (!liff) return { undefined }
  return { liff }
}
