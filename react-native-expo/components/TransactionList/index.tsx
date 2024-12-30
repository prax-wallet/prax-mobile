import { useLingui } from '@lingui/react/macro';
import List from '../List';
import ITransaction from '@/types/Transaction';
import Transaction from './Transaction';
import { ReactNode } from 'react';

export interface TransactionListProps {
  transactions: ITransaction[];
  /** Will be passed on as the `<List />`'s `primaryAction` prop. */
  primaryAction?: ReactNode;
  showTitle?: boolean;
}

export default function TransactionList({
  transactions,
  primaryAction,
  showTitle,
}: TransactionListProps) {
  const { t } = useLingui();

  return (
    <List title={showTitle ? t`Transactions` : undefined} primaryAction={primaryAction}>
      {transactions.map(transaction => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
    </List>
  );
}
