/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'

import { useClickInside } from '../hooks/useClickInside'
import { useClickOutside } from '../hooks/useClickOutside'

type ContainerProps = {
  id: string
  children: React.ReactNode
}

type Props = {
  isOpen: boolean
} & ContainerProps

// eslint-disable-next-line react/display-name
const Component = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <div className="cursor-pointer relative" ref={ref} id={props.id}>
    <img src="/images/help.svg" alt="helpMessage" className="w-5" />
    {props.isOpen && (
      <span className="absolute z-10 -left-10 inline-block break-words p-1 text-xxs bg-gray-800 w-72 text-white rounded-lg shadow-lg">
        {props.children}
      </span>
    )}
  </div>
))

const Container: React.VFC<ContainerProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const clickRef = React.useRef()

  const toggleHelp = () => {
    setIsOpen((prevState) => !prevState)
  }

  const closeHelp = () => {
    setIsOpen(false)
  }
  useClickInside(clickRef, toggleHelp)
  useClickOutside(clickRef, closeHelp, isOpen)

  return <Component {...props} isOpen={isOpen} ref={clickRef} />
}

export default Container
