import React from 'react'

// import ReactLoading from 'react-loading'
import { Animation } from '../Animation'

const Component: React.VFC = () => (
  <div className="flex items-center justify-center">
    {/* <ReactLoading type="bars" color="#000" width={160} height={160} /> */}
    <Animation path="/animes/loading6.json" loop={true} speed={1} />
  </div>
)

const Container: React.VFC = () => {
  return <Component />
}

export default Container
