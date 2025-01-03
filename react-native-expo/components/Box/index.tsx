import { Sx, View } from 'dripsy';
import { ReactNode } from 'react';

export interface BoxProps {
  children?: ReactNode;
  /**
   * When `true`, provides default padding. Leave undefined (or `false`) when
   * your children have their own padding -- e.g., in the case of `<ListItem
   * />`s.
   */
  padding?: boolean;
}

/**
 * A simple, generic wrapper that provides a background and optional padding for
 * its children.
 */
export default function Box({ children, padding }: BoxProps) {
  return <View sx={{ ...sx.root, ...(padding ? sx.rootPadding : {}) }}>{children}</View>;
}

const sx = {
  root: {
    backgroundColor: 'neutralContrast',
    borderRadius: 'lg',
  },

  rootPadding: {
    p: '$4',
  },
} satisfies Record<string, Sx>;
