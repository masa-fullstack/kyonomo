import Link from 'next/link'

import { Button } from '~/src/components/Button'

import { CTABanner } from './components/cta/CTABanner'
import { Section } from './components/layout/Section'

const Banner = () => (
  <Section>
    <CTABanner
      title="もちろん無料です。"
      subtitle="さっそく使ってみましょう。"
      button={
        <Link href="https://lin.ee/uX0gj7O">
          <a>
            <Button color="blue" label="使ってみる" />
          </a>
        </Link>
      }
    />
  </Section>
)

export { Banner }
