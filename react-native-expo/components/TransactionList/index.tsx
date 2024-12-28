import { useLingui } from '@lingui/react/macro';
import List from '../List';
import ITransaction from '@/types/Transaction';
import Transaction from './Transaction';

export interface TransactionListProps {
  transactions: ITransaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  const { t } = useLingui();

  return (
    <List title={t`Transactions`}>
      {transactions.map(transaction => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
    </List>
  );
}
