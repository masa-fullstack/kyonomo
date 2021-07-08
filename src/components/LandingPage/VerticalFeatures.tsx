import { Animation } from '~/src/components/Animation'

import { VerticalFeatureRow } from './components/feature/VerticalFeatureRow'
import { Section } from './components/layout/Section'

const VerticalFeatures = () => (
  <>
    <Section title="今日飲も🍻 を使うメリット" description="">
      <VerticalFeatureRow
        itemNumber="01"
        title="回答までの時間短縮"
        description="１タップで回答できるので、回答者は返事の文章を考える手間がなくなり、回答までの時間が短縮されます。仕事中でも３秒程度でぱぱっと回答できることを目指しました。"
      >
        <div className="mx-auto">
          <Animation path="/animes/anime5.json" loop={true} speed={1} />
        </div>
      </VerticalFeatureRow>
      <VerticalFeatureRow
        itemNumber="02"
        title="回答者の負担がなくなる"
        description="回答が１タップであるという共通認識があるので、断る時は回答者の心理的な負担が減ります。"
        reverse
      >
        <div className="mx-auto">
          <Animation path="/animes/anime6.json" loop={true} speed={1} />
        </div>
      </VerticalFeatureRow>
      <VerticalFeatureRow
        itemNumber="03"
        title="気軽に誘える雰囲気ができる"
        description="回答者の負担が少なくなるので、誘う側も気軽に誘う事ができます。"
        reverse
      >
        <div className="mx-auto">
          <Animation path="/animes/anime3.json" loop={true} speed={1} />
        </div>
      </VerticalFeatureRow>
    </Section>
    <Section title="ご利用の流れ" description="">
      <div className="w-full p-6">
        <img src={`/images/flow.png`} className="w-96 mx-auto" alt="ご利用の流れ" />
      </div>
    </Section>
  </>
)

export { VerticalFeatures }
