import AssetIcon from '@/components/AssetIcon';
import ListItem from '@/components/ListItem';
import { useAppDispatch } from '@/store/hooks';
import { setSelectedAssetSymbol } from '@/store/portfolioScreen';
import IBalance from '@/types/Balance';
import { Sx, Text, View } from 'dripsy';

export interface BalanceProps {
  balance: IBalance;
}

export default function Balance({ balance }: BalanceProps) {
  const dispatch = useAppDispatch();

  return (
    <ListItem
      avatar={<AssetIcon />}
      primaryText={balance.assetSymbol}
      secondaryText={balance.assetName}
      suffix={
        <View sx={sx.suffix}>
          <Text variant='small'>{balance.amount}</Text>
          <Text sx={sx.equivalentValue}>{balance.equivalentValue} USDC</Text>
        </View>
      }
      onPress={() => dispatch(setSelectedAssetSymbol(balance.assetSymbol))}
    />
  );
}

const sx = {
  equivalentValue: {
    variant: 'text.detail',
    color: 'neutralLight',
  },

  suffix: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
} satisfies Record<string, Sx>;
