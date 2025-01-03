import ActionSheet from '@/components/ActionSheet';
import AssetIcon from '@/components/AssetIcon';
import TransactionList from '@/components/TransactionList';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedAssetSymbol } from '@/store/portfolioScreen';
import { Sx, Text, View } from 'dripsy';
import useTransactionsForAsset from './useTransactionsForAsset';

/**
 * An action sheet for a given asset, with a list of relevant transactions and
 * buttons for actions related to the asset (such as sending).
 */
export default function AssetActionSheet() {
  const selectedAssetSymbol = useAppSelector(state => state.portfolioScreen.selectedAssetSymbol);
  const balance = useAppSelector(state =>
    state.balances.balances.find(balance => balance.assetSymbol === selectedAssetSymbol),
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

        <Text sx={sx.balance}>
          {balance?.amount} {balance?.assetSymbol}
        </Text>

        <Text sx={sx.equivalentValue}>{balance?.equivalentValue} USDC</Text>
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
