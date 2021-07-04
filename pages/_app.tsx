import { AppProps } from 'next/app'
import Head from 'next/head'
import { FC } from 'react'

import 'tailwindcss/tailwind.css'
import { Layout } from '~/src/components/Layout'
import { Loading } from '~/src/components/Loading'
import { LiffProvider, useLiff } from '~/src/components/hooks/useLiff'
import { getAsString } from '~/src/utils/getAsString'

const Liff: FC = ({ children }) => {
  const { initialized, loggedIn, login } = useLiff()

  if (!initialized) {
    return (
      <Layout>
        <Loading />
      </Layout>
    )
  }

  if (!loggedIn) {
    return (
      <Layout>
        <div className="flex items-center justify-center">
          <button onClick={login}>log in</button>
        </div>
      </Layout>
    )
  }

  return <>{children}</>
}

function App({ Component, pageProps, router }: AppProps) {
  if (getAsString(router.query.isLiff) === 'true') {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        </Head>
        <LiffProvider>
          <Liff>
            <Component {...pageProps} />
          </Liff>
        </LiffProvider>
      </>
    )
  } else {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        </Head>
        <Component {...pageProps} />
      </>
    )
  }
}

export default App
