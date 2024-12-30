import { SafeAreaView, Sx, View } from 'dripsy';
import { ReactNode } from 'react';

export interface HeaderProps {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

export default function Header({ left, center, right }: HeaderProps) {
  return (
    <SafeAreaView>
      <View sx={sx.root}>
        <View sx={sx.left}>{left}</View>
        <View sx={sx.center}>{center}</View>
        <View sx={sx.right}>{right}</View>
      </View>
    </SafeAreaView>
  );
}

const sx = {
  center: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    flexGrow: 1,
  },

  left: {
    width: '$8',
    height: '$8',
  },

  right: {
    width: '$8',
    height: '$8',
  },

  root: {
    flexDirection: 'row',
    px: '$4',
    py: '$3',
  },
} satisfies Record<string, Sx>;
