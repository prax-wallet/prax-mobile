import { Image, Sx, View, SafeAreaView } from 'dripsy';
import logo from './logo.png';
import Avatar from '../Avatar';

export default function NavBar() {
  return (
    <SafeAreaView>
      <View sx={sx.root}>
        <View sx={sx.left}>
          <Avatar />
        </View>
        <View sx={sx.center}>
          <Image sx={sx.logo} source={logo} />
        </View>
        <View sx={sx.right} />
      </View>
    </SafeAreaView>
  );
}

const sx = {
  center: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    flexGrow: 1,
  },

  left: {
    width: '$8',
    height: '$8',
  },

  logo: {
    height: 16,
    width: 76,
    resizeMode: 'contain',
  },

  right: {
    width: '$8',
    height: '$8',
  },

  root: {
    flexDirection: 'row',
    px: '$4',
    py: '$3',
  },
} satisfies Record<string, Sx>;
