import { useAppSelector } from '@/store/hooks';
import ASSETS from './assets';
import { useMemo } from 'react';

export default function useFilteredAssets() {
  const searchText = useAppSelector(state => state.defaultPaymentTokenScreen.searchText);

  const filteredTokens = useMemo(
    () =>
      ASSETS.filter(asset => {
        const searchTextLowerCase = searchText.toLocaleLowerCase();

        if (asset.name.toLocaleLowerCase().includes(searchTextLowerCase)) return true;
        if (asset.symbol.toLocaleLowerCase().includes(searchTextLowerCase)) return true;

        return false;
      }),
    [searchText],
  );

  return filteredTokens;
}
