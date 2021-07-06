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
  { src: '/images/ANSWER_OGP.png', isEnd: false },
  { src: '/images/OK_OGP.png', isEnd: false },
  { src: '/images/HM_OGP.png', isEnd: false },
  { src: '/images/NG_OGP.png', isEnd: false },
  { src: '/images/permission.png', isEnd: true },
]

const Component: React.VFC = () => (
  <div className="w-80">
    <Slider {...settings}>
      {images.map((image, idx) => (
        <div className="w-full flex flex-row items-center justify-center" key={idx}>
          <img src={image.src} className="w-80" alt="how to use" />
          {image.isEnd && (
            <div className="ml-5">
              <Button label="使ってみる🍻" color="blue" />
            </div>
          )}
        </div>
      ))}
    </Slider>
  </div>
)

const Container: React.VFC = () => {
  return <Component />
}

export default Container
