export interface TransactionModel {
  _id: string
  user: string,
  cost: number,
  type: string,
  description: string,
  date: string,
}
export class Transaction implements TransactionModel {
  _id: string;
  user: string;
  cost: number;
  type: string;
  description: string;
  date: string;

  constructor(transaction?: TransactionModel) {
    if (transaction) {
      for (let key in transaction) {
        this[key] = transaction[key];
      }
    }
  }

}
