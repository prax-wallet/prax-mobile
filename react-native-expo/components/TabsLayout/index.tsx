import Header from '@/components/Header';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { ChartCandlestick, Coins, Home, LucideIcon } from 'lucide-react-native';
import Icon from '../Icon';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { Text } from 'dripsy';

const ROUTES: Record<string, { IconComponent: LucideIcon; title: string }> = {
  index: {
    IconComponent: Home,
    title: 'Home',
  },
  trade: {
    IconComponent: ChartCandlestick,
    title: 'Trade',
  },
  portfolio: {
    IconComponent: Coins,
    title: 'Portfolio',
  },
};

const TABS_SCREEN_OPTIONS = ({ route }: { route: RouteProp<ParamListBase, string> }) => {
  return {
    sceneStyle: { backgroundColor: 'white' },
    header: () => <Header />,
    tabBarIcon: ({ focused }) => {
      const color = focused ? 'neutralDark' : 'neutralLight';

      let IconComponent = Home;
      switch (route.name) {
        case 'trade':
          IconComponent = ChartCandlestick;
          break;
        case 'portfolio':
          IconComponent = Coins;
          break;
        default:
          IconComponent = Home;
          break;
      }

      return <Icon IconComponent={ROUTES[route.name].IconComponent} size='md' color={color} />;
    },
    // @ts-expect-error - Types are wrong for `title`
    title: ({ focused }) => (
      <Text sx={{ color: focused ? 'neutralDark' : 'neutralLight' }} variant='small'>
        {ROUTES[route.name].title}
      </Text>
    ),
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
