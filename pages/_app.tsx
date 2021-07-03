import { AppProps } from 'next/app'
import Head from 'next/head'
import { FC } from 'react'

import 'tailwindcss/tailwind.css'
import { Loading } from '~/src/components/Loading'
import { LiffProvider, useLiff } from '~/src/components/hooks/useLiff'

const Layout: FC = ({ children }) => {
  const { initialized, loggedIn, login } = useLiff()

  if (!initialized) {
    return <Loading />
  }

  if (!loggedIn) {
    return <button onClick={login}>log in</button>
  }

  return <>{children}</>
}

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <LiffProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LiffProvider>
    </>
  )
}

export default App
