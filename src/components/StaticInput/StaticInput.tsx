import React, { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

type ContainerProps = {
  label?: string
  type: InputHTMLAttributes<HTMLInputElement>['type']
  placeholder?: string
  defaultValue?: string
  readOnly?: boolean
  register: UseFormRegisterReturn
  styles?: string
  labelStyles?: string
}

type Props = ContainerProps

const Component: React.VFC<Props> = (props) => (
  <>
    {props.label && (
      <div
        className={`flex-none text-sm font-medium w-24 min-w-max rounded-l px-4 py-3 whitespace-no-wrap ${props.labelStyles}`}
      >
        {props.label}
      </div>
    )}
    {props.type === 'text' ? (
      <input
        type={props.type}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        {...props.register}
        readOnly={props.readOnly}
        className={`text-sm border-2 rounded-r px-4 py-2 w-full outline-none ${props.styles}`}
      />
    ) : props.type === 'textarea' ? (
      <textarea
        rows={4}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        {...props.register}
        className={`text-sm border-2 rounded-r px-4 py-2 w-full outline-none resize-none ${props.styles}`}
      />
    ) : null}
  </>
)

const Container: React.VFC<ContainerProps> = (props) => {
  return <Component {...props} />
}

export default Container
