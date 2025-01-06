import ActionSheet from '@/components/ActionSheet';
import AssetIcon from '@/components/AssetIcon';
import TransactionList from '@/components/TransactionList';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedAssetSymbol } from '@/store/portfolioScreen';
import { Sx, Text, View } from 'dripsy';
import useTransactionsForAsset from './useTransactionsForAsset';
import { getBalanceView } from '@penumbra-zone/getters/balances-response';
import { getSymbolFromValueView } from '@penumbra-zone/getters/value-view';
import { BalancesResponse } from '@penumbra-zone/protobuf/penumbra/view/v1/view_pb';
import { createSelector } from 'reselect';
import { RootState } from '@/store';
import { getFormattedAmtFromValueView } from '@penumbra-zone/types/value-view';

const balanceSelector = (selectedAssetSymbol?: string) =>
  createSelector(
    [(state: RootState) => state.balances.balancesResponses, () => selectedAssetSymbol],
    balancesResponses =>
      balancesResponses.find(
        balancesResponse =>
          getBalanceView.pipe(getSymbolFromValueView)(new BalancesResponse(balancesResponse)) ===
          selectedAssetSymbol,
      ),
  );

/**
 * An action sheet for a given asset, with a list of relevant transactions and
 * buttons for actions related to the asset (such as sending).
 */
export default function AssetActionSheet() {
  const selectedAssetSymbol = useAppSelector(state => state.portfolioScreen.selectedAssetSymbol);
  const balancesResponse = useAppSelector(balanceSelector(selectedAssetSymbol));
  const balanceView = getBalanceView.optional(
    balancesResponse ? new BalancesResponse(balancesResponse) : undefined,
  );
  const dispatch = useAppDispatch();
  const transactions = useTransactionsForAsset(selectedAssetSymbol);

  return (
    <ActionSheet
      isOpen={!!selectedAssetSymbol}
      onClose={() => dispatch(setSelectedAssetSymbol(undefined))}
    >
      <View sx={sx.header}>
        <View sx={sx.assetIconWrapper}>
          <AssetIcon />
        </View>

        {balanceView && (
          <Text sx={sx.balance}>
            {getFormattedAmtFromValueView(balanceView)}
            {selectedAssetSymbol}
          </Text>
        )}
      </View>

      <TransactionList transactions={transactions} showTitle />
    </ActionSheet>
  );
}

const sx = {
  assetIconWrapper: {
    pb: '$2',
  },

  balance: {
    variant: 'text.h4',

    textAlign: 'center',
  },

  equivalentValue: {
    variant: 'text.small',

    color: 'neutralLight',
    textAlign: 'center',
  },

  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    gap: '$1',
    mb: '$4',
  },
} satisfies Record<string, Sx>;
