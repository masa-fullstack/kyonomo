import type { NextPage } from 'next'
import Head from 'next/head'

import { AnswerDetail } from '~/src/components/AnswerDetail'
import { Layout } from '~/src/components/Layout'
import { OG_TITLE, returnTitle } from '~/src/utils/meta'

const AnswerPage: NextPage = () => {
  const title = returnTitle()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={title} />
      </Head>
      <Layout>
        <AnswerDetail />
      </Layout>
    </>
  )
}

export default AnswerPage
