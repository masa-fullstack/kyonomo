import React from 'react'

import { getSlicedString } from '~/src/utils/getSlicedString'

type ContainerProps = {
  name?: string
  text?: string
}

type Props = ContainerProps

const Component: React.VFC<Props> = (props) => (
  <div className={`flex items-center mt-1 ml-12`}>
    <span className="text-xxs">{props.name}</span>
    <img src="/images/people.svg" className="w-5" alt="人数" />
    {props.text && (
      <div className="relative">
        <span
          title={props.text}
          className="absolute z-20 left-1 -bottom-2 inline-block p-1 whitespace-nowrap max-w-xxs text-xxs bg-gray-800 text-white rounded-lg shadow-lg"
        >
          {getSlicedString(props.text, 16)}
        </span>
        <svg
          className="absolute z-10 left-10 -bottom-6 w-6 h-6 transform -translate-x-12 -translate-y-3 fill-current stroke-current"
          width="12"
          height="12"
        >
          <rect x="12" y="-10" width="10" height="10" transform="rotate(44)" />
        </svg>
      </div>
    )}
  </div>
)

const Container: React.VFC<ContainerProps> = (props) => {
  return <Component {...props} />
}

export default Container
