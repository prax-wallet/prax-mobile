import { Sx, Text, View } from 'dripsy';

export interface AvatarProps {
  username?: string;
}

export default function Avatar({ username }: AvatarProps) {
  return (
    <View sx={sx.root}>
      <Text sx={sx.text}>{username ? username.substring(0, 1) : '?'}</Text>
    </View>
  );
}

const sx = {
  root: {
    backgroundColor: 'neutralLight',
    borderRadius: '50%',

    size: '$8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: 'neutralDark',
    textTransform: 'uppercase',
  },
} satisfies Record<string, Sx>;
