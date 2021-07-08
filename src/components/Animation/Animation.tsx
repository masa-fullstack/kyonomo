import lottie from 'lottie-web'
import React, { useEffect, useRef } from 'react'

type ContainerPorps = {
  path: string
  speed?: number
  loop?: boolean
  onClick?: () => void
}

type Props = {
  className?: string
} & ContainerPorps

// eslint-disable-next-line react/display-name
const Component = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  return <div ref={ref} className={`w-80 h-80 ${props.className}`} />
})

const Container: React.VFC<ContainerPorps> = (props) => {
  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    lottie.loadAnimation({
      container: ref.current,
      loop: props.loop,
      autoplay: true,
      path: props.path,
    })
    if (props.speed) lottie.setSpeed(props.speed)
  }, [props.speed, props.path])

  return <Component {...props} ref={ref} />
}

export default Container
