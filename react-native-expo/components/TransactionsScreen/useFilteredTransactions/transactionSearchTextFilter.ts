import Transaction from '@/types/Transaction';

/**
 * Returns a function that can be passed to `transactions.filter()` to filter by
 * address/username/memo (case-insensitive).
 */
export default function transactionSearchTextFilter(searchText: string) {
  const searchTextLowerCase = searchText.toLocaleLowerCase();

  return (transaction: Transaction): boolean => {
    const memoLowerCase = transaction.memo?.toLocaleLowerCase();

    switch (transaction.type) {
      case 'receive':
        return !!(
          transaction.senderAddress.toLocaleLowerCase().includes(searchTextLowerCase) ||
          transaction.senderUsername?.includes(searchTextLowerCase) ||
          memoLowerCase?.includes(searchTextLowerCase)
        );

      case 'send':
        return !!(
          transaction.recipientAddress.toLocaleLowerCase().includes(searchTextLowerCase) ||
          transaction.recipientUsername?.toLocaleLowerCase().includes(searchTextLowerCase) ||
          memoLowerCase?.includes(searchTextLowerCase)
        );

      default:
        return false;
    }
  };
}
