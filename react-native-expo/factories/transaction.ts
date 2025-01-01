import Transaction from '@/types/Transaction';
import * as Factory from 'factory.ts';
import ASSETS from './mockData/assets';

const transactionFactory = Factory.makeFactory<Transaction>({
  id: Factory.each(i => `id-${i}`),
  type: 'receive',
  assetSymbol: Factory.each(i => ASSETS[i % ASSETS.length].symbol),
  assetName: Factory.each(i => ASSETS[i % ASSETS.length].name),
  memo: Factory.each(i => `Memo for transaction ${i}`),
  via: 'link',
});

export default transactionFactory;
