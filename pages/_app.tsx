import { NextComponentType } from 'next'
import { AppContext, AppInitialProps, AppProps } from 'next/app'
import Head from 'next/head'

import 'tailwindcss/tailwind.css'
import { LiffProvider } from '~/src/components/hooks/useLiff'

const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    </Head>
    <LiffProvider>
      <Component {...pageProps} />
    </LiffProvider>
  </>
)

export default App
