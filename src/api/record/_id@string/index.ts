/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  put: {
    status: 200
    /** 成功 */
    resBody: Types.Record

    reqBody: {
      type: 'Expense' | 'Income'
      amount: number
      category: Types.Category
      memo: string
      date: string
    }
  }

  delete: {
    status: 204
  }
}
