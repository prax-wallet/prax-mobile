import { useAppDispatch, useAppSelector } from '@/store/hooks';
import TransactionList from '../TransactionList';
import { ScrollView, Sx } from 'dripsy';
import TextInput from '../TextInput';
import { setSearchText } from '@/store/transactions';
import useFilteredTransactions from './useFilteredTransactions';

export default function TransactionsScreen() {
  const searchText = useAppSelector(state => state.transactions.searchText);
  const dispatch = useAppDispatch();
  const filteredTransactions = useFilteredTransactions();

  return (
    <ScrollView sx={sx.root} contentContainerSx={sx.contentContainer}>
      <TextInput value={searchText} onChangeText={text => dispatch(setSearchText(text))} />
      <TransactionList transactions={filteredTransactions} />
    </ScrollView>
  );
}

const sx = {
  root: {
    px: 'screenHorizontalMargin',
  },

  contentContainer: {
    flexDirection: 'column',
    gap: '$2',
  },
} satisfies Record<string, Sx>;
