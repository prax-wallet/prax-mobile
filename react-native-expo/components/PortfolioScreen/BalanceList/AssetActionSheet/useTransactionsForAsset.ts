import { useAppSelector } from '@/store/hooks';
import { useMemo } from 'react';

/** Returns a memoized array of the transactions for a given asset. */
export default function useTransactionsForAsset(
  /** The symbol of the asset that transactions should be filtered by. */
  assetSymbol?: string,
) {
  const transactions = useAppSelector(state => state.transactions.transactions);

  const transactionsForAsset = useMemo(
    () =>
      assetSymbol
        ? transactions.filter(transaction => transaction.assetSymbol === assetSymbol)
        : [],
    [transactions, assetSymbol],
  );

  return transactionsForAsset;
}
