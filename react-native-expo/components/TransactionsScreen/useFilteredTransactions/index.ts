import { useAppSelector } from '@/store/hooks';
import { useMemo } from 'react';
import transactionSearchTextFilter from './transactionSearchTextFilter';

/**
 * Returns the transactions from state, filtered by the search text from state.
 *
 * The filtered results are memoized for performance reasons. In the future, if
 * typing search text becomes slow, consider adding throttling updates to
 * `filteredTransactions`.
 */
export default function useFilteredTransactions() {
  const transactions = useAppSelector(state => state.transactions.transactions);
  const searchText = useAppSelector(state => state.transactions.searchText);

  const filteredTransactions = useMemo(
    () => transactions.filter(transactionSearchTextFilter(searchText)),
    [transactions, searchText],
  );

  return filteredTransactions;
}
