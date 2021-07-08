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
            <span className="text-primary-500">飲み会の誘いを気軽にできるように。返事が簡単に出来るように。</span>
          </>
        }
        description="今日飲も🍻 は、LINEで３秒で返事が出来るサービスです。"
      />
    </Section>
  </Background>
)

export { Hero }
