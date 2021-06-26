import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

type Props = Record<string, unknown>

class Document extends NextDocument<Props> {
  render(): JSX.Element {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
