import * as Factory from 'factory.ts';
import { PlainMessage } from '@bufbuild/protobuf';
import { Amount } from '@penumbra-zone/protobuf/penumbra/core/num/v1/num_pb';

const randomBigInt = () => BigInt(Math.round(Math.random() * 10 ** 7));

const amountFactory = Factory.makeFactory<PlainMessage<Amount>>({
  hi: 0n,
  lo: randomBigInt(),
});

export default amountFactory;
