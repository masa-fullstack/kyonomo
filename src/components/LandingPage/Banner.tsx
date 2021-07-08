import Link from 'next/link'

import { Button } from '~/src/components/Button'

import { CTABanner } from './components/cta/CTABanner'
import { Section } from './components/layout/Section'

const Banner = () => (
  <Section>
    <CTABanner
      title="もちろん無料で使えます。さっそく使ってみましょう。"
      subtitle=""
      button={
        <Link href="https://liff.line.me/1645278921-kWRPP32q?accountId=182kyetg&openerPlatform=native&openerKey=talkroom%3Amessage#mst_challenge=xUr-rmkrG2ITKwN3-WlCFrC3w8RYzY6fSSdvywiqxWo">
          <a>
            <Button color="blue" label="使ってみる" />
          </a>
        </Link>
      }
    />
  </Section>
)

export { Banner }
