import { Logo } from './Logo'
import { Background } from './components/background/Background'
import { HeroOneButton } from './components/hero/HeroOneButton'
import { Section } from './components/layout/Section'
import { NavbarTwoColumns } from './components/navigation/NavbarTwoColumns'

const Hero = () => (
  <Background color="bg-gray-100">
    <Section yPadding="py-6">
      <NavbarTwoColumns logo={<Logo xl />} />
    </Section>

    <Section yPadding="pt-12 pb-12">
      <HeroOneButton
        title={
          <>
            <div className="text-primary-500">
              <p>飲み会の誘いを気軽に。</p>
              <p>返事も簡単に。</p>
            </div>
          </>
        }
        description={
          <>
            <div className="text-primary-500">
              <p>
                <span role="img" aria-label="beer">
                  今日飲も🍻 は、
                </span>
              </p>
              <p>LINEトークルームから</p>
              <p>１タップで返事が出来るサービスです。</p>
            </div>
            <div className="mt-6">
              <img src="/images/iPhoneX.png" className="w-56 mx-auto" alt="app" />
            </div>
          </>
        }
      />
    </Section>
  </Background>
)

export { Hero }
