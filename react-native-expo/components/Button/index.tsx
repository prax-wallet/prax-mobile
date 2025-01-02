import { ActionType } from '@/types/ActionType';
import { Pressable, Sx, Text } from 'dripsy';
import { ReactNode } from 'react';
import { GestureResponderEvent } from 'react-native';

export interface ButtonProps {
  /**
   * The button label. If `iconOnly` is `true` or `adornment`, this will be used
   * as the `aria-label` attribute.
   */
  children: ReactNode;
  /**
   * What type of action is this button related to? Leave as `default` for most
   * buttons, set to `accent` for the single most important action on a given
   * page, set to `unshield` for actions that will unshield the user's funds,
   * and set to `destructive` for destructive actions.
   *
   * Default: `default`
   */
  actionType?: ActionType;
  onPress?: ((event: GestureResponderEvent) => void) | null;
  disabled?: boolean;
}

export default function Button({
  children,
  onPress,
  actionType = 'default',
  disabled,
}: ButtonProps) {
  return (
    <Pressable
      sx={{ ...sx.root, ...(actionType === 'accent' ? sx.accent : sx.default) }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        variant='button'
        sx={actionType === 'accent' ? sx.textAccent : sx.textDefault}
        numberOfLines={1}
      >
        {children}
      </Text>
    </Pressable>
  );
}

const sx = {
  root: {
    borderRadius: 24,
    height: 48,
    flexGrow: 1,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    px: '$8',
  },

  accent: {
    backgroundColor: 'baseBlack',
  },

  default: {
    borderColor: 'baseBlack',
    borderWidth: 1,
    color: 'baseBlack',
  },

  textAccent: {
    color: 'baseWhite',
  },

  textDefault: {
    color: 'baseBlack',
  },
} satisfies Record<string, Sx>;
