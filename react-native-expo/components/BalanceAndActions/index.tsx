import { Trans } from '@lingui/react/macro';
import { Sx, Text, View } from 'dripsy';
import Button from '../Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { close, open } from '@/store/depositFlow';
import DepositFlow from '../DepositFlow';

/**
 * Renders the user's current balance, as well as buttons for actions related to
 * their balance (such as Send/Deposit/Request).
 */
export default function BalanceAndActions() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(state => state.depositFlow.isOpen);

  return (
    <>
      <View sx={sx.root}>
        <View sx={sx.balanceWrapper}>
          <Text sx={sx.balanceLabel}>
            <Trans>Balance</Trans>
          </Text>
          <Text sx={sx.balance}>0.00 USDC</Text>
        </View>

        <View sx={sx.buttons}>
          <Button actionType='accent' onPress={() => dispatch(open())}>
            <Trans>Deposit</Trans>
          </Button>
          <Button>
            <Trans>Request</Trans>
          </Button>
        </View>
      </View>

      <DepositFlow isOpen={isOpen} onClose={() => dispatch(close())} />
    </>
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
