import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'

import { headers } from '~/src/utils/apiHeaders'

const isDevelopment = true

export default (req: NextApiRequest, res: NextApiResponse) => {
  return isDevelopment
    ? httpProxyMiddleware(req, res, {
        // You can use the `http-proxy` option
        target: process.env.API_URL,
        headers,
        // In addition, you can use the `pathRewrite` option provided by `next-http-proxy`
        pathRewrite: {
          '^/api': '',
        },
      })
    : res.status(404).send(null)
}
