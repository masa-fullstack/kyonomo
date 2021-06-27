import React from 'react'

import { Footer } from '../Footer'

const Component: React.FC = ({ children }) => (
  <>
    <main className="h-screen pb-10 pt-4 md:pt-10 container mx-auto px-4 flex justify-center">{children}</main>
    <div className="absolute bottom-0 h-10">
      <Footer />
    </div>
  </>
)

const Container: React.FC = () => {
  return <Component />
}

export default Container
