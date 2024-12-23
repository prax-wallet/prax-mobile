import { Sx, Text, View } from 'dripsy';

export interface HomeScreenProps {}

export default function HomeScreen() {
  return (
    <View sx={sx.root}>
      <View sx={sx.balanceWrapper}>
        <Text sx={sx.balanceLabel}>Balance</Text>
        <Text sx={sx.balance}>0.00 USDC</Text>
      </View>

      <View sx={sx.buttons}></View>
    </View>
  );
}

const sx = {
  balance: {
    variant: 'text.h4',
  },

  balanceLabel: {
    variant: 'text.small',

    color: 'neutralLight',
  },

  balanceWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  buttons: {
    flexDirection: 'row',
  },

  root: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
} satisfies Record<string, Sx>;
