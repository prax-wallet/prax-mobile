import { LucideIcon } from 'lucide-react-native';
import Icon from '../Icon';

export interface TextInputIconStartAdornmentProps {
  IconComponent: LucideIcon;
}

/**
 * Many `<TextInput />`s have an icon `startAdornment`. Since this is such a
 * common use case, `<TextInputIconStartAdornment />` exists to be passed to the
 * `<TextInput />` `startAdornment` prop.
 */
export default function TextInputIconStartAdornment({
  IconComponent,
}: TextInputIconStartAdornmentProps) {
  return <Icon IconComponent={IconComponent} size='md' color='neutralMain' />;
}
