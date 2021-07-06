import React from 'react'

import { Footer } from '../Footer'

type Props = {
  children?: React.ReactNode
}

const Component: React.VFC<Props> = ({ children }) => (
  <div className="h-screen flex flex-col">
    <main className="flex-grow pt-4 container mx-auto px-4 flex justify-center">{children}</main>
    <div className="h-10 flex-none">
      <Footer />
    </div>
  </div>
)

const Container: React.VFC<Props> = (props) => {
  return <Component {...props} />
}

export default Container
