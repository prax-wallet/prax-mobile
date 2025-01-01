import { useAppSelector } from '@/store/hooks';
import { useMemo } from 'react';

export default function useTransactionsForAsset(assetSymbol?: string) {
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
