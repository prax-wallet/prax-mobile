import { useAppSelector } from '@/store/hooks';
import { PENUMBRA_CHAIN_ID } from '@/utils/constants';
import { ChainRegistryClient } from '@penumbra-labs/registry';
import { useMemo } from 'react';

/**
 * @todo: Use remote client? (To avoid having to update the app just to get the
 * latest metadatas.)
 */
const ALL_METADATAS = new ChainRegistryClient().bundled.get(PENUMBRA_CHAIN_ID).getAllAssets();

/**
 * Returns asset types filtered by the search text from state.
 *
 * The filtered results are memoized for performance reasons. In the future, if
 * typing search text becomes slow, consider adding throttling updates to
 * `filteredAssets`.
 */
export default function useFilteredAssets() {
  const searchText = useAppSelector(state => state.defaultPaymentTokenScreen.searchText);

  const filteredAssets = useMemo(() => {
    if (!searchText.trim().length) return ALL_METADATAS;

    return ALL_METADATAS.filter(metadata => {
      const searchTextLowerCase = searchText.toLocaleLowerCase();

      if (metadata.name.toLocaleLowerCase().includes(searchTextLowerCase)) return true;
      if (metadata.symbol.toLocaleLowerCase().includes(searchTextLowerCase)) return true;

      return false;
    });
  }, [searchText]);

  return filteredAssets;
}
