import Button from '../Button';
import { setStep } from '@/store/depositFlow';
import { Sx, Text, View } from 'dripsy';
import { useAppDispatch } from '@/store/hooks';

export default function Help() {
  const dispatch = useAppDispatch();

  return (
    <View sx={sx.root}>
      <Text variant='large'>Shielded IBC deposit</Text>

      <Text>
        A Shielded IBC Deposit allows you to transfer assets (e.g., ATOM, OSMO) from Cosmos-based
        networks into Penumbra's shielded pool. Once deposited, your assets become private and
        anonymous, ensuring maximum confidentiality when used within Penumbra.
      </Text>

      <Button actionType='accent' onPress={() => dispatch(setStep('address'))}>
        OK
      </Button>
    </View>
  );
}

const sx = {
  root: {
    flexDirection: 'column',
    gap: '$4',
  },
} satisfies Record<string, Sx>;
