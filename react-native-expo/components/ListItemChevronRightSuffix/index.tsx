import { ChevronRight } from 'lucide-react-native';
import Icon from '../Icon';

/**
 * Many `<ListItem />`s have a right-pointing chevron to indicate they can be
 * tapped to open a new screen. Since this is such a common use case,
 * `<ListItemChevronRightSuffix />` exists to be passed to the `<ListItem />`
 * `suffix` prop.
 */
export default function ListItemChevronRightSuffix() {
  return <Icon IconComponent={ChevronRight} size='md' color='neutralLight' />;
}
