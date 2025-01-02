import Avatar from '@/components/Avatar';
import Header from '@/components/Header';
import { Image, Pressable, Sx } from 'dripsy';
import logo from './logo.png';
import { useRouter } from 'expo-router';

function ProfileButton() {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.navigate('/profile')}>
      <Avatar size='sm' />
    </Pressable>
  );
}

/** The header used by the primary screens accessed via tabs. */
export default function TabScreenHeader() {
  return <Header left={<ProfileButton />} center={<Image sx={sx.logo} source={logo} />} />;
}

const sx = {
  logo: {
    height: 16,
    width: 76,
    resizeMode: 'contain',
  },
} satisfies Record<string, Sx>;
