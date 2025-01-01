import Balance from '@/types/Balance';
import * as Factory from 'factory.ts';

const randomDecimalWith6DecimalPlaces = () => Math.round(Math.random() * 10 ** 9) / 10 ** 3;

const CURRENCIES = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
  },
  {
    name: 'Penumbra',
    symbol: 'UM',
  },
  {
    name: 'Osmosis',
    symbol: 'OSMO',
  },
  {
    name: 'ATOM',
    symbol: 'Cosmos',
  },
  {
    name: 'USDC',
    symbol: 'USD Coin',
  },
];

const balanceFactory = Factory.makeFactory<Balance>({
  amount: Factory.each(randomDecimalWith6DecimalPlaces),
  equivalentValue: Factory.each(randomDecimalWith6DecimalPlaces),
  symbol: Factory.each(i => CURRENCIES[i % CURRENCIES.length].symbol),
  name: Factory.each(i => CURRENCIES[i % CURRENCIES.length].name),
});

export default balanceFactory;
