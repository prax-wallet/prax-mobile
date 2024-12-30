import { useAppSelector } from '@/store/hooks';
import { useMemo } from 'react';
import transactionSearchTextFilter from './useFilteredTransactions/transactionSearchTextFilter';

export default function useFilteredTransactions() {
  const transactions = useAppSelector(state => state.transactions.transactions);
  const searchText = useAppSelector(state => state.transactions.searchText);

  const filteredTransactions = useMemo(
    () => transactions.filter(transactionSearchTextFilter(searchText)),
    [transactions, searchText],
  );

  return filteredTransactions;
}
