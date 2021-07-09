import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

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
