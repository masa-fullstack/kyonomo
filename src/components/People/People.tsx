/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'

import { getSlicedString } from '~/src/utils/getSlicedString'

type ContainerProps = {
  name?: string
  text?: string
}

type Props = {
  isOpen: boolean
  toggleOpen: () => void
} & ContainerProps

const DISPLAY_INITIAL_MESSAGE_LENGTH = 24

const Component: React.VFC<Props> = (props) => (
  <div className="flex items-start mt-1 mb-1 max-w-xs">
    <span className="text-xxs">{props.name}</span>
    <img src="/images/people.svg" className="w-5" alt="人数" />
    {props.text && (
      <div
        title={props.text}
        onClick={() => props.toggleOpen()}
        className="inline-block break-words p-1 text-xxs bg-gray-800 w-56 text-white rounded-lg shadow-lg"
      >
        {props.isOpen || props.text.length <= DISPLAY_INITIAL_MESSAGE_LENGTH
          ? props.text
          : `${getSlicedString(props.text, DISPLAY_INITIAL_MESSAGE_LENGTH)} Tapで続きを読む`}
      </div>
    )}
  </div>
)

const Container: React.VFC<ContainerProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => {
    setIsOpen((prevState) => !prevState)
  }
  return <Component {...props} isOpen={isOpen} toggleOpen={toggleOpen} />
}

export default Container
