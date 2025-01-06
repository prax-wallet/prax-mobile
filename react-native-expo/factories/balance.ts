import Balance from '@/types/Balance';
import * as Factory from 'factory.ts';
import ASSETS from './mockData/assets';

const randomDecimalWith6DecimalPlaces = () => Math.round(Math.random() * 10 ** 9) / 10 ** 3;

const balanceFactory = Factory.makeFactory<Balance>({
  amount: Factory.each(randomDecimalWith6DecimalPlaces),
  equivalentValue: Factory.each(randomDecimalWith6DecimalPlaces),
  assetSymbol: Factory.each(i => ASSETS[i % ASSETS.length].symbol),
  assetName: Factory.each(i => ASSETS[i % ASSETS.length].name),
});

export default balanceFactory;
