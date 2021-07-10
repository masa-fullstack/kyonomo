import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

import { GA_ID } from '~/src/utils/gtag'

type Props = Record<string, unknown>

class Document extends NextDocument<Props> {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon/favicon-32x32.png" type="image/png" />
          <script
            data-ad-client="ca-pub-4415028963923432"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
          {GA_ID !== undefined && (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', '${GA_ID}', {
                            page_path: window.location.pathname,
                          });`,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
