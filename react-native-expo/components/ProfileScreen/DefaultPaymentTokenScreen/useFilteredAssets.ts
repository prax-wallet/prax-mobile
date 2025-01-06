import { useAppSelector } from '@/store/hooks';
import ASSETS from './assets';
import { useMemo } from 'react';

/**
 * Returns asset types filtered by the search text from state.
 *
 * The filtered results are memoized for performance reasons. In the future, if
 * typing search text becomes slow, consider adding throttling updates to
 * `filteredAssets`.
 */
export default function useFilteredAssets() {
  const searchText = useAppSelector(state => state.defaultPaymentTokenScreen.searchText);

  const filteredAssets = useMemo(
    () =>
      ASSETS.filter(asset => {
        const searchTextLowerCase = searchText.toLocaleLowerCase();

        if (asset.name.toLocaleLowerCase().includes(searchTextLowerCase)) return true;
        if (asset.symbol.toLocaleLowerCase().includes(searchTextLowerCase)) return true;

        return false;
      }),
    [searchText],
  );

  return filteredAssets;
}
