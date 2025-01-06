import { SafeAreaView, Sx, View } from 'dripsy';
import { ReactNode } from 'react';

export interface HeaderProps {
  /**
   * Content to render on the left side of the header, like a back button or
   * avatar.
   */
  left?: ReactNode;
  /**
   * Content to render in the left side of the header, like a title or logo.
   */
  center?: ReactNode;
  /** Content to render on the right side of the header. */
  right?: ReactNode;
}

/**
 * Render via a screen's `options.header` to show a header at the top of the
 * screen.
 *
 * If you're looking for a header with a back button, use
 * `<BackButtonHeader />`.
 */
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
