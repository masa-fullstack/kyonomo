// import type { NextPage } from 'next'
import Head from 'next/head'

import { Base } from '~/src/components/LandingPage/Base'
import { OpacityDisplay } from '~/src/components/OpacityDisplay'
import { OG_TITLE, returnTitle } from '~/src/utils/meta'

const IndexPage = () => {
  const title = returnTitle()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={title} />
      </Head>
      <OpacityDisplay>
        <Base />
      </OpacityDisplay>
    </>
  )
}

export default IndexPage
