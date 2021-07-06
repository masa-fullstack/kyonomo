// import type { NextPage } from 'next'
import Head from 'next/head'

import { Layout } from '~/src/components/Layout'
import { OpacityDisplay } from '~/src/components/OpacityDisplay'
import { WalkThrough } from '~/src/components/WalkThrough'
import { OG_TITLE, returnTitle } from '~/src/utils/meta'

const WalkThroughPage = () => {
  const title = returnTitle('How to use')

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={title} />
      </Head>
      <Layout>
        <OpacityDisplay>
          <WalkThrough />
        </OpacityDisplay>
      </Layout>
    </>
  )
}

export default WalkThroughPage
