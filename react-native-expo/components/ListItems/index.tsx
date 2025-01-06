import { Sx, View } from 'dripsy';
import { ReactNode } from 'react';

export interface ListItemsProps {
  children: ReactNode;
}

/**
 * Simple wrapper to use around multiple `<ListItem />`s to give them consistent
 * spacing throughout the app.
 *
 * For a styled list including a header and colored background, use `<List />`.
 */
export default function ListItems({ children }: ListItemsProps) {
  return <View sx={sx.root}>{children}</View>;
}

const sx = {
  root: {
    flexDirection: 'column',
    gap: '$2',
  },
} satisfies Record<string, Sx>;
