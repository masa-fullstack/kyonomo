import { useSpring, animated, SpringValue } from '@react-spring/web'
import React from 'react'

type ContainerProps = {
  children?: React.ReactNode
}

type Props = {
  x: SpringValue<number>
} & ContainerProps

const Component: React.VFC<Props> = (props) => (
  <>
    <animated.div
      style={{
        opacity: props.x.to({ range: [0, 1], output: [0, 1] }),
      }}
    >
      {props.children}
    </animated.div>
  </>
)

const Container: React.VFC<ContainerProps> = (props) => {
  const { x } = useSpring({
    from: { x: 0 },
    x: 1,
    config: { duration: 500 },
  })

  return <Component {...props} x={x} />
}

export default Container
