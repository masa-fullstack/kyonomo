import className from 'classnames'
import { useRouter } from 'next/router'

type IVerticalFeatureRowProps = {
  title: string
  description: string
  image?: string
  imageAlt?: string
  itemNumber?: string
  reverse?: boolean
  children?: ReactNode
}

const VerticalFeatureRow = (props: IVerticalFeatureRowProps) => {
  const verticalFeatureClass = className('mt-20', 'flex', 'flex-wrap', 'items-center', {
    'flex-row-reverse': props.reverse,
  })

  const router = useRouter()

  return (
    <div className={verticalFeatureClass}>
      <div className="w-full sm:w-1/2 sm:px-6">
        <div className="text-center">
          {props.itemNumber && (
            <h3 className="text-6xl text-blue-600 font-semibold mb-5">
              <span className="border-b-2">{props.itemNumber}</span>
            </h3>
          )}
          <h3 className="text-2xl text-gray-900 font-semibold">{props.title}</h3>
        </div>
        <div className="mt-6 text-base leading-7">{props.description}</div>
      </div>
      {props.image && (
        <div className="w-full sm:w-1/2 p-6">
          <img src={`${router.basePath}${props.image}`} alt={props.imageAlt} />
        </div>
      )}
      {props.children}
    </div>
  )
}

export { VerticalFeatureRow }
