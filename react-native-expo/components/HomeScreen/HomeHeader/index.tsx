import Avatar from '@/components/Avatar';
import Header from '@/components/Header';
import { Image, Sx } from 'dripsy';
import logo from './logo.png';

export default function HomeHeader() {
  return <Header left={<Avatar />} center={<Image sx={sx.logo} source={logo} />} />;
}

const sx = {
  logo: {
    height: 16,
    width: 76,
    resizeMode: 'contain',
  },
} satisfies Record<string, Sx>;
