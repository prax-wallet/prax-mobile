import AssetIcon from '@/components/AssetIcon';
import List from '@/components/List';
import ListItem from '@/components/ListItem';
import ListItemIconSuffix from '@/components/ListItemIconSuffix';
import TextInput from '@/components/TextInput';
import { setSearchText } from '@/store/defaultPaymentTokenScreen';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setDefaultPaymentToken } from '@/store/secureStore';
import { Trans } from '@lingui/react/macro';
import { Sx, Text, View } from 'dripsy';
import { Check, Search } from 'lucide-react-native';
import useFilteredAssets from './useFilteredAssets';
import TextInputIconStartAdornment from '@/components/TextInputIconStartAdornment';

export default function DefaultPaymentTokenScreen() {
  const defaultPaymentToken = useAppSelector(state => state.secureStore.defaultPaymentToken);
  const dispatch = useAppDispatch();
  const searchText = useAppSelector(state => state.defaultPaymentTokenScreen.searchText);
  const filteredAssets = useFilteredAssets();

  return (
    <View sx={sx.root}>
      <Text variant='h4'>
        <Trans>Default payment token</Trans>
      </Text>

      <TextInput
        value={searchText}
        onChangeText={text => dispatch(setSearchText(text))}
        startAdornment={<TextInputIconStartAdornment IconComponent={Search} />}
        placeholder='Search tokens...'
        clearButtonMode='always'
      />

      <List>
        {filteredAssets.map(asset => (
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
