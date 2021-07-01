// import type { NextPage } from 'next'
import Head from 'next/head'
import useSWR from 'swr'

import { InvitationDetail } from '~/src/components/InvitationDetail'
import { Layout } from '~/src/components/Layout'
import { useLiff } from '~/src/components/hooks/useLiff'
import { OG_TITLE, returnTitle } from '~/src/utils/meta'

const IndexPage = () => {
  const title = returnTitle()
  const { data } = useSWR('userId', useLiff)

  // eslint-disable-next-line no-console
  console.log(data)
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={title} />
      </Head>
      <Layout>
        <InvitationDetail userId="text" />
      </Layout>
    </>
  )
}

export default IndexPage
