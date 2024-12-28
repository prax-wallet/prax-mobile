import { useAppSelector } from '@/store/hooks';
import TransactionList from '../TransactionList';
import { shallowEqual } from 'react-redux';

/**
 * A preview of the latest few transactions a user has, with a button to view
 * them all.
 */
export default function HomeScreenTransactionsList() {
  const first5Transactions = useAppSelector(
    state => state.transactions.transactions.slice(0, 5),
    shallowEqual,
  );

  return <TransactionList transactions={first5Transactions} />;
}
