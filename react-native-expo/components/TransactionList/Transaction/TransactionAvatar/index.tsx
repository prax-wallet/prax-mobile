import Icon from '@/components/Icon';
import { Sx, View } from 'dripsy';
import { ArrowDown, ArrowUp, Link } from 'lucide-react-native';

export interface TransactionAvatarProps {
  direction: 'incoming' | 'outgoing';
  via?: 'link';
}

export default function TransactionAvatar({ direction, via }: TransactionAvatarProps) {
  return (
    <View sx={sx.root}>
      {via === 'link' && <Icon IconComponent={Link} size='md' color='neutralDark' />}

      <View sx={sx.directionIndicator}>
        <Icon
          IconComponent={direction === 'incoming' ? ArrowDown : ArrowUp}
          size='xs'
          color='neutralDark'
        />
      </View>
    </View>
  );
}

const sx = {
  directionIndicator: {
    backgroundColor: 'neutralLight',
    borderWidth: 1,
    borderColor: 'baseWhite',
    borderRadius: '50%',

    size: '$4',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  root: {
    backgroundColor: 'neutralLight',
    borderRadius: '50%',

    size: '$10',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'relative',
  },
} satisfies Record<string, Sx>;
