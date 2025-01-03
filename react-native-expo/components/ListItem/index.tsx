import { Pressable, Sx, Text, View } from 'dripsy';
import { ReactNode } from 'react';
import { ConditionalWrap } from '../ConditionalWrap';

export interface ListItemProps {
  /**
   * Optional markup to render as an avatar for this list item.
   *
   * ```tsx
   * <ListItem avatar={<UserAvatar src={...} />} ... />
   * ```
   */
  avatar?: ReactNode;
  /** Primary text to show for this list item. */
  primaryText: string;
  /** Secondary text to show for this list item. */
  secondaryText?: string;
  /** Optional markup to render at the end of this list item. */
  suffix?: ReactNode;
  onPress?: () => void;
}

export default function ListItem({
  avatar,
  primaryText,
  secondaryText,
  suffix,
  onPress,
}: ListItemProps) {
  return (
    <ConditionalWrap
      if={!!onPress}
      then={children => (
        <Pressable sx={sx.root} onPress={onPress}>
          {children}
        </Pressable>
      )}
      else={children => <View sx={sx.root}>{children}</View>}
    >
      {avatar}

      <View sx={sx.textWrapper}>
        <Text numberOfLines={1}>{primaryText}</Text>

        {!!secondaryText && (
          <Text sx={sx.secondaryText} numberOfLines={1}>
            {secondaryText}
          </Text>
        )}
      </View>

      {!!suffix && <View sx={sx.suffixWrapper}>{suffix}</View>}
    </ConditionalWrap>
  );
}

const sx = {
  root: {
    backgroundColor: 'neutralContrast',
    borderRadius: 'lg',

    flexDirection: 'row',
    gap: '$3',
    alignItems: 'center',

    p: '$4',
  },

  secondaryText: {
    variant: 'text.small',
    color: 'neutralLight',
  },

  suffixWrapper: {
    flexShrink: 0,
  },

  textWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 0.5,
    flexGrow: 1,
    flexShrink: 1,
  },
} satisfies Record<string, Sx>;
