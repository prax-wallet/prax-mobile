import { Text } from 'dripsy';
import ListItems from '../ListItems';
import ListItem from '../ListItem';
import AssetIcon from '../AssetIcon';
import { DepositFlowStep, setStep } from '@/store/depositFlow';
import { useAppDispatch } from '@/store/hooks';
import { Trans, useLingui } from '@lingui/react/macro';
import ListItemChevronRightSuffix from '../ListItemChevronRightSuffix';

export default function DepositMethod() {
  const dispatch = useAppDispatch();
  const { t } = useLingui();

  return (
    <>
      <Text variant='large'>
        <Trans>Select deposit method</Trans>
      </Text>

      <ListItems>
        <ListItem
          avatar={<AssetIcon />}
          primaryText={t`Shielded IBC deposit`}
          suffix={<ListItemChevronRightSuffix />}
          onPress={() => dispatch(setStep(DepositFlowStep.Address))}
        />

        <ListItem
          avatar={<AssetIcon />}
          primaryText={t`Noble USDC deposit`}
          secondaryText={t`Coming soon`}
        />
      </ListItems>
    </>
  );
}
