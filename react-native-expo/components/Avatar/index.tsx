import { Sx, Text, View } from 'dripsy';

export interface AvatarProps {
  username?: string;
  /**
   * - `sm`: 32px (for the tab screen headers)
   * - `lg`: 80px (for the profile screen header)
   */
  size: 'sm' | 'lg';
}

export default function Avatar({ username, size }: AvatarProps) {
  return (
    <View sx={{ ...sx.root, size: size === 'sm' ? 32 : 80 }}>
      <Text sx={{ ...sx.text, variant: size === 'lg' ? 'text.h4' : undefined }}>
        {username ? username.substring(0, 1) : '?'}
      </Text>
    </View>
  );
}

const sx = {
  root: {
    backgroundColor: 'neutralLight',
    borderRadius: '50%',

    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: 'neutralDark',
    textTransform: 'uppercase',
  },
} satisfies Record<string, Sx>;
