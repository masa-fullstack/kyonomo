import type { NextPage } from 'next'
import Head from 'next/head'

import { AnswerDetail } from '~/src/components/AnswerDetail'
import { Layout } from '~/src/components/Layout'
import { useLiff } from '~/src/components/hooks/useLiff'
import { OG_TITLE, DESCRIPTION, OG_DESCRIPTION, OG_IMAGE, returnTitle } from '~/src/utils/meta'

const AnswerPage: NextPage = () => {
  const title = returnTitle('Hmm...🤔')
  const description = '条件付き参加の場合はこちら'
  const { closeWindow, token } = useLiff()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={title} />
        <meta key={DESCRIPTION} name={DESCRIPTION} content={description} />
        <meta key={OG_DESCRIPTION} property={OG_DESCRIPTION} content={description} />
        <meta key={OG_IMAGE} property={OG_IMAGE} content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/HM_OGP.png`} />
      </Head>
      <Layout>
        <AnswerDetail initialStatus="hm" closeWindow={closeWindow} token={token} />
      </Layout>
    </>
  )
}

export default AnswerPage
