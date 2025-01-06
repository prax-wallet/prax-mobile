import * as Factory from 'factory.ts';
import { BalancesResponse } from '@penumbra-zone/protobuf/penumbra/view/v1/view_pb';
import { ChainRegistryClient } from '@penumbra-labs/registry';
import { PENUMBRA_CHAIN_ID } from '@/utils/constants';
import { PlainMessage } from '@bufbuild/protobuf';
import amountFactory from './amount';

const METADATAS = new ChainRegistryClient().bundled.get(PENUMBRA_CHAIN_ID).getAllAssets();

const balancesResponseFactory = Factory.makeFactory<PlainMessage<BalancesResponse>>({
  balanceView: Factory.each(i => ({
    valueView: {
      case: 'knownAssetId',
      value: {
        amount: amountFactory.build(),
        equivalentValues: [],
        metadata: METADATAS[i % METADATAS.length],
      },
    },
  })),
});

export default balancesResponseFactory;
