import { Pressable } from 'dripsy';
import Header from '../Header';
import Icon from '../Icon';
import { ArrowLeftCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function BackButtonHeader() {
  const router = useRouter();

  return (
    <Header
      left={
        <Pressable onPress={() => router.back()}>
          <Icon IconComponent={ArrowLeftCircle} size='md' />
        </Pressable>
      }
    />
  );
}
