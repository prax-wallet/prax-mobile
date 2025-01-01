import List from '@/components/List';
import IBalance from '@/types/Balance';
import { useLingui } from '@lingui/react/macro';
import Balance from './Balance';

export interface BalanceListProps {
  balances: IBalance[];
}

/** Shows a list of the user's balances in every asset they hold. */
export default function BalanceList({ balances }: BalanceListProps) {
  const { t } = useLingui();

  return (
    <List title={t`Assets`}>
      {balances.map(balance => (
        <Balance key={balance.symbol} balance={balance} />
      ))}
    </List>
  );
}
