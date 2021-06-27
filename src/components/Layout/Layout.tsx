import React from 'react'

import { Footer } from '../Footer'

type Props = {
  children?: React.ReactNode
}

const Component: React.VFC<Props> = ({ children }) => (
  <>
    <main className="h-screen pb-10 pt-4 md:pt-10 container mx-auto px-4 flex justify-center">{children}</main>
    <div className="absolute bottom-0 h-10">
      <Footer />
    </div>
  </>
)

const Container: React.VFC<Props> = (props) => {
  return <Component {...props} />
}

export default Container
