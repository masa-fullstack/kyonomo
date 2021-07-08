import { VerticalFeatureRow } from './components/feature/VerticalFeatureRow'
import { Section } from './components/layout/Section'

const VerticalFeatures = () => (
  <Section
    title="Your title here"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus malesuada nisi tellus, non imperdiet nisi tempor at."
  >
    <VerticalFeatureRow
      title="回答が１タップで簡単"
      description="今日軽く飲みに行かない？と誘いたい時ありますよね。でも誘われた側も気楽に断れるように誘いたい。今日飲も🍻ではそんなお誘いの形を提供します。"
      image="/images/app.PNG"
      imageAlt="First feature alt text"
    />
    <VerticalFeatureRow
      title="主催者に回答の通知"
      description="回答があると主催者にLINE通知が来るので、簡単に回答が確認出来ます。"
      image="/images/feature2.svg"
      imageAlt="Second feature alt text"
      reverse
    />
    <VerticalFeatureRow
      title="誰がどう回答したか確認出来る"
      description="返事する時、誰がどう回答したか確認してから返事したい。ということもありますよね。今日飲も🍻では回答確認しながらの返事が可能です。"
      image="/images/feature3.svg"
      imageAlt="Third feature alt text"
    />
  </Section>
)

export { VerticalFeatures }
