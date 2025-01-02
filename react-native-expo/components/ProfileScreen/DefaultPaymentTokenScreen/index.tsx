import AssetIcon from '@/components/AssetIcon';
import List from '@/components/List';
import ListItem from '@/components/ListItem';
import TextInput from '@/components/TextInput';
import Asset from '@/types/Asset';
import { Trans } from '@lingui/react/macro';
import { Sx, Text, View } from 'dripsy';

const ASSETS: Asset[] = [
  { name: 'USD Coin', symbol: 'USDC' },
  { name: 'Penumbra', symbol: 'UM' },
  { name: 'Cosmo', symbol: 'ATOM' },
  { name: 'Ethereum', symbol: 'ETH' },
  { name: 'Osmosis', symbol: 'OSMO' },
];

export default function DefaultPaymentTokenScreen() {
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
