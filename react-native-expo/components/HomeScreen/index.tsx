import { Sx, Text, View } from 'dripsy';
import Button from '../Button';

export interface HomeScreenProps {}

export default function HomeScreen() {
  return (
    <View sx={sx.root}>
      <View sx={sx.balanceWrapper}>
        <Text sx={sx.balanceLabel}>Balance</Text>
        <Text sx={sx.balance}>0.00 USDC</Text>
      </View>

      <View sx={sx.buttons}>
        <Button actionType='accent'>Deposit</Button>
        <Button>Request</Button>
      </View>
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
    justifyContent: 'center',
    flexGrow: 1,
  },

  buttons: {
    flexDirection: 'row',
    flexGrow: 0,
    gap: '$2',
    px: '$4',
    pb: '$4',
  },

  root: {
    flexGrow: 1,
    flexDirection: 'column',
  },
} satisfies Record<string, Sx>;
