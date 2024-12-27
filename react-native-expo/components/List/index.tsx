import { Sx, Text, View } from 'dripsy';
import { ReactNode } from 'react';

export interface ListProps {
  /**
   * A series of `<ListItem />`s.
   */
  children: ReactNode;
  title?: string;
}

export default function List({ children, title }: ListProps) {
  return (
    <View sx={sx.root}>
      {!!title && (
        <View sx={sx.title}>
          <Text variant='large'>{title}</Text>
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
  },
} satisfies Record<string, Sx>;
