import { Sx, View } from 'dripsy';
import HomeScreenTransactionsList from './HomeScreenTransactionsList';
import BalanceAndActions from '../BalanceAndActions';

export default function HomeScreen() {
  return (
    <View sx={sx.root}>
      {/** @todo: Make this a `ScrollView`. */}
      <BalanceAndActions />

      <HomeScreenTransactionsList />
    </View>
  );
}

const sx = {
  root: {
    flexGrow: 1,
    px: 'screenHorizontalMargin',
  },
} satisfies Record<string, Sx>;
