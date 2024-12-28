import ITransaction from '@/types/Transaction';
import ListItem from '../../ListItem';
import TransactionAvatar from './TransactionAvatar';

export interface TransactionProps {
  transaction: ITransaction;
}

export default function Transaction({ transaction }: TransactionProps) {
  switch (transaction.type) {
    case 'receive':
      return (
        <ListItem
          avatar={<TransactionAvatar direction='incoming' via={transaction.via} />}
          primaryText={
            transaction.senderUsername
              ? `@${transaction.senderUsername}`
              : transaction.senderAddress
          }
          secondaryText={transaction.memo}
        />
      );
    case 'send':
      return (
        <ListItem
          avatar={<TransactionAvatar direction='outgoing' via={transaction.via} />}
          primaryText={
            transaction.recipientUsername
              ? `@${transaction.recipientUsername}`
              : transaction.recipientAddress
          }
          secondaryText={transaction.memo}
        />
      );
    default:
      return null;
  }
}
