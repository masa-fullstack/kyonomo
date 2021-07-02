import { useSpring, animated, SpringValue } from '@react-spring/web'
import React, { useState } from 'react'

import { Button } from '../Button'
import { ColorType } from '../Button/Button'

type ContainerProps = {
  label: string
  color: ColorType
  onClick?: () => void
  ref?: React.MutableRefObject<HTMLInputElement>
}

type Props = {
  x: SpringValue<number>
  setSpringState: React.Dispatch<React.SetStateAction<boolean>>
} & ContainerProps

// eslint-disable-next-line react/display-name
const Component = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <>
    <animated.div
      style={{
        opacity: props.x.to({ range: [0, 0.5, 1], output: [1, 0.5, 1] }),
        scale: props.x.to({
          range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
          output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
        }),
      }}
    >
      <Button
        label={props.label}
        color={props.color}
        onClick={() => {
          if (props.onClick) props.onClick()
          props.setSpringState((prevState) => !prevState)
        }}
        ref={ref}
      />
    </animated.div>
  </>
))

const Container = React.forwardRef<HTMLInputElement, ContainerProps>((props, ref) => {
  const [springState, setSpringState] = useState(true)
  const { x } = useSpring({
    from: { x: 0 },
    x: springState ? 1 : 0,
    config: { duration: 1000 },
  })

  return <Component {...props} x={x} ref={ref} setSpringState={setSpringState} />
})

export default Container
