import { useAppSelector } from '@/store/hooks';
import TransactionList from '../TransactionList';
import { shallowEqual } from 'react-redux';
import { Sx, Text } from 'dripsy';
import { Trans } from '@lingui/react/macro';
import { Link } from 'expo-router';

function SeeAllButton() {
  return (
    <Link href='/transactions'>
      <Text sx={sx.seeAllButtonLabel}>
        <Trans>See all</Trans>
      </Text>
    </Link>
  );
}

/**
 * A preview of the latest few transactions a user has, with a button to view
 * them all.
 */
export default function HomeScreenTransactionsList() {
  const first5Transactions = useAppSelector(
    state => state.transactions.transactions.slice(0, 5),
    shallowEqual,
  );

  return (
    <TransactionList transactions={first5Transactions} primaryAction={<SeeAllButton />} showTitle />
  );
}

const sx = {
  seeAllButtonLabel: {
    textDecorationLine: 'underline',
  },
} satisfies Record<string, Sx>;
