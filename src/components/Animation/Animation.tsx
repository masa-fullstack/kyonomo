import lottie from 'lottie-web'
import React, { useEffect, useRef } from 'react'

type ContainerPorps = {
  speed?: number
}

type Props = {
  className?: string
}

// eslint-disable-next-line react/display-name
const Component = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  return <div ref={ref} className={`w-80 h-80 ${props.className}`} />
})

const Container: React.VFC<ContainerPorps> = (props) => {
  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    lottie.loadAnimation({
      container: ref.current,
      loop: false,
      autoplay: true,
      path: '/images/check.json',
    })
    if (props.speed) lottie.setSpeed(props.speed)
  }, [props.speed])

  return <Component ref={ref} />
}

export default Container
