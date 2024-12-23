import { ActionType } from '@/types/ActionType';
import { Pressable, Sx, Text } from 'dripsy';
import { ReactNode } from 'react';

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
}

export default function Button({ children, actionType = 'default' }: ButtonProps) {
  return (
    <Pressable sx={{ ...sx.root, ...(actionType === 'accent' ? sx.accent : sx.default) }}>
      <Text sx={actionType === 'accent' ? sx.textAccent : sx.textDefault}>{children}</Text>
    </Pressable>
  );
}

const sx = {
  root: {
    borderRadius: 24,
    height: 48,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
