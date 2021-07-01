// import type { NextPage } from 'next'
import Head from 'next/head'

import { InvitationDetail } from '~/src/components/InvitationDetail'
import { Layout } from '~/src/components/Layout'
// import { useLiff } from '~/src/components/hooks/useLiff'
import { OG_TITLE, returnTitle } from '~/src/utils/meta'

const IndexPage = async () => {
  const title = returnTitle()
  // const { userId } = await useLiff()
  const { userId } = { userId: 'test' }
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={title} />
      </Head>
      <Layout>
        <InvitationDetail userId={userId} />
      </Layout>
    </>
  )
}

export default IndexPage
