import { useEffect, useState } from 'react'

export const useLiff = () => {
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const getUserId = async () => {
      const liff = (await import('@line/liff')).default
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID }).then(() => {
        if (!liff.isLoggedIn()) {
          liff.login({}) // ログインしていなければ最初にログインする
        } else if (liff.isInClient()) {
          liff
            .getProfile() // ユーザ情報を取得する
            .then((profile) => {
              const userId: string = profile.userId
              setUserId(userId)
            })
            .catch((error) => {
              window.alert('Error getUserId message: ' + error)
            })
        }
      })
    }
    getUserId()
  }, [])

  return { userId }
}
