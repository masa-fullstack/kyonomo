import { NextComponentType } from 'next'
import { AppContext, AppInitialProps, AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import 'tailwindcss/tailwind.css'

const liffId = process.env.NEXT_PUBLIC_LIFF_ID
const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const initLiff = async () => {
      const liff = (await import('@line/liff')).default
      try {
        await liff.init({ liffId })
      } catch (error) {
        console.error('liff init error', error.message)
      }
      if (!liff.isLoggedIn()) {
        liff.login()
      }
    }
    initLiff()
  })

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
