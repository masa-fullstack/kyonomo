/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  answer: {
    $url: (url?: { hash?: string }) => ({ pathname: '/answer' as const, hash: url?.hash })
  },
  answerLiff: {
    $url: (url?: { hash?: string }) => ({ pathname: '/answerLiff' as const, hash: url?.hash })
  },
  hm: {
    $url: (url?: { hash?: string }) => ({ pathname: '/hm' as const, hash: url?.hash })
  },
  hmLiff: {
    $url: (url?: { hash?: string }) => ({ pathname: '/hmLiff' as const, hash: url?.hash })
  },
  invitation: {
    $url: (url?: { hash?: string }) => ({ pathname: '/invitation' as const, hash: url?.hash })
  },
  ng: {
    $url: (url?: { hash?: string }) => ({ pathname: '/ng' as const, hash: url?.hash })
  },
  ngLiff: {
    $url: (url?: { hash?: string }) => ({ pathname: '/ngLiff' as const, hash: url?.hash })
  },
  ok: {
    $url: (url?: { hash?: string }) => ({ pathname: '/ok' as const, hash: url?.hash })
  },
  okLiff: {
    $url: (url?: { hash?: string }) => ({ pathname: '/okLiff' as const, hash: url?.hash })
  },
  walkThrough: {
    $url: (url?: { hash?: string }) => ({ pathname: '/walkThrough' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath
