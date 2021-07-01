// import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { InvitationDetail } from '~/src/components/InvitationDetail'
import { Layout } from '~/src/components/Layout'
import { OG_TITLE, returnTitle } from '~/src/utils/meta'

const IndexPage = () => {
  const title = returnTitle()

  const [userId, setUserId] = useState<string>()

  useEffect(() => {
    const func = async () => {
      const liff = (await import('@line/liff')).default
      await liff.ready
      const userId = await (await liff.getProfile()).userId
      setUserId(userId)
    }
    func()
  }, [userId])

  // eslint-disable-next-line no-console
  console.log(userId)

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
