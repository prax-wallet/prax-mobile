import { Sx, Text, View } from 'dripsy';
import { ReactNode } from 'react';

export interface ListProps {
  /**
   * A series of `<ListItem />`s.
   */
  children: ReactNode;
  title?: string;
  /** Button/etc. to render to the right of the title. */
  primaryAction?: ReactNode;
}

/**
 * Presents list items as a unit with a shaded background and an optional title.
 *
 * To simply display list items with a gap between each (but no background or
 * title), use `<ListItems />`.
 */
export default function List({ children, title, primaryAction }: ListProps) {
  return (
    <View sx={sx.root}>
      {!!title && (
        <View sx={sx.title}>
          <Text variant='large'>{title}</Text>

          {primaryAction}
        </View>
      )}
      {children}
    </View>
  );
}

const sx = {
  root: {
    backgroundColor: 'neutralContrast',

    borderRadius: 'lg',

    flexDirection: 'column',
  },

  title: {
    p: '$4',
    pb: '$2',

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
} satisfies Record<string, Sx>;
