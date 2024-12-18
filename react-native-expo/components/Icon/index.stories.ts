import { CheckCircle, Home, Coins } from 'lucide-react-native';
import { Meta, StoryObj } from '@storybook/react/*';
import Icon from '.';
import { DripsyTheme } from '@/utils/dripsyTheme';

const COLORS = {
  success: (colors: DripsyTheme['color']) => colors.success.main,
  destructive: (colors: DripsyTheme['color']) => colors.destructive.main,
  unshield: (colors: DripsyTheme['color']) => colors.unshield.main,
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Icon,
  argTypes: {
    IconComponent: {
      options: ['CheckCircle', 'Home', 'Coins'],
      mapping: { CheckCircle, Home, Coins },
    },
    color: {
      options: ['success', 'destructive', 'unshield'],
      mapping: COLORS,
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    IconComponent: CheckCircle,
    size: 'md',
    color: COLORS.success,
  },
};
