/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import lottie from 'lottie-web'
import React, { useEffect, useRef } from 'react'

type ContainerPorps = {
  speed?: number
  onClick?: () => void
}

type Props = {
  className?: string
} & ContainerPorps

// eslint-disable-next-line react/display-name
const Component = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  return <div ref={ref} className={`w-80 h-80 ${props.className}`} onClick={props.onClick} />
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

  return <Component {...props} ref={ref} />
}

export default Container
