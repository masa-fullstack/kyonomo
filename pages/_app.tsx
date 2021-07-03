import { NextComponentType } from 'next'
import { AppContext, AppInitialProps, AppProps } from 'next/app'
import Head from 'next/head'

import 'tailwindcss/tailwind.css'
import { AuthProvider, useAuth } from '~/src/components/hooks/Auth'

const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({ Component, pageProps }) => {
  const { initialized, loggedIn, login } = useAuth()

  if (!initialized) {
    return <p>loading...</p>
  }

  if (!loggedIn) {
    return <button onClick={login}>log in</button>
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default App
