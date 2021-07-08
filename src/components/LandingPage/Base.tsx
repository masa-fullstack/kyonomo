import { Footer } from '../Footer'

import { Banner } from './Banner'
import { Hero } from './Hero'
import { VerticalFeatures } from './VerticalFeatures'

const Base = () => (
  <div className="antialiased text-gray-600">
    <Hero />
    <VerticalFeatures />
    <Banner />
    <Footer />
  </div>
)

export { Base }
