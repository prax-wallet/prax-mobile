import { Meta, StoryObj } from '@storybook/react';

import TextInput from '.';
import TextInputIconStartAdornment from '../TextInputIconStartAdornment';
import { Search } from 'lucide-react-native';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    startAdornment: { control: false },
    value: { control: false },
    onChangeText: { control: false },
  },
};

export default meta;

export const Basic: StoryObj<typeof TextInput> = {
  args: {
    startAdornment: <TextInputIconStartAdornment IconComponent={Search} />,
  },
};
