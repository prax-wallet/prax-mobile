import { ReactNode } from 'react';
import { useFonts } from 'expo-font';
import dripsyTheme from '@/utils/dripsyTheme';

interface FontsProps {
  children: ReactNode;
}

export default function FontProvider({ children }: FontsProps) {
  const [loaded] = useFonts({
    [dripsyTheme.customFonts.Poppins.default]: require('@/assets/fonts/Poppins-Regular.ttf'),
    [dripsyTheme.customFonts.Poppins.italic]: require('@/assets/fonts/Poppins-Italic.ttf'),
    [dripsyTheme.customFonts.Poppins.bold]: require('@/assets/fonts/Poppins-Medium.ttf'),
    [dripsyTheme.customFonts.Poppins
      .boldItalic]: require('@/assets/fonts/Poppins-MediumItalic.ttf'),
    [dripsyTheme.customFonts!.IosevkaTerm
      .default]: require('@/assets/fonts/IosevkaTerm-Regular.ttf'),
    [dripsyTheme.customFonts!.IosevkaTerm.bold]: require('@/assets/fonts/IosevkaTerm-Medium.ttf'),
  });

  if (!loaded) return null;

  return <>{children}</>;
}
