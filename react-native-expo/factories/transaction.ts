import Transaction from '@/types/Transaction';
import * as Factory from 'factory.ts';

const transactionFactory = Factory.makeFactory<Transaction>({
  id: Factory.each(i => `id-${i}`),
  type: 'receive',
  memo: Factory.each(i => `Memo for transaction ${i}`),
  via: 'link',
});

export default transactionFactory;
