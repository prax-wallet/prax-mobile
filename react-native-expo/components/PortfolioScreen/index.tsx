import { ScrollView, Sx } from 'dripsy';
import BalanceAndActions from '../BalanceAndActions';
import BalanceList from './BalanceList';
import { useAppSelector } from '@/store/hooks';
import { createSelector } from 'reselect';
import { RootState } from '@/store';
import { BalancesResponse } from '@penumbra-zone/protobuf/penumbra/view/v1/view_pb';

const balancesResponsesSelector = createSelector(
  [(state: RootState) => state.balances.balancesResponses],
  balancesResponses =>
    balancesResponses.map(balancesResponse => new BalancesResponse(balancesResponse)),
);

export default function PortfolioScreen() {
  const balancesResponses = useAppSelector(balancesResponsesSelector);

  return (
    <ScrollView contentContainerSx={sx.root}>
      <BalanceAndActions />

      <BalanceList balancesResponses={balancesResponses} />
    </ScrollView>
  );
}

const sx = {
  root: {
    flexGrow: 1,
    px: 'screenHorizontalMargin',
  },
} satisfies Record<string, Sx>;
