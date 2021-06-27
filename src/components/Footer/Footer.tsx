import React from 'react'

const Component: React.VFC = () => (
  <footer className="h-full w-screen mx-auto flex items-center justify-center">
    <p className="">
      <span role="img" aria-label="sake">
        ©Kyonomo🍻
      </span>
    </p>
  </footer>
)

const Container: React.VFC = () => {
  return <Component />
}

export default Container
