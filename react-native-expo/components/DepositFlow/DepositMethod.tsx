import { Text } from 'dripsy';
import ListItems from '../ListItems';
import ListItem from '../ListItem';
import AssetIcon from '../AssetIcon';
import Icon from '../Icon';
import { ChevronRight } from 'lucide-react-native';
import { setStep } from '@/store/depositFlow';
import { useAppDispatch } from '@/store/hooks';

export default function DepositMethod() {
  const dispatch = useAppDispatch();

  return (
    <>
      <Text variant='large'>Select deposit method</Text>

      <ListItems>
        <ListItem
          avatar={<AssetIcon />}
          primaryText='Shielded IBC deposit'
          suffix={<Icon IconComponent={ChevronRight} size='md' color='neutralLight' />}
          onPress={() => dispatch(setStep('address'))}
        />

        <ListItem
          avatar={<AssetIcon />}
          primaryText='Noble USDC deposit'
          secondaryText='Coming soon'
        />
      </ListItems>
    </>
  );
}
