import { Meta, StoryObj } from '@storybook/react';

import Avatar from '.';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;

export const Primary: StoryObj<typeof Avatar> = {
  args: {
    username: 'henry',
    size: 'sm',
  },
};
