/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  answer: {
    $url: (url?: { hash?: string }) => ({ pathname: '/answer' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath
