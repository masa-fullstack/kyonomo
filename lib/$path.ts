/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  answer: {
    $url: (url?: { hash?: string }) => ({ pathname: '/answer' as const, hash: url?.hash })
  },
  hm: {
    $url: (url?: { hash?: string }) => ({ pathname: '/hm' as const, hash: url?.hash })
  },
  ng: {
    $url: (url?: { hash?: string }) => ({ pathname: '/ng' as const, hash: url?.hash })
  },
  ok: {
    $url: (url?: { hash?: string }) => ({ pathname: '/ok' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath
