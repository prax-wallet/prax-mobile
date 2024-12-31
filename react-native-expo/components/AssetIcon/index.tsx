import { Sx, View } from 'dripsy';

/**
 * A dummy component that, once populated with data, will render an icon for a
 * specific asset.
 */
export default function AssetIcon() {
  return <View sx={sx.root} />;
}

const sx = {
  root: {
    backgroundColor: 'neutralLight',
    size: 40,
    borderRadius: 20,
  },
} satisfies Record<string, Sx>;
