import React from 'react'

type ContainerProps = {
  label: string
}

type Props = ContainerProps

const Component: React.VFC<Props> = (props) => (
  <>
    <input
      type="submit"
      value={props.label}
      className="px-10 py-5 bg-indigo-700 text-white text-xl font-medium rounded-3xl cursor-pointer"
    />
  </>
)

const Container: React.VFC<ContainerProps> = (props) => {
  return <Component {...props} />
}

export default Container
