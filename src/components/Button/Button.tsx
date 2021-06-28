import React from 'react'

type ColorType = 'blue' | 'yellow' | 'red'

type ContainerProps = {
  label: string
  color: ColorType
  onClick?: () => void
}

type Props = { colorStyle: string } & ContainerProps

const Component: React.VFC<Props> = (props) => (
  <>
    <input
      type="submit"
      value={props.label}
      onClick={props.onClick}
      className={`${props.colorStyle} w-48 px-10 py-6 text-white text-xl font-medium rounded-3xl cursor-pointer shadow-xl`}
    />
  </>
)

const Container: React.VFC<ContainerProps> = (props) => {
  const colorStyle =
    props.color === 'blue'
      ? 'bg-blue-500 hover:bg-blue-700'
      : props.color === 'yellow'
      ? 'bg-yellow-400 hover:bg-yellow-500'
      : props.color === 'red'
      ? 'bg-red-400 hover:bg-red-500'
      : ''
  return <Component {...props} colorStyle={colorStyle} />
}

export default Container
