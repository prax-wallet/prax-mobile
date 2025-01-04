import { PlainMessage } from '@bufbuild/protobuf';
import { Address } from '@penumbra-zone/protobuf/penumbra/core/keys/v1/keys_pb';
import * as Factory from 'factory.ts';
import { generateRandomNumberBetween0And255 } from './helpers';

const addressFactory = Factory.makeFactory<PlainMessage<Address>>({
  altBech32m: '',
  inner: Factory.each(
    () => new Uint8Array(Array(80).fill(null).map(generateRandomNumberBetween0And255)),
  ),
});

export default addressFactory;
