/* eslint-disable */
import type * as Types from '../@types'

export type Methods = {
  get: {
    status: 200
    /** 成功 */
    resBody: Types.Category[]
  }

  post: {
    status: 200
    /** 成功 */
    resBody: Types.Category

    reqBody: {
      type: Types.RecordType
      name: string
      color: string
    }
  }
}
