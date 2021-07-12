// import { Logo } from './Logo'
import { Background } from './components/background/Background'
import { HeroOneButton } from './components/hero/HeroOneButton'
import { Section } from './components/layout/Section'
// import { NavbarTwoColumns } from './components/navigation/NavbarTwoColumns'

const Hero = () => (
  <Background color="bg-gray-100">
    {/* <Section yPadding="py-6">
      <NavbarTwoColumns logo={<Logo xl />} />
    </Section> */}

    <Section yPadding="pt-12 pb-12">
      <HeroOneButton
        title={
          <>
            <div className="text-primary-500 mb-6">
              <p className="mb-3">飲みの誘いを気軽に。</p>
              <p>回答を簡単に。</p>
            </div>
          </>
        }
        description={
          <>
            <div className="text-primary-500">
              <p>
                <span role="img" aria-label="beer">
                  今日飲も？🍻 は
                </span>
              </p>
              <p>LINEのトークルームから</p>
              <p>お誘いの回答が１タップで</p>
              <p>出来るサービスです。</p>
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
