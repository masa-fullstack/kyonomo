import { AppConfig } from './AppConfig'

type ILogoProps = {
  xl?: boolean
}

const Logo = (props: ILogoProps) => {
  // const size = props.xl ? '44' : '32'
  const fontStyle = props.xl ? 'font-semibold text-3xl' : 'font-semibold text-xl'

  return (
    <span className={`text-gray-900 inline-flex items-center ${fontStyle}`}>
      {/* <svg
        className="text-primary-500 stroke-current mr-1"
        xmlns="http://www.w3.org/2000/svg"
        width={1.8 * Number(size)}
        height={size}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <use xlinkHref={`${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.svg#kyonomoLogo`}></use>
      </svg> */}
      {AppConfig.site_name}
    </span>
  )
}

export { Logo }
