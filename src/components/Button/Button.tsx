import React from 'react'

type ContainerProps = {
  label: string
  color: string
  onClick?: () => void
}

type Props = ContainerProps

const Component: React.VFC<Props> = (props) => (
  <>
    <input
      type="submit"
      value={props.label}
      onClick={props.onClick}
      className={`${props.color} w-48 px-10 py-8 text-white text-xl font-medium rounded-3xl cursor-pointer`}
    />
  </>
)

const Container: React.VFC<ContainerProps> = (props) => {
  return <Component {...props} />
}

export default Container
