/* eslint-disable */
// prettier-ignore
import { AspidaClient, dataToURLString } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from './answer'
// prettier-ignore
import { Methods as Methods1 } from './invitation'
// prettier-ignore
import { Methods as Methods2 } from './invitation/check'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'undefined/api' : baseURL).replace(/\/$/, '')
  const PATH0 = '/answer'
  const PATH1 = '/invitation'
  const PATH2 = '/invitation/check'
  const GET = 'GET'
  const POST = 'POST'

  return {
    answer: {
      get: (option: { query: Methods0['get']['query'], headers?: Methods0['get']['reqHeaders'], config?: T }) =>
        fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option).json(),
      $get: (option: { query: Methods0['get']['query'], headers?: Methods0['get']['reqHeaders'], config?: T }) =>
        fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option).json().then(r => r.body),
      post: (option: { body: Methods0['post']['reqBody'], headers?: Methods0['post']['reqHeaders'], config?: T }) =>
        fetch<Methods0['post']['resBody']>(prefix, PATH0, POST, option).json(),
      $post: (option: { body: Methods0['post']['reqBody'], headers?: Methods0['post']['reqHeaders'], config?: T }) =>
        fetch<Methods0['post']['resBody']>(prefix, PATH0, POST, option).json().then(r => r.body),
      $path: (option?: { method?: 'get'; query: Methods0['get']['query'] }) =>
        `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    invitation: {
      check: {
        get: (option: { query: Methods2['get']['query'], headers?: Methods2['get']['reqHeaders'], config?: T }) =>
          fetch<Methods2['get']['resBody']>(prefix, PATH2, GET, option).text(),
        $get: (option: { query: Methods2['get']['query'], headers?: Methods2['get']['reqHeaders'], config?: T }) =>
          fetch<Methods2['get']['resBody']>(prefix, PATH2, GET, option).text().then(r => r.body),
        $path: (option?: { method?: 'get'; query: Methods2['get']['query'] }) =>
          `${prefix}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      },
      get: (option: { query: Methods1['get']['query'], headers?: Methods1['get']['reqHeaders'], config?: T }) =>
        fetch<Methods1['get']['resBody']>(prefix, PATH1, GET, option).json(),
      $get: (option: { query: Methods1['get']['query'], headers?: Methods1['get']['reqHeaders'], config?: T }) =>
        fetch<Methods1['get']['resBody']>(prefix, PATH1, GET, option).json().then(r => r.body),
      post: (option: { body: Methods1['post']['reqBody'], headers?: Methods1['post']['reqHeaders'], config?: T }) =>
        fetch<Methods1['post']['resBody']>(prefix, PATH1, POST, option).json(),
      $post: (option: { body: Methods1['post']['reqBody'], headers?: Methods1['post']['reqHeaders'], config?: T }) =>
        fetch<Methods1['post']['resBody']>(prefix, PATH1, POST, option).json().then(r => r.body),
      $path: (option?: { method?: 'get'; query: Methods1['get']['query'] }) =>
        `${prefix}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    }
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
