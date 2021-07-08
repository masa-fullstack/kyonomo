// import type { NextPage } from 'next'
import Head from 'next/head'

import { InvitationDetail } from '~/src/components/InvitationDetail'
import { Layout } from '~/src/components/Layout'
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
      <Layout>
        <OpacityDisplay>
          <InvitationDetail />
        </OpacityDisplay>
      </Layout>
    </>
  )
}

export default IndexPage
