export const OG_TITLE = 'og:title'
export const DESCRIPTION = 'description'
export const OG_DESCRIPTION = 'og:description'
export const OG_TYPE = 'og:type'
export const OG_IMAGE = 'og:image'

if (process.env.NEXT_PUBLIC_SITE_URL === undefined) {
  throw Error('envファイルにNEXT_PUBLIC_SITE_URLを設定してください。')
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

const title = '今日飲も🍻'
export const description = '今日飲も🍻'

export const returnTitle = (pageTitle?: string) => {
  if (pageTitle !== undefined) {
    return `${pageTitle} | ${title}`
  } else {
    return title
  }
}
