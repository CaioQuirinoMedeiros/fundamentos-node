import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.transactions.reduce(
      (acc, transaction) => {
        const { value, type } = transaction;

        if (type === 'income') {
          return {
            ...acc,
            income: acc.income + value,
            total: acc.total + value,
          };
        } else {
          return {
            ...acc,
            outcome: acc.outcome + value,
            total: acc.total - value,
          };
        }
      },
      { income: 0, outcome: 0, total: 0 },
    );
    // TODO
  }

  public create(data: CreateTransactionDTO): Transaction {
    const { title, type, value } = data;

    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
