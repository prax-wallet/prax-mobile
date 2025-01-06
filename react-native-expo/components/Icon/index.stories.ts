import { CheckCircle, Home, Coins } from 'lucide-react-native';
import { Meta, StoryObj } from '@storybook/react';
import Icon from '.';
import dripsyTheme from '@/utils/dripsyTheme';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    IconComponent: {
      options: ['CheckCircle', 'Home', 'Coins'],
      mapping: { CheckCircle, Home, Coins },
    },
    color: {
      options: Object.keys(dripsyTheme.colors),
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    IconComponent: CheckCircle,
    size: 'md',
    color: 'baseBlackAlt',
  },
};
