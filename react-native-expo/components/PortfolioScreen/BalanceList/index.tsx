import List from '@/components/List';
import { useLingui } from '@lingui/react/macro';
import Balance from './Balance';
import AssetActionSheet from './AssetActionSheet';
import { BalancesResponse } from '@penumbra-zone/protobuf/penumbra/view/v1/view_pb';
import { getSymbolFromValueView } from '@penumbra-zone/getters/value-view';

export interface BalanceListProps {
  balancesResponses: BalancesResponse[];
}

/** Shows a list of the user's balances in every asset they hold. */
export default function BalanceList({ balancesResponses }: BalanceListProps) {
  const { t } = useLingui();

  return (
    <>
      <List title={t`Assets`}>
        {balancesResponses.map(balancesResponse => (
          <Balance
            key={getSymbolFromValueView(balancesResponse.balanceView)}
            balancesResponse={balancesResponse}
          />
        ))}
      </List>

      <AssetActionSheet />
    </>
  );
}
