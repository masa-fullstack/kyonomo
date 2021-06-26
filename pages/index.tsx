import type { NextPage } from 'next'
import Head from 'next/head'

import { InvitationDetail } from '~/src/components/InvitationDetail'
import { OG_TITLE, returnTitle } from '~/src/utils/meta'

const IndexPage: NextPage = () => {
  const title = returnTitle()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={title} />
      </Head>
      <InvitationDetail />
    </>
  )
}

export default IndexPage
