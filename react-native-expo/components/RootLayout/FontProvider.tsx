import { ReactNode } from 'react';
import { useFonts } from 'expo-font';
import dripsyTheme from '@/utils/dripsyTheme';

interface FontsProps {
  children: ReactNode;
}

export default function FontProvider({ children }: FontsProps) {
  const [loaded] = useFonts({
    [dripsyTheme.customFonts.Poppins.default]: require('./fonts/Poppins-Regular.ttf'),
    [dripsyTheme.customFonts.Poppins.italic]: require('./fonts/Poppins-Italic.ttf'),
    [dripsyTheme.customFonts.Poppins.bold]: require('./fonts/Poppins-Medium.ttf'),
    [dripsyTheme.customFonts.Poppins.boldItalic]: require('./fonts/Poppins-MediumItalic.ttf'),
    [dripsyTheme.customFonts!.IosevkaTerm.default]: require('./fonts/IosevkaTerm-Regular.ttf'),
    [dripsyTheme.customFonts!.IosevkaTerm.bold]: require('./fonts/IosevkaTerm-Medium.ttf'),
  });

  if (!loaded) return null;

  return <>{children}</>;
}
