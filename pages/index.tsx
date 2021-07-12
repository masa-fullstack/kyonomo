// import type { NextPage } from 'next'
import Head from 'next/head'

import { Base } from '~/src/components/LandingPage/Base'
import { OpacityDisplay } from '~/src/components/OpacityDisplay'
import { OG_TITLE, DESCRIPTION, OG_DESCRIPTION, OG_IMAGE, returnTitle } from '~/src/utils/meta'

const IndexPage = () => {
  const title = returnTitle()
  const description =
    '飲みの誘いを気軽に。回答を簡単に。今日飲も？🍻 はLINEのトークルームからお誘いの回答が１タップで出来るサービスです。'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key={DESCRIPTION} name={DESCRIPTION} content={description} />
        <meta key={OG_TITLE} property={OG_TITLE} content={title} />
        <meta key={OG_DESCRIPTION} property={OG_DESCRIPTION} content={description} />
        <meta key={OG_IMAGE} property={OG_IMAGE} content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/LP_OGP.png`} />
      </Head>
      <OpacityDisplay>
        <Base />
      </OpacityDisplay>
    </>
  )
}

export default IndexPage
