import AssetIcon from '@/components/AssetIcon';
import ListItem from '@/components/ListItem';
import { useAppDispatch } from '@/store/hooks';
import { setSelectedAssetSymbol } from '@/store/portfolioScreen';
import { getBalanceView } from '@penumbra-zone/getters/balances-response';
import { getSymbolFromValueView, getDisplayDenomFromView } from '@penumbra-zone/getters/value-view';
import { getFormattedAmtFromValueView } from '@penumbra-zone/types/value-view';
import { BalancesResponse } from '@penumbra-zone/protobuf/penumbra/view/v1/view_pb';
import { Sx, Text, View } from 'dripsy';

export interface BalanceProps {
  balancesResponse: BalancesResponse;
}

export default function Balance({ balancesResponse }: BalanceProps) {
  const dispatch = useAppDispatch();
  const balanceView = getBalanceView(balancesResponse);
  const symbol = getSymbolFromValueView(balanceView);
  const displayDenom = getDisplayDenomFromView(balanceView);
  const formattedAmount = getFormattedAmtFromValueView(balanceView);

  return (
    <ListItem
      avatar={<AssetIcon />}
      primaryText={symbol}
      secondaryText={displayDenom}
      suffix={
        <View sx={sx.suffix}>
          <Text variant='small'>{formattedAmount}</Text>
          {/* <Text sx={sx.equivalentValue}>{balancesResponse.equivalentValue} USDC</Text> */}
        </View>
      }
      onPress={() => dispatch(setSelectedAssetSymbol(symbol))}
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
