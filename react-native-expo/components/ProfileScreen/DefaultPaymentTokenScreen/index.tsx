import AssetIcon from '@/components/AssetIcon';
import List from '@/components/List';
import ListItem from '@/components/ListItem';
import ListItemIconSuffix from '@/components/ListItemIconSuffix';
import TextInput from '@/components/TextInput';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setDefaultPaymentToken } from '@/store/secureStore';
import Asset from '@/types/Asset';
import { Trans } from '@lingui/react/macro';
import { Sx, Text, View } from 'dripsy';
import { Check } from 'lucide-react-native';

const ASSETS: Asset[] = [
  { name: 'USD Coin', symbol: 'USDC' },
  { name: 'Penumbra', symbol: 'UM' },
  { name: 'Cosmo', symbol: 'ATOM' },
  { name: 'Ethereum', symbol: 'ETH' },
  { name: 'Osmosis', symbol: 'OSMO' },
];

export default function DefaultPaymentTokenScreen() {
  const defaultPaymentToken = useAppSelector(state => state.secureStore.defaultPaymentToken);
  const dispatch = useAppDispatch();

  return (
    <View sx={sx.root}>
      <Text variant='h4'>
        <Trans>Default payment token</Trans>
      </Text>

      <TextInput />

      <List>
        {ASSETS.map(asset => (
          <ListItem
            key={asset.symbol}
            avatar={<AssetIcon />}
            primaryText={asset.symbol}
            secondaryText={asset.name}
            onPress={() => dispatch(setDefaultPaymentToken(asset.symbol))}
            suffix={
              asset.symbol === defaultPaymentToken ? (
                <ListItemIconSuffix IconComponent={Check} />
              ) : undefined
            }
          />
        ))}
      </List>
    </View>
  );
}

const sx = {
  root: {
    px: 'screenHorizontalMargin',
    flexDirection: 'column',
    gap: '$4',
  },
} satisfies Record<string, Sx>;
