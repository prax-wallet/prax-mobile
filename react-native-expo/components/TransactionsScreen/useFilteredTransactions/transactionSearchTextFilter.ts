import Transaction from '@/types/Transaction';

export default function transactionSearchTextFilter(searchText: string) {
  return (transaction: Transaction): boolean => {
    const searchTextLowerCase = searchText.toLocaleLowerCase();
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
