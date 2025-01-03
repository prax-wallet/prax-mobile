interface TransactionBase {
  /** bech32m-encoded Transaction ID */
  id: string;
  type: string;
  memo?: string;
  /** @todo: add more options as they become available */
  via?: 'link';
  /** The symbol of the asset in this transaction. */
  assetSymbol: string;
  /** The name of the asset in this transaction. */
  assetName: string;
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
