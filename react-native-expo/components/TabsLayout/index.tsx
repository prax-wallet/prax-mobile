import Header from '@/components/Header';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { ChartCandlestick, Coins, Home, LucideIcon } from 'lucide-react-native';
import Icon from '../Icon';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { Text } from 'dripsy';
import { useLingui } from '@lingui/react/macro';

const ICONS_BY_ROUTE: Record<string, LucideIcon> = {
  index: Home,
  trade: ChartCandlestick,
  portfolio: Coins,
};

/**
 * Rendered as a component so we can take advantage of the `useLingui()` hook.
 */
const Title = ({
  routeName,
  focused,
}: {
  routeName: keyof typeof ICONS_BY_ROUTE;
  focused: boolean;
}) => {
  const { t } = useLingui();

  const TITLES_BY_ROUTE_NAME: Record<keyof typeof ICONS_BY_ROUTE, string> = {
    index: t`Home`,
    trade: t`Trade`,
    portfolio: t`Portfolio`,
  };

  return (
    <Text sx={{ color: focused ? 'neutralDark' : 'neutralLight' }} variant='small'>
      {TITLES_BY_ROUTE_NAME[routeName]}
    </Text>
  );
};

const TABS_SCREEN_OPTIONS = ({ route }: { route: RouteProp<ParamListBase, string> }) => {
  return {
    sceneStyle: { backgroundColor: 'white' },
    header: () => <Header />,
    tabBarIcon: ({ focused }) => {
      const color = focused ? 'neutralDark' : 'neutralLight';

      return <Icon IconComponent={ICONS_BY_ROUTE[route.name]} size='md' color={color} />;
    },
    // @ts-expect-error - Types are wrong for `title`
    title: ({ focused }) => <Title focused={focused} routeName={route.name} />,
  } satisfies BottomTabNavigationOptions;
};

export default function TabsLayout() {
  return (
    // @ts-expect-error - Types are wrong for `title`
    <Tabs screenOptions={TABS_SCREEN_OPTIONS}>
      <Tabs.Screen name='index' />

      <Tabs.Screen name='trade' />

      <Tabs.Screen name='portfolio' />
    </Tabs>
  );
}
