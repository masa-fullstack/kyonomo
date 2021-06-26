// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './.env.local' })

module.exports = { input: 'src/api', baseURL: `${process.env.NEXT_PUBLIC_SITE_URL}/api` }
