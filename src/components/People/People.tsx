import React from 'react'

const Component: React.VFC = () => (
  <div>
    <img src="/images/people.svg" className="w-5" alt="人数" />
  </div>
)

const Container: React.VFC = () => {
  return <Component />
}

export default Container
