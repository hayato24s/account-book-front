/* eslint-disable */
export type User = {
  id: string
  password: string
}

export type Category = {
  id: string
  userId: string
  type: RecordType
  name: string
  color: string
}

export type RecordType = 'Expense' | 'Income'

export type Record = {
  id: string
  userId: string
  type: RecordType
  amount: number
  category: Category
  memo: string
  date: string
}

export type Error = {
  message: string
}
