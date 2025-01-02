import penumbraAddressFactory from '@/factories/penumbraAddress';
import Avatar from '../Avatar';
import { Sx, Text, View } from 'dripsy';
import Button from '../Button';
import { Trans, useLingui } from '@lingui/react/macro';
import List from '../List';
import ListItem from '../ListItem';
import AssetIcon from '../AssetIcon';
import ListItemChevronRightSuffix from '../ListItemChevronRightSuffix';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { t } = useLingui();
  const router = useRouter();

  return (
    <View sx={sx.root}>
      <View sx={sx.header}>
        <Avatar size='lg' />

        <Text sx={sx.address} ellipsizeMode='middle' numberOfLines={1}>
          {penumbraAddressFactory.build().value}
        </Text>

        <View sx={sx.buttons}>
          <View sx={sx.button}>
            <Button actionType='accent'>
              <Trans>Get username</Trans>
            </Button>
          </View>
          <View sx={sx.button}>
            <Button>
              <Trans>Address</Trans>
            </Button>
          </View>
        </View>
      </View>

      <List>
        <ListItem
          avatar={<AssetIcon />}
          primaryText={t`Default payment token`}
          secondaryText='USDC'
          suffix={<ListItemChevronRightSuffix />}
          onPress={() => router.navigate('/profile/defaultPaymentToken')}
        />

        <ListItem
          avatar={<AssetIcon />}
          primaryText={t`RPC`}
          secondaryText='https://snoqualmie.plinfra.net/'
          suffix={<ListItemChevronRightSuffix />}
        />
      </List>

      <List>
        <ListItem
          avatar={<AssetIcon />}
          primaryText={t`Seed phrase`}
          suffix={<ListItemChevronRightSuffix />}
        />
        <ListItem
          avatar={<AssetIcon />}
          primaryText={t`Advanced settings`}
          suffix={<ListItemChevronRightSuffix />}
        />
      </List>
    </View>
  );
}

const sx = {
  address: {
    variant: 'text.small',

    color: 'neutralLight',
    maxWidth: '50%',
  },

  button: {
    flex: 1,
  },

  buttons: {
    flexDirection: 'row',
    gap: '$2',
  },

  header: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '$4',
    pb: '$4',
  },

  root: {
    flexDirection: 'column',
    gap: '$4',
    px: 'screenHorizontalMargin',
  },
} satisfies Record<string, Sx>;
