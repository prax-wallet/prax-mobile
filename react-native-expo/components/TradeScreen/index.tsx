import { Image, Sx, Text, View } from 'dripsy';
import candlesticks from './candlesticks.png';
import Button from '../Button';
import { Trans } from '@lingui/react/macro';

export default function TradeScreen() {
  return (
    <View sx={sx.root}>
      <View sx={sx.imageWrapper}>
        <Image sx={sx.image} source={candlesticks} />
      </View>

      <View sx={sx.text}>
        <Text sx={sx.headline}>
          <Trans>Coming soon</Trans>
        </Text>

        <Text sx={sx.message}>
          <Trans>
            Turn on push notifications so you don't miss out when trading becomes available!
          </Trans>
        </Text>

        <Button actionType='accent'>
          <Trans>Allow notifications</Trans>
        </Button>
      </View>
    </View>
  );
}

const sx = {
  headline: {
    variant: 'text.h4',

    textAlign: 'center',
  },

  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },

  imageWrapper: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  message: {
    textAlign: 'center',
  },

  root: {
    flexGrow: 1,
  },

  text: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '$6',
    p: '$4',
    pb: '$6',
  },
} satisfies Record<string, Sx>;
