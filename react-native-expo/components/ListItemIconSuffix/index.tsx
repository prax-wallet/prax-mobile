import { LucideIcon } from 'lucide-react-native';
import Icon from '../Icon';

export interface ListItemIconSuffixProps {
  IconComponent: LucideIcon;
}

/**
 * Many `<ListItem />`s have an icon suffix. Since this is such a common use
 * case, `<ListItemIconSuffix />` exists to be passed to the `<ListItem />`
 * `suffix` prop.
 */
export default function ListItemIconSuffix({ IconComponent }: ListItemIconSuffixProps) {
  return <Icon IconComponent={IconComponent} size='md' color='neutralLight' />;
}
