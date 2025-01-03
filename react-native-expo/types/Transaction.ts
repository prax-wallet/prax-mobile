interface TransactionBase {
  /** bech32m-encoded Transaction ID */
  id: string;
  type: string;
  memo?: string;
  /** @todo: add more options as they become available */
  via?: 'link';
}

interface ReceiveTransaction extends TransactionBase {
  type: 'receive';
  senderAddress: string;
  senderUsername?: string;
}

interface SendTransaction extends TransactionBase {
  type: 'send';
  recipientAddress: string;
  recipientUsername?: string;
}

type Transaction = ReceiveTransaction | SendTransaction;

export default Transaction;
