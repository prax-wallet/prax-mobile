import { BalancesResponse } from '@penumbra-zone/protobuf/penumbra/view/v1/view_pb';
import balancesResponseFactory from '@/factories/balancesResponse';
import { createSlice } from '@reduxjs/toolkit';
import { PlainMessage } from '@bufbuild/protobuf';
import { ChainRegistryClient } from '@penumbra-labs/registry';
import { PENUMBRA_CHAIN_ID } from '@/utils/constants';

const METADATAS = new ChainRegistryClient().bundled.get(PENUMBRA_CHAIN_ID).getAllAssets();

export interface BalancesState {
  balancesResponses: PlainMessage<BalancesResponse>[];
}

const initialState: BalancesState = {
  /** @todo: Populate with real data */
  balancesResponses: balancesResponseFactory.buildList(METADATAS.length),
};

export const balancesSlice = createSlice({
  name: 'balances',
  initialState,
  reducers: {},
});

export default balancesSlice.reducer;
