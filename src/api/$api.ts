/* eslint-disable */
// prettier-ignore
import { AspidaClient, BasicHeaders, dataToURLString } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from './auth/login'
// prettier-ignore
import { Methods as Methods1 } from './auth/logout'
// prettier-ignore
import { Methods as Methods2 } from './category'
// prettier-ignore
import { Methods as Methods3 } from './category/_id@string'
// prettier-ignore
import { Methods as Methods4 } from './record'
// prettier-ignore
import { Methods as Methods5 } from './record/_id@string'
// prettier-ignore
import { Methods as Methods6 } from './user/create'
// prettier-ignore
import { Methods as Methods7 } from './user/me'
// prettier-ignore
import { Methods as Methods8 } from './user/unique'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:8080/' : baseURL).replace(/\/$/, '')
  const PATH0 = '/auth/login'
  const PATH1 = '/auth/logout'
  const PATH2 = '/category'
  const PATH3 = '/record'
  const PATH4 = '/user/create'
  const PATH5 = '/user/me'
  const PATH6 = '/user/unique'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    auth: {
      login: {
        post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
          fetch<void, Methods0['post']['resHeaders'], Methods0['post']['status']>(prefix, PATH0, POST, option).send(),
        $post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
          fetch<void, Methods0['post']['resHeaders'], Methods0['post']['status']>(prefix, PATH0, POST, option).send().then(r => r.body),
        $path: () => `${prefix}${PATH0}`
      },
      logout: {
        get: (option?: { config?: T }) =>
          fetch<void, Methods1['get']['resHeaders'], Methods1['get']['status']>(prefix, PATH1, GET, option).send(),
        $get: (option?: { config?: T }) =>
          fetch<void, Methods1['get']['resHeaders'], Methods1['get']['status']>(prefix, PATH1, GET, option).send().then(r => r.body),
        $path: () => `${prefix}${PATH1}`
      }
    },
    category: {
      _id: (val1: string) => {
        const prefix1 = `${PATH2}/${val1}`

        return {
          /**
           * @returns 成功
           */
          put: (option: { body: Methods3['put']['reqBody'], config?: T }) =>
            fetch<Methods3['put']['resBody'], BasicHeaders, Methods3['put']['status']>(prefix, prefix1, PUT, option).json(),
          /**
           * @returns 成功
           */
          $put: (option: { body: Methods3['put']['reqBody'], config?: T }) =>
            fetch<Methods3['put']['resBody'], BasicHeaders, Methods3['put']['status']>(prefix, prefix1, PUT, option).json().then(r => r.body),
          delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods3['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          $delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods3['delete']['status']>(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      /**
       * @returns 成功
       */
      get: (option?: { config?: T }) =>
        fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, PATH2, GET, option).json(),
      /**
       * @returns 成功
       */
      $get: (option?: { config?: T }) =>
        fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, PATH2, GET, option).json().then(r => r.body),
      /**
       * @returns 成功
       */
      post: (option: { body: Methods2['post']['reqBody'], config?: T }) =>
        fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, PATH2, POST, option).json(),
      /**
       * @returns 成功
       */
      $post: (option: { body: Methods2['post']['reqBody'], config?: T }) =>
        fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, PATH2, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH2}`
    },
    record: {
      _id: (val1: string) => {
        const prefix1 = `${PATH3}/${val1}`

        return {
          /**
           * @returns 成功
           */
          put: (option: { body: Methods5['put']['reqBody'], config?: T }) =>
            fetch<Methods5['put']['resBody'], BasicHeaders, Methods5['put']['status']>(prefix, prefix1, PUT, option).json(),
          /**
           * @returns 成功
           */
          $put: (option: { body: Methods5['put']['reqBody'], config?: T }) =>
            fetch<Methods5['put']['resBody'], BasicHeaders, Methods5['put']['status']>(prefix, prefix1, PUT, option).json().then(r => r.body),
          delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods5['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          $delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods5['delete']['status']>(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      /**
       * @returns 成功
       */
      get: (option?: { config?: T }) =>
        fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, PATH3, GET, option).json(),
      /**
       * @returns 成功
       */
      $get: (option?: { config?: T }) =>
        fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, PATH3, GET, option).json().then(r => r.body),
      /**
       * @returns 成功
       */
      post: (option: { body: Methods4['post']['reqBody'], config?: T }) =>
        fetch<Methods4['post']['resBody'], BasicHeaders, Methods4['post']['status']>(prefix, PATH3, POST, option).json(),
      /**
       * @returns 成功
       */
      $post: (option: { body: Methods4['post']['reqBody'], config?: T }) =>
        fetch<Methods4['post']['resBody'], BasicHeaders, Methods4['post']['status']>(prefix, PATH3, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH3}`
    },
    user: {
      create: {
        post: (option: { body: Methods6['post']['reqBody'], config?: T }) =>
          fetch<void, Methods6['post']['resHeaders'], Methods6['post']['status']>(prefix, PATH4, POST, option).send(),
        $post: (option: { body: Methods6['post']['reqBody'], config?: T }) =>
          fetch<void, Methods6['post']['resHeaders'], Methods6['post']['status']>(prefix, PATH4, POST, option).send().then(r => r.body),
        $path: () => `${prefix}${PATH4}`
      },
      me: {
        /**
         * @returns 成功
         */
        get: (option?: { config?: T }) =>
          fetch<Methods7['get']['resBody'], BasicHeaders, Methods7['get']['status']>(prefix, PATH5, GET, option).json(),
        /**
         * @returns 成功
         */
        $get: (option?: { config?: T }) =>
          fetch<Methods7['get']['resBody'], BasicHeaders, Methods7['get']['status']>(prefix, PATH5, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH5}`
      },
      unique: {
        /**
         * @returns 成功
         */
        get: (option: { query: Methods8['get']['query'], config?: T }) =>
          fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, PATH6, GET, option).json(),
        /**
         * @returns 成功
         */
        $get: (option: { query: Methods8['get']['query'], config?: T }) =>
          fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, PATH6, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get'; query: Methods8['get']['query'] }) =>
          `${prefix}${PATH6}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      }
    }
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
