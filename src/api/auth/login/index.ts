/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  post: {
    status: 204

    resHeaders: {
      /** account-book_sessionを設定 */
      'Set-Cookies': string
    }

    reqBody: Types.User
  }
}
