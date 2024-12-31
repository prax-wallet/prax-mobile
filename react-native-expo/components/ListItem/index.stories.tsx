import { Meta, StoryObj } from '@storybook/react';

import ListItem from '.';
import AssetIcon from '../AssetIcon';
import Icon from '../Icon';
import { ChevronRight } from 'lucide-react-native';

const meta: Meta<typeof ListItem> = {
  component: ListItem,
  tags: ['autodocs'],
  argTypes: {
    avatar: { control: false },
    suffix: { control: false },
  },
};

export default meta;

export const Basic: StoryObj<typeof ListItem> = {
  args: {
    avatar: <AssetIcon />,
    primaryText: 'ListItem',
    secondaryText: 'For use in a list.',
    suffix: <Icon IconComponent={ChevronRight} size='md' color='neutralLight' />,
  },
};
