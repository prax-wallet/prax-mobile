import { Sx, View } from 'dripsy';
import BalanceAndActions from '../BalanceAndActions';
import BalanceList from './BalanceList';
import { useAppSelector } from '@/store/hooks';

export default function PortfolioScreen() {
  const balances = useAppSelector(state => state.balances.balances);

  return (
    <View sx={sx.root}>
      {/** @todo: Make this a `ScrollView`. */}
      <BalanceAndActions />

      <BalanceList balances={balances} />
    </View>
  );
}

const sx = {
  root: {
    flexGrow: 1,
    px: 'screenHorizontalMargin',
  },
} satisfies Record<string, Sx>;
