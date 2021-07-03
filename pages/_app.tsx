import { AppProps } from 'next/app'
import Head from 'next/head'
import { FC } from 'react'

import 'tailwindcss/tailwind.css'
import { AuthProvider, useAuth } from '~/src/components/hooks/Auth'

const Layout: FC = ({ children }) => {
  const { initialized, loggedIn, login } = useAuth()

  if (!initialized) {
    return <p>loading...</p>
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
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  )
}

export default App
