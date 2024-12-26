import { Sx, View } from 'dripsy';

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
