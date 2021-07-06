import { useRouter } from 'next/dist/client/router'
import React from 'react'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Button } from '../Button'

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const images = [
  { src: '/images/walkthrough1.png', isEnd: false },
  { src: '/images/walkthrough2.png', isEnd: false },
  { src: '/images/walkthrough3.png', isEnd: false },
  { src: '/images/walkthrough4.png', isEnd: false },
  { src: '/images/walkthrough5.png', isEnd: false },
  { src: '/images/walkthrough6.png', isEnd: false },
  { src: '/images/walkthrough7.png', isEnd: false },
  { src: '/images/walkthrough8.png', isEnd: true },
]

type Props = {
  linkToApp: () => void
}
const Component: React.VFC<Props> = (props) => (
  <div className="w-88">
    <Slider {...settings}>
      {images.map((image, idx) => (
        <div key={idx}>
          <img src={image.src} alt="how to use" />
          {image.isEnd && (
            <div className="ml-5 mb-2">
              <Button label="使ってみる🍻" color="blue" onClick={() => props.linkToApp()} />
            </div>
          )}
        </div>
      ))}
    </Slider>
  </div>
)

const Container: React.VFC = () => {
  const { push } = useRouter()
  const linkToApp = () => {
    push(process.env.NEXT_PUBLIC_LIFF_ID)
  }
  return <Component linkToApp={linkToApp} />
}

export default Container
