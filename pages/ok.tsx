import type { NextPage } from 'next'
import Head from 'next/head'

import { AnswerDetail } from '~/src/components/AnswerDetail'
import { Layout } from '~/src/components/Layout'
import { OG_TITLE, DESCRIPTION, OG_DESCRIPTION, OG_IMAGE, returnTitle } from '~/src/utils/meta'

const AnswerPage: NextPage = () => {
  const title = returnTitle('OK🙆‍♂️')
  const description = 'OKの場合はこちら'
  const closeWindow = () => {
    window.close()
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key={OG_TITLE} property={OG_TITLE} content={title} />
        <meta key={DESCRIPTION} name={DESCRIPTION} content={description} />
        <meta key={OG_DESCRIPTION} property={OG_DESCRIPTION} content={description} />
        <meta key={OG_IMAGE} property={OG_IMAGE} content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/OK_OGP.png`} />
      </Head>
      <Layout>
        <AnswerDetail initialStatus="ok" closeWindow={closeWindow} />
      </Layout>
    </>
  )
}

export default AnswerPage
