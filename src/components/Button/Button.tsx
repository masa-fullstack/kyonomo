import React from 'react'

export type ColorType = 'blue' | 'yellow' | 'red'

type ContainerProps = {
  label: string
  color: ColorType
  onClick?: () => void
  ref?: React.MutableRefObject<HTMLInputElement>
  disabled?: boolean
}

type Props = {
  colorStyle: string
  disabledStyle: string
} & ContainerProps

// eslint-disable-next-line react/display-name
const Component = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <>
    <input
      type="submit"
      value={props.label}
      disabled={true}
      onClick={() => {
        if (props.onClick) props.onClick()
      }}
      ref={ref}
      className={`${props.colorStyle} ${props.disabledStyle} w-48 px-10 py-6 text-white text-xl font-medium rounded-3xl cursor-pointer shadow-xl`}
    />
  </>
))

// eslint-disable-next-line react/display-name
const Container = React.forwardRef<HTMLInputElement, ContainerProps>((props, ref) => {
  const colorStyle =
    props.color === 'blue'
      ? 'bg-blue-500 hover:bg-blue-700'
      : props.color === 'yellow'
      ? 'bg-yellow-400 hover:bg-yellow-500'
      : props.color === 'red'
      ? 'bg-red-400 hover:bg-red-500'
      : ''
  const disabledStyle = props.disabled ? 'opacity-50' : ''

  return <Component {...props} colorStyle={colorStyle} disabledStyle={disabledStyle} ref={ref} />
})

export default Container
